"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHead from "./SectionHead";
import Counter from "./motion/Counter";

type Story = { quote: string; name: string; role: string };

// Real wards across Dar es Salaam that the network reaches. Members are
// illustrative figures used to make each node feel alive on hover.
const MAP_LOCATIONS = [
  { name: "Kinondoni", members: "1,240" },
  { name: "Mwananyamala", members: "980" },
  { name: "Mbezi Beach", members: "760" },
  { name: "Temeke", members: "890" },
  { name: "Tandika", members: "1,050" },
] as const;

const CENTER = 50;
const ORBIT_R = 30; // radius of the orbit, in viewBox units (0-100)
const N = MAP_LOCATIONS.length;

// An interactive, slowly rotating map: clinics orbit a central hub while a
// radar sweep passes over them. Hover (or tap) a ward to focus it; the map
// pauses so it stays readable. Auto-cycles through wards when left alone.
function RotatingMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const [rotation, setRotation] = useState(reduce ? 0 : -8);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  // Continuous, frame-rate-independent rotation of the whole orbit.
  useAnimationFrame((_, delta) => {
    if (reduce || paused || !inView) return;
    setRotation((r) => (r + delta * 0.0055) % 360);
  });

  // Gently cycle the focused ward when the user isn't interacting.
  useEffect(() => {
    if (reduce || hovered !== null) return;
    const id = window.setInterval(() => setAutoIndex((i) => (i + 1) % N), 2600);
    return () => window.clearInterval(id);
  }, [reduce, hovered]);

  const active = hovered ?? autoIndex;

  const positions = MAP_LOCATIONS.map((_, i) => {
    const a = ((rotation + (360 / N) * i - 90) * Math.PI) / 180;
    return { x: CENTER + ORBIT_R * Math.cos(a), y: CENTER + ORBIT_R * Math.sin(a) };
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square h-full select-none"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#83C5BE" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#83C5BE" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#83C5BE" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="map-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#006D77" stopOpacity="0" />
            <stop offset="100%" stopColor="#006D77" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* soft background glow + radar rings */}
        <circle cx={CENTER} cy={CENTER} r="46" fill="url(#map-glow)" />
        {[14, 24, 34, 44].map((r) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke="#83C5BE"
            strokeWidth="0.3"
            strokeOpacity="0.35"
          />
        ))}
        {/* faint crosshair grid */}
        <path
          d={`M${CENTER} 6V94M6 ${CENTER}H94`}
          stroke="#83C5BE"
          strokeWidth="0.3"
          strokeOpacity="0.3"
          strokeDasharray="1 2"
        />

        {/* rotating radar sweep */}
        {!reduce && (
          <g style={{ transform: `rotate(${rotation * 2}deg)`, transformOrigin: "50px 50px" }}>
            <path
              d={`M${CENTER} ${CENTER} L${CENTER} 6 A44 44 0 0 1 ${CENTER + 34} 18 Z`}
              fill="url(#map-sweep)"
            />
          </g>
        )}

        {/* connector lines from hub to each ward */}
        {positions.map((p, i) => (
          <motion.line
            key={`l-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={p.x}
            y2={p.y}
            stroke={i === active ? "#006D77" : "#83C5BE"}
            strokeWidth={i === active ? 0.9 : 0.5}
            strokeOpacity={i === active ? 0.9 : 0.45}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2 + i * 0.08 }}
          />
        ))}

        {/* ward nodes */}
        {positions.map((p, i) => (
          <g key={`n-${i}`}>
            {i === active && !reduce && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                fill="none"
                stroke="#006D77"
                strokeWidth="0.6"
                initial={{ r: 2, opacity: 0.6 }}
                animate={{ r: [2, 6.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={i === active ? 2.6 : 1.9}
              fill={i === active ? "#006D77" : "#FFFFFF"}
              stroke="#006D77"
              strokeWidth="0.7"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: reduce ? 0 : 0.3 + i * 0.08 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          </g>
        ))}

        {/* central clinic hub */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r="6.5"
          fill="#006D77"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ transformOrigin: "50px 50px" }}
        />
        <circle cx={CENTER} cy={CENTER} r="6.5" fill="none" stroke="#FFB703" strokeWidth="0.5" strokeOpacity="0.6" />
        <path
          d={`M${CENTER} ${CENTER - 2.6}v5.2M${CENTER - 2.6} ${CENTER}h5.2`}
          stroke="#FFB703"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* upright, interactive ward labels following each node */}
      {positions.map((p, i) => {
        const isActive = i === active;
        return (
          <button
            type="button"
            key={`lab-${i}`}
            onPointerEnter={() => setHovered(i)}
            onFocus={() => {
              setHovered(i);
              setPaused(true);
            }}
            onBlur={() => {
              setHovered(null);
              setPaused(false);
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-[3px] text-[11px] font-600 leading-none shadow-card transition-colors duration-300 ${
              isActive
                ? "z-10 border-teal bg-teal text-white"
                : "border-line bg-white/95 text-charcoal-muted hover:border-sage"
            }`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-label={`${MAP_LOCATIONS[i].name} — ${MAP_LOCATIONS[i].members} wanachama`}
          >
            {MAP_LOCATIONS[i].name}
          </button>
        );
      })}

      {/* live caption for the focused ward */}
      <div className="pointer-events-none absolute bottom-0 left-0 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
        </span>
        <span className="text-[12px] font-600 text-charcoal">
          {MAP_LOCATIONS[active].name}
        </span>
        <span className="text-[12px] text-charcoal-faint">
          {MAP_LOCATIONS[active].members} wanachama
        </span>
      </div>
    </div>
  );
}

export default function Impact() {
  const { t, tr } = useI18n();
  const statLabels = tr<string[]>("impact.stats");
  const stories = tr<Story[]>("impact.stories");

  return (
    <section id="impact" className="section bg-sage-mist">
      <div className="container-page">
        <SectionHead
          eyebrow={t("impact.eyebrow")}
          title={t("impact.title")}
          sub={t("impact.sub")}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={statLabels[i] ?? s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col justify-center rounded-xl2 border border-line bg-white p-7 shadow-card"
              >
                <p className="font-display text-[clamp(34px,5vw,48px)] font-700 leading-none text-teal">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                </p>
                <p className="mt-3 text-[15px] font-medium text-charcoal-muted">
                  {statLabels[i] ?? s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Network visual */}
          <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal-faint">
              {t("impact.network")}
            </p>
            <div className="mt-2 h-[260px]">
              <RotatingMap />
            </div>
          </div>
        </div>

        {/* Stories */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {stories.map((story, i) => (
            <motion.figure
              key={story.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col justify-between rounded-xl2 border border-line bg-white p-8 shadow-card"
            >
              <blockquote className="font-display text-[22px] font-600 leading-snug text-charcoal">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-[15px] font-700 text-white">
                  {story.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[15px] font-600 text-charcoal">{story.name}</span>
                  <span className="block text-[13px] text-charcoal-muted">{story.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

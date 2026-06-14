"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHead from "./SectionHead";
import Counter from "./motion/Counter";

type Story = { quote: string; name: string; role: string };

// Real wards across Dar es Salaam that the network reaches. `members` is the
// figure shown when a ward is focused; the headline network total is 500+.
const MAP_LOCATIONS = [
  { name: "Kinondoni", members: 100 },
  { name: "Mwananyamala", members: 92 },
  { name: "Mbezi Beach", members: 86 },
  { name: "Temeke", members: 88 },
  { name: "Tandika", members: 96 },
] as const;

const TOTAL_MEMBERS = "500+";
const CLINIC_COUNT = 7;

const CENTER = 50;
const ORBIT_R = 30; // radius of the orbit, in viewBox units (0-100)
const N = MAP_LOCATIONS.length;

type WardGeo = { name: string; members: number; nx: number; ny: number };

// Node positions around the orbit, computed once at module load.
const GEO: WardGeo[] = MAP_LOCATIONS.map((loc, i) => {
  const rad = (((360 / N) * i - 90) * Math.PI) / 180;
  return {
    name: loc.name,
    members: loc.members,
    nx: CENTER + ORBIT_R * Math.cos(rad),
    ny: CENTER + ORBIT_R * Math.sin(rad),
  };
});

// An interactive, slowly rotating map: wards orbit a central clinic hub while a
// radar sweep passes over a live heatmap of members. Hover (or tap) a ward to
// focus it; the map pauses so it stays readable. Rotation, sweep and label
// positions are driven imperatively (refs) so hundreds of dots never trigger a
// React re-render. Auto-cycles through wards when left alone.
function RotatingMap() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const [hovered, setHovered] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);

  const orbitRef = useRef<SVGGElement>(null);
  const sweepRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const angleRef = useRef(-8);
  const pausedRef = useRef(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  // Gently cycle the focused ward when the user isn't interacting.
  useEffect(() => {
    if (reduce || hovered !== null) return;
    const id = window.setInterval(() => setAutoIndex((i) => (i + 1) % N), 2600);
    return () => window.clearInterval(id);
  }, [reduce, hovered]);

  // Single rAF loop: advance the angle and push it to the DOM imperatively.
  useAnimationFrame((_, delta) => {
    if (!reduce && !pausedRef.current && inViewRef.current) {
      angleRef.current = (angleRef.current + delta * 0.0055) % 360;
    }
    const a = reduce ? 0 : angleRef.current;
    orbitRef.current?.setAttribute("transform", `rotate(${a} ${CENTER} ${CENTER})`);
    sweepRef.current?.setAttribute("transform", `rotate(${(a * 2) % 360} ${CENTER} ${CENTER})`);

    // Keep the HTML labels glued to their (rotating) nodes but always upright.
    const cos = Math.cos((a * Math.PI) / 180);
    const sin = Math.sin((a * Math.PI) / 180);
    for (let i = 0; i < GEO.length; i++) {
      const el = labelRefs.current[i];
      if (!el) continue;
      const dx = GEO[i].nx - CENTER;
      const dy = GEO[i].ny - CENTER;
      el.style.left = `${CENTER + dx * cos - dy * sin}%`;
      el.style.top = `${CENTER + dx * sin + dy * cos}%`;
    }
  });

  const active = hovered ?? autoIndex;

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square h-full select-none"
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
        setHovered(null);
      }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="map-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#83C5BE" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#83C5BE" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#83C5BE" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="map-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#006D77" stopOpacity="0" />
            <stop offset="100%" stopColor="#006D77" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        {/* soft background glow + radar rings */}
        <circle cx={CENTER} cy={CENTER} r="46" fill="url(#map-bg)" />
        {[14, 24, 34, 44].map((r) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke="#83C5BE"
            strokeWidth="0.3"
            strokeOpacity="0.3"
          />
        ))}
        {/* faint crosshair grid */}
        <path
          d={`M${CENTER} 6V94M6 ${CENTER}H94`}
          stroke="#83C5BE"
          strokeWidth="0.3"
          strokeOpacity="0.28"
          strokeDasharray="1 2"
        />

        {/* rotating radar sweep */}
        {!reduce && (
          <g ref={sweepRef}>
            <path
              d={`M${CENTER} ${CENTER} L${CENTER} 6 A44 44 0 0 1 ${CENTER + 34} 18 Z`}
              fill="url(#map-sweep)"
            />
          </g>
        )}

        {/* everything that orbits the hub - rotated imperatively as one group */}
        <g ref={orbitRef} style={{ opacity: inView ? 1 : 0, transition: "opacity 0.8s ease" }}>
          {/* connector lines from hub to each ward */}
          {GEO.map((g, i) => (
            <line
              key={`conn-${i}`}
              x1={CENTER}
              y1={CENTER}
              x2={g.nx}
              y2={g.ny}
              stroke={i === active ? "#006D77" : "#83C5BE"}
              strokeWidth={i === active ? 0.9 : 0.45}
              strokeOpacity={i === active ? 0.9 : 0.4}
              className="transition-all duration-300"
            />
          ))}

          {/* ward nodes */}
          {GEO.map((g, i) => (
            <g key={`node-${i}`}>
              {i === active && !reduce && (
                <motion.circle
                  cx={g.nx}
                  cy={g.ny}
                  fill="none"
                  stroke="#006D77"
                  strokeWidth="0.6"
                  initial={{ r: 2.4, opacity: 0.55 }}
                  animate={{ r: [2.4, 7.5], opacity: [0.55, 0] }}
                  transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <circle
                cx={g.nx}
                cy={g.ny}
                r={i === active ? 2.7 : 2}
                fill={i === active ? "#006D77" : "#FFFFFF"}
                stroke="#006D77"
                strokeWidth="0.7"
                className="transition-all duration-300"
              />
            </g>
          ))}
        </g>

        {/* central clinic hub (sits still at the centre) */}
        <circle cx={CENTER} cy={CENTER} r="6.5" fill="#006D77" />
        <circle cx={CENTER} cy={CENTER} r="6.5" fill="none" stroke="#FFB703" strokeWidth="0.5" strokeOpacity="0.6" />
        <path
          d={`M${CENTER} ${CENTER - 2.6}v5.2M${CENTER - 2.6} ${CENTER}h5.2`}
          stroke="#FFB703"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* upright, interactive ward labels following each node */}
      {GEO.map((g, i) => {
        const isActive = i === active;
        return (
          <button
            type="button"
            key={`lab-${i}`}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            onPointerEnter={() => {
              setHovered(i);
              pausedRef.current = true;
            }}
            onFocus={() => {
              setHovered(i);
              pausedRef.current = true;
            }}
            onBlur={() => {
              setHovered(null);
              pausedRef.current = false;
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-[3px] text-[11px] font-600 leading-none shadow-card transition-colors duration-300 ${
              isActive
                ? "z-10 border-teal bg-teal text-white"
                : "border-line bg-white/95 text-charcoal-muted hover:border-sage"
            }`}
            aria-label={`${g.name} — ${g.members} ${t("impact.memberLabel")}`}
          >
            {g.name}
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
        <span className="text-[12px] font-600 text-charcoal">{GEO[active].name}</span>
        <span className="text-[12px] text-charcoal-faint">
          {GEO[active].members} {t("impact.memberLabel")}
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal-faint">
                {t("impact.network")}
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-2.5 py-1 text-[12px] font-700 text-teal">
                  {TOTAL_MEMBERS} <span className="font-600 text-teal-deep/80">{t("impact.memberLabel")}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-2.5 py-1 text-[12px] font-700 text-teal">
                  {CLINIC_COUNT} <span className="font-600 text-teal-deep/80">{t("impact.clinicLabel")}</span>
                </span>
              </div>
            </div>
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

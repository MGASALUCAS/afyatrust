"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHead from "./SectionHead";
import Counter from "./motion/Counter";

type Story = { quote: string; name: string; role: string };

// A growing community network - nodes connect to a central clinic as it comes into view.
function NetworkViz() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const nodes: [number, number][] = [
    [70, 60], [205, 45], [330, 70], [55, 165], [355, 175],
    [120, 235], [300, 240], [40, 95], [370, 110], [200, 250],
  ];
  const center: [number, number] = [200, 150];

  return (
    <svg ref={ref} viewBox="0 0 410 300" className="h-full w-full">
      {nodes.map(([x, y], i) => (
        <motion.line
          key={`l-${i}`}
          x1={center[0]}
          y1={center[1]}
          x2={x}
          y2={y}
          stroke="#83C5BE"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2 + i * 0.06 }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={`n-${i}`}
          cx={x}
          cy={y}
          r="5"
          fill="#006D77"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 220, damping: 16, delay: reduce ? 0 : 0.3 + i * 0.06 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      {/* central clinic */}
      <motion.circle
        cx={center[0]}
        cy={center[1]}
        r="22"
        fill="#006D77"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ transformOrigin: `${center[0]}px ${center[1]}px` }}
      />
      <path
        d={`M${center[0]} ${center[1] - 9}v18M${center[0] - 9} ${center[1]}h18`}
        stroke="#FFB703"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
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
              <NetworkViz />
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

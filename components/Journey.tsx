"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { journey } from "@/lib/content";
import { MemberIcon, ClinicIcon, TreatmentIcon, CheckIcon } from "./Icons";
import BackgroundVideo from "./BackgroundVideo";

function StageVisual({ index }: { index: number }) {
  // A distinct, purposeful visual per stage — no decoration for its own sake.
  const reduce = useReducedMotion();
  const spring: Transition = { type: "spring", stiffness: 140, damping: 18 };

  const variants: Variants = {
    initial: { opacity: 0, scale: 0.92, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: -10 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={reduce ? { duration: 0.2 } : spring}
        className="relative grid h-64 w-64 place-items-center rounded-full border border-line bg-white shadow-soft"
      >
        <div className="absolute inset-4 rounded-full bg-sage-mist" />
        {index === 0 && <MemberIcon className="relative h-24 w-24" />}
        {index === 1 && (
          <div className="relative flex flex-col items-center gap-3">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-teal text-white">
              <CheckIcon width={40} height={40} />
            </span>
            <span className="text-[13px] font-semibold text-teal">Membership confirmed</span>
          </div>
        )}
        {index === 2 && <ClinicIcon className="relative h-24 w-24" />}
        {index === 3 && <TreatmentIcon className="relative h-24 w-24" />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(journey.length - 1, Math.floor(p * journey.length));
    setActive(i < 0 ? 0 : i);
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0.06, 1]);

  return (
    // Tall track gives us room to scrub through the story.
    <section ref={ref} className="relative bg-teal-dark" style={{ height: "320vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Ambient field footage behind the story, dimmed for legibility */}
        <BackgroundVideo
          src="/media/background2.mp4"
          overlayClassName="bg-teal-dark/85"
          videoClassName="scale-[0.93]"
        />
        <div className="container-page relative z-10 grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left — the words change as you scroll */}
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-sage">
              The journey
            </span>
            <div className="relative mt-6 h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-[15px] font-700 text-sage">
                    {journey[active].k}
                  </span>
                  <h2 className="mt-2 font-display text-[clamp(34px,5vw,56px)] font-700 leading-[1.02] tracking-tight text-white">
                    {journey[active].title}
                  </h2>
                  <p className="mt-4 max-w-md text-[18px] leading-relaxed text-white/75">
                    {journey[active].line}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress rail */}
            <div className="mt-4 flex items-center gap-3">
              {journey.map((s, i) => (
                <div key={s.k} className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      i <= active ? "bg-gold" : "bg-white/30"
                    }`}
                  />
                  {i < journey.length - 1 && <span className="h-px w-8 bg-white/20 sm:w-12" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right — the visual changes as you scroll */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <StageVisual index={active} />
              {/* growing connector underneath, ties the stages together */}
              <div className="mt-10 h-px w-64 overflow-hidden bg-white/20">
                <motion.div
                  className="h-full origin-left bg-gold"
                  style={{ scaleX: reduce ? 1 : lineScale }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

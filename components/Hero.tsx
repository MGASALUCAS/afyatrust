"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { WHATSAPP_LINK } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ArrowIcon } from "./Icons";

// Fine film grain - the cinematic fallback if the videos ever fail to load.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

const SOURCES = ["/media/hero.mp4", "/media/hero2.mp4"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t, locale } = useI18n();
  // The tagline always reads as two lines, each animated word by word.
  const lines = [t("hero.titleLine1"), t("hero.titleLine2")];
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);

  // Two layers per slide: a sharp (object-contain) layer + a blurred backdrop.
  const sharpRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const blurRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Play the active slide from the start; pause the other once the crossfade ends.
  useEffect(() => {
    if (failed) return;
    const play = (i: number) =>
      [sharpRefs.current[i], blurRefs.current[i]].forEach((v) => {
        if (!v) return;
        v.muted = true;
        try {
          v.currentTime = 0;
        } catch {}
        void v.play().catch(() => {});
      });

    play(active);
    const other = active === 0 ? 1 : 0;
    const t = window.setTimeout(() => {
      [sharpRefs.current[other], blurRefs.current[other]].forEach((v) => {
        if (!v) return;
        v.pause();
        try {
          v.currentTime = 0;
        } catch {}
      });
    }, 1100);
    return () => window.clearTimeout(t);
  }, [active, failed]);

  const next = () => setActive((i) => (i === 0 ? 1 : 0));

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-teal-dark"
    >
      {/* Layer 0 - cinematic fallback (always behind the video) */}
      <motion.div style={{ scale: reduce ? 1 : scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_20%,#0a7c86_0%,#005159_42%,#00343a_100%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
        />
      </motion.div>

      {/* Layer 1 - the two alternating video slides (blurred backdrop + sharp HD).
          Mobile: full-bleed background. Desktop: a framed media panel on the right -
          inset from the edges with a thin border, like a card sitting on the hero. */}
      {!failed && (
        <motion.div
          style={{ scale: reduce ? 1 : scale }}
          className="absolute inset-0 lg:left-auto lg:right-6 lg:top-[104px] lg:bottom-8 lg:w-[38vw] lg:overflow-hidden lg:rounded-[28px] lg:border lg:border-white/20 lg:shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)]"
        >
          {SOURCES.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
              style={{ opacity: active === i ? 1 : 0 }}
            >
              {/* Blurred backdrop fills the wide screen - hides any letterboxing */}
              <video
                ref={(el) => {
                  blurRefs.current[i] = el;
                }}
                className="absolute inset-0 h-full w-full scale-[1.15] object-cover blur-2xl brightness-[0.55] saturate-[1.1] lg:brightness-[0.7]"
                muted
                playsInline
                preload="auto"
                aria-hidden
              >
                <source src={src} type="video/mp4" />
              </video>

              {/* Sharp, full-resolution layer - object-contain = no over-zoom, full HD */}
              <video
                ref={(el) => {
                  sharpRefs.current[i] = el;
                }}
                className="absolute inset-0 h-full w-full object-contain object-center"
                muted
                playsInline
                preload="auto"
                onEnded={next}
                onError={() => setFailed(true)}
              >
                <source src={src} type="video/mp4" />
              </video>
            </div>
          ))}
        </motion.div>
      )}

      {/* Layer 2 - legibility scrims. Mobile: full coverage. Desktop: left-only, so the
          video on the right stays fully visible from the very top. */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/90 via-teal-dark/35 to-teal-dark/55 lg:hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/85 via-teal-dark/25 to-transparent lg:from-teal-dark/90 lg:via-teal-dark/45 lg:via-38% lg:to-transparent lg:to-62%" />

      {/* Content */}
      <motion.div
        style={{ y: reduce ? 0 : y, opacity: reduce ? 1 : fade }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="container-page">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sage sm:text-[13px] sm:tracking-[0.16em]"
          >
            <span className="h-1 w-1 rounded-full bg-gold sm:h-1.5 sm:w-1.5" />
            {t("hero.eyebrow")}
          </motion.span>

          <h1
            key={locale}
            className="mt-6 max-w-4xl font-display text-[clamp(32px,6vw,64px)] font-700 leading-[1.04] tracking-tight text-white [text-shadow:0_2px_30px_rgba(0,52,58,0.45)]"
          >
            {lines.map((line, li) => {
              const offset = li === 0 ? 0 : lines[0].split(" ").length;
              return (
                <span key={li} className="block">
                  {line.split(" ").map((w, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.15 + (offset + i) * 0.09,
                      }}
                    >
                      {w}&nbsp;
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/85"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="mt-8 flex flex-row flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className="btn inline-flex bg-white px-4 py-2 text-[13px] text-teal shadow-soft hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-[15px]"
            >
              {t("hero.ctaPrimary")}
              <ArrowIcon className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" />
            </a>
            <a
              href="#how"
              className="btn border border-white/30 bg-white/5 px-4 py-2 text-[13px] text-white backdrop-blur-sm hover:bg-white/10 sm:px-6 sm:py-3 sm:text-[15px]"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide indicator - shows which film is playing, and lets you switch */}
      {!failed && (
        <div className="absolute bottom-8 right-6 z-10 flex gap-2 sm:right-8 lg:bottom-14 lg:right-12">
          {SOURCES.map((src, i) => (
            <button
              key={src}
              aria-label={`${t("hero.clipLabel")} ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-7 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: reduce ? 1 : fade }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

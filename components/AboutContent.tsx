"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/motion/Reveal";
import SmartImage from "@/components/SmartImage";
import { founders, WHATSAPP_LINK } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ArrowIcon } from "@/components/Icons";

type Belief = { title: string; desc: string };

export default function AboutContent() {
  const { t, tr } = useI18n();
  const beliefs = tr<Belief[]>("about.beliefs");
  const roles = tr<string[]>("about.roles");

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* 1 — Statement hero */}
        <section className="container-page pb-20 pt-36 sm:pt-44">
          <Reveal>
            <span className="eyebrow">{t("about.eyebrow")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(36px,6vw,68px)] font-700 leading-[1.02] tracking-tight text-charcoal">
              {t("about.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-[19px] leading-relaxed text-charcoal-muted">
              {t("about.intro")}
            </p>
          </Reveal>
        </section>

        {/* 2 — Inspiration / co-founder note (founders portrait) */}
        <section className="section pt-4">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <figure>
                <SmartImage
                  src="/media/founders.jpeg"
                  alt={t("about.foundersAlt")}
                  aspect="3 / 4"
                  priority
                  className="rounded-xl2 border border-line shadow-soft"
                  position="center 20%"
                />
                <figcaption className="mt-4 text-[13px] text-charcoal-faint">
                  {founders.map((f) => f.name).join(" & ")} — {t("about.foundersCaption")}
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <span className="eyebrow">{t("about.storyEyebrow")}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-700 leading-tight tracking-tight text-charcoal">
                  {t("about.storyTitle")}
                </h2>
              </Reveal>

              <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-charcoal-muted">
                <Reveal delay={0.1}>
                  <p>{t("about.storyP1")}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <p>{t("about.storyP2")}</p>
                </Reveal>
              </div>

              {/* Co-founder note */}
              <Reveal delay={0.2}>
                <blockquote className="mt-8 border-l-2 border-teal pl-6">
                  <p className="font-display text-[20px] font-600 leading-snug text-charcoal">
                    &ldquo;{t("about.quote")}&rdquo;
                  </p>
                  <footer className="mt-4 text-[14px] text-charcoal-muted">
                    <span className="font-600 text-charcoal">{founders[0].name}</span>
                    {" · "}
                    {roles[0]}
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3 — The team / co-founders */}
        <section className="section bg-sage-mist pt-0 sm:pt-0">
          <div className="container-page py-20 sm:py-24">
            <Reveal>
              <span className="eyebrow">{t("about.teamEyebrow")}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(26px,3.6vw,38px)] font-700 leading-tight tracking-tight text-charcoal">
                {t("about.teamTitle")}
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-2xl">
              {founders.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.08}>
                  <div className="rounded-xl2 border border-line bg-white p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-teal text-[18px] font-700 text-white">
                      {f.name.charAt(0)}
                    </span>
                    <h3 className="mt-5 font-display text-[19px] font-700 text-charcoal">
                      {f.name}
                    </h3>
                    <p className="mt-1 text-[14px] text-charcoal-muted">{roles[i] ?? f.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — Team in the field (market photo) */}
        <section className="section">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">{t("about.fieldEyebrow")}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(26px,3.6vw,40px)] font-700 leading-tight tracking-tight text-charcoal">
                {t("about.fieldTitle")}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="relative mt-10 overflow-hidden rounded-xl2 border border-line shadow-soft">
                <SmartImage
                  src="/media/field.jpeg"
                  alt={t("about.fieldAlt")}
                  aspect="3 / 2"
                  position="center 35%"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent p-6 sm:p-8">
                  <p className="max-w-2xl text-[15px] font-500 leading-relaxed text-white sm:text-[17px]">
                    {t("about.fieldCaption")}
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* 5 — What we believe */}
        <section className="section bg-sage-mist">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">{t("about.beliefsEyebrow")}</span>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {beliefs.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div>
                    <span className="font-display text-[15px] font-700 text-sage">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-[22px] font-700 leading-snug text-charcoal">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-charcoal-muted">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — CTA */}
        <section className="section">
          <div className="container-page">
            <Reveal>
              <div className="rounded-xl2 bg-teal px-8 py-16 text-center sm:px-12 sm:py-20">
                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-700 leading-tight tracking-tight text-white">
                  {t("about.ctaTitle")}
                </h2>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[17px] font-700 text-teal shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {t("about.ctaButton")}
                  <ArrowIcon width={18} height={18} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

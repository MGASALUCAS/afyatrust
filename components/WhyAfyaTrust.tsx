"use client";

import { useI18n } from "@/lib/i18n";
import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";
import { WalletIcon, BoltIcon, ShieldIcon } from "./Icons";
import type { ComponentType, SVGProps } from "react";

type ReasonCopy = { title: string; desc: string };

// Icon order matches the why.items order in the locale files.
const icons: ComponentType<SVGProps<SVGSVGElement>>[] = [WalletIcon, BoltIcon, ShieldIcon];

export default function WhyAfyaTrust() {
  const { t, tr } = useI18n();
  const items = tr<ReasonCopy[]>("why.items");

  return (
    <section id="why" className="section">
      <div className="container-page">
        <SectionHead eyebrow={t("why.eyebrow")} title={t("why.title")} />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((r, i) => {
            const Icon = icons[i] ?? WalletIcon;
            return (
              <Reveal
                key={r.title}
                delay={i * 0.08}
                className="rounded-xl2 border border-line bg-white p-8 transition-colors duration-200 hover:border-teal/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-sage-mist text-teal">
                  <Icon width={22} height={22} />
                </span>
                <h3 className="mt-6 font-display text-[20px] font-700 text-charcoal">{r.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-charcoal-muted">{r.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

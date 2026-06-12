"use client";

import { motion } from "framer-motion";
import { packages, WHATSAPP_LINK, type Package } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHead from "./SectionHead";
import { CheckIcon } from "./Icons";

function PriceCard({ pkg, index }: { pkg: Package; index: number }) {
  const recommended = pkg.recommended;
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col rounded-xl2 bg-white p-7 ${
        recommended
          ? "border-2 border-teal shadow-lift lg:-translate-y-2"
          : "border border-line shadow-card hover:border-teal/40 hover:shadow-soft"
      }`}
    >
      {recommended && (
        <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[12px] font-700 uppercase tracking-wide text-charcoal">
          {t("plans.recommended")}
        </span>
      )}

      <h3 className="font-display text-[20px] font-700 text-charcoal">{pkg.name}</h3>
      <p className="mt-1.5 min-h-[40px] text-[14px] leading-relaxed text-charcoal-muted">
        {t(`plans.taglines.${pkg.name}`)}
      </p>

      <div className="mt-6 border-t border-line pt-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-medium text-charcoal-faint">TZS</span>
          <span className="font-display text-[34px] font-700 leading-none text-charcoal">
            {pkg.monthly}
          </span>
          <span className="text-[14px] text-charcoal-muted">{t("plans.perMonth")}</span>
        </div>
        <p className="mt-2 text-[14px] text-charcoal-muted">
          {t("plans.registration")}{" "}
          <span className="font-semibold text-charcoal">TZS {pkg.registration}</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2.5 text-[14px] text-charcoal-muted">
        <li className="flex items-center gap-2">
          <CheckIcon width={16} height={16} className="text-teal" /> {t("plans.benefitClinics")}
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon width={16} height={16} className="text-teal" /> {t("plans.benefitNoCash")}
        </li>
      </ul>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener"
        className={`mt-7 w-full ${recommended ? "btn-primary" : "btn-secondary"}`}
      >
        {t("plans.choose")} {pkg.name}
      </a>
    </motion.div>
  );
}

export default function Packages() {
  const { t } = useI18n();
  return (
    <section id="plans" className="section bg-sage-mist">
      <div className="container-page">
        <SectionHead eyebrow={t("plans.eyebrow")} title={t("plans.title")} sub={t("plans.sub")} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <PriceCard key={pkg.name} pkg={pkg} index={i} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex flex-col justify-center rounded-xl2 border border-dashed border-sage bg-white/60 p-7 text-center"
          >
            <h3 className="font-display text-[18px] font-700 text-charcoal">{t("plans.helpTitle")}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-charcoal-muted">
              {t("plans.helpText")}
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="btn-secondary mt-5">
              {t("plans.helpCta")}
            </a>
          </motion.div>
        </div>

        <p className="mt-8 text-center text-[13px] text-charcoal-faint">
          {t("plans.footnote")}
        </p>
      </div>
    </section>
  );
}

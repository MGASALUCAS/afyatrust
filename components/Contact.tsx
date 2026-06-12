"use client";

import { WHATSAPP_NUMBER, WHATSAPP_LINK } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { WhatsAppIcon, ArrowIcon } from "./Icons";
import Reveal from "./motion/Reveal";
import BackgroundVideo from "./BackgroundVideo";

export default function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 bg-teal px-8 py-16 text-center sm:px-12 sm:py-20">
            <BackgroundVideo src="/media/background2.mp4" overlayClassName="bg-teal/85" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-teal-deep/0 to-teal-dark/40" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-[clamp(30px,4.5vw,46px)] font-700 leading-tight tracking-tight text-white">
                {t("contact.title")}
              </h2>
              <p className="mt-4 text-[18px] leading-relaxed text-sage">
                {t("contact.sub")}
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener"
                className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[18px] font-700 text-teal shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="text-teal" />
                {WHATSAPP_NUMBER}
                <ArrowIcon width={20} height={20} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

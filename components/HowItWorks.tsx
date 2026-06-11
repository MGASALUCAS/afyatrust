import { steps } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="container-page">
        <SectionHead eyebrow="How it works" title="Four steps. That's it." />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line lg:block" />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.08} className="relative">
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line bg-white font-display text-[16px] font-700 text-teal shadow-card">
                    {step.n}
                  </span>
                  <div className="lg:mt-6">
                    <h3 className="font-display text-[19px] font-600 text-charcoal">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-charcoal-muted">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

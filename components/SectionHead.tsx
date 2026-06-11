import Reveal from "./motion/Reveal";

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
};

export default function SectionHead({ eyebrow, title, sub, align = "center" }: SectionHeadProps) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-[clamp(30px,4.5vw,46px)] font-700 leading-tight tracking-tight text-charcoal">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-[17px] leading-relaxed text-charcoal-muted ${
              center ? "mx-auto max-w-xl" : ""
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

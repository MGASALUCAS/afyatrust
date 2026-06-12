import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — AfyaTrust",
  description:
    "Why we started AfyaTrust: health protection for the riders, traders and families who keep Tanzania moving.",
};

export default function AboutPage() {
  return <AboutContent />;
}

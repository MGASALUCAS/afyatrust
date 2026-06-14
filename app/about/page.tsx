import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, founderSchemas } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About - AfyaTrust",
  description:
    "Why we started AfyaTrust: health protection for the riders, traders and families who keep Tanzania moving. Meet the founding team - Johnson Thomson Daniel and Hamidu Hafidhihi Hassani.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About - AfyaTrust",
    description:
      "Why we started AfyaTrust: health protection for the riders, traders and families who keep Tanzania moving.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      {founderSchemas.map((person) => (
        <JsonLd key={person["@id"]} data={person} />
      ))}
      <AboutContent />
    </>
  );
}

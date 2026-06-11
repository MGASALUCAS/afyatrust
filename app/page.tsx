import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import WhyAfyaTrust from "@/components/WhyAfyaTrust";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <HowItWorks />
        <Packages />
        <WhyAfyaTrust />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

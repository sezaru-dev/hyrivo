import CTAFooter from "@/components/sections/CTAFooter";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Hero/>
      <PainPoints/>
      <Features/>
      <CTAFooter/>
      <Footer/>
    </main>
  );
}

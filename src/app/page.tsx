import CTAFooter from "@/components/sections/CTAFooter";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header/>
      <Hero/>
      <PainPoints/>
      <Features/>
      <CTAFooter/>
      <Footer/>
    </main>
  );
}

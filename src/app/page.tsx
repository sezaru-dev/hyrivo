import CTAFooter from "@/components/sections/CTAFooter";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <section className="text-center">
        <h1 className="text-4xl font-semibold text-primary">Hyrivo</h1>
        <h2 className="text-lg">My Job Application Tracker</h2>
      </section>
      <Features/>
      <CTAFooter/>
      <Footer/>
    </main>
  );
}

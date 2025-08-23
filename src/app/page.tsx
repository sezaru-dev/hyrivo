import CTAFooter from "@/components/sections/CTAFooter";
import FAQSection from "@/components/sections/FAQs";
import WhatYouCanDo from "@/components/sections/WhatYouCanDo";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyHyrivo from "@/components/sections/WhyHyrivo";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-[#fafafa] min-h-screen  overflow-hidden">
      <Header/>
      <Hero/>
      <HowItWorks/>
      <WhyHyrivo/>
      <WhatYouCanDo/>
      <FAQSection/>
      <CTAFooter/>
      <Footer/>
    </main>
  );
}

import React from "react";
import HeroSlider from "@/components/site/HeroSlider";
import NewsTicker from "@/components/site/NewsTicker";
import OfstedHighlight from "@/components/site/OfstedHighlight";
import WelcomeSection from "@/components/site/WelcomeSection";
import WhyChooseUs from "@/components/site/WhyChooseUs";
import TeamSection from "@/components/site/TeamSection";
import EventsSection from "@/components/site/EventsSection";
import NewsSection from "@/components/site/NewsSection";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import AreaCoverage from "@/components/site/AreaCoverage";
import EnquirySection from "@/components/site/EnquirySection";

export default function Home() {
  const scrollToEnquire = () => {
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <HeroSlider onEnquire={scrollToEnquire} />
      <NewsTicker />
      <main>
        <OfstedHighlight />
        <WelcomeSection />
        <WhyChooseUs onEnquire={scrollToEnquire} />
        <TeamSection />
        <EventsSection />
        <NewsSection />
        <TestimonialsSection />
        <AreaCoverage onEnquire={scrollToEnquire} />
        <EnquirySection />
      </main>
    </>
  );
}
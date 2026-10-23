import React from "react";
import SEO from "@/components/SEO";
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
import { useWordPressHomePage } from "@/hooks/useWordPressData";

export default function Home() {
  const { data: homePage } = useWordPressHomePage();

  React.useEffect(() => {
    if (homePage?.databaseId) {
      console.log(
        `%c[WordPress Home Page Active]%c Loaded from WordPress | Database ID: %c#${homePage.databaseId}%c | URI: %c${homePage.uri}%c | Title: "${homePage.title}"`,
        "background: #0284c7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #475569;",
        "color: #2563eb; font-weight: bold; background: #eff6ff; padding: 1px 6px; border-radius: 3px; font-size: 13px;",
        "color: #475569;",
        "color: #7c3aed; font-weight: bold;",
        "color: #475569;"
      );
    }
  }, [homePage]);

  const scrollToEnquire = () => {
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEO
        title="Outstanding Independent Fostering Agency London & UK"
        description="Shining Stars Fostering Agency is an independent fostering agency rated Outstanding by Ofsted, providing 24/7 bespoke support and generous allowances to foster carers."
      />
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
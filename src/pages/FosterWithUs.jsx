import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import PhoneButtons from "@/components/site/PhoneButtons";
import InfoCards from "@/components/site/InfoCards";
import TextSection from "@/components/site/TextSection";
import JourneySteps from "@/components/site/JourneySteps";
import FaqSection from "@/components/site/FaqSection";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { useWordPressPage } from "@/hooks/useWordPressData";
import { LONDON_MAP } from "@/lib/ssfaData";
import { HERO_IMGS, FOSTER_INVOLVES, PLACEMENTS, JOURNEY, TRAINING, FAQS } from "@/lib/pagesContent";
import { Rss, Hash } from "lucide-react";

export default function FosterWithUs() {
  const { data: page, isLive } = useWordPressPage("foster-with-us");

  useEffect(() => {
    if (page?.databaseId) {
      console.log(
        `%c[Foster With Us Page Active]%c Loaded from WordPress | Database ID: %c#${page.databaseId}%c | URI: %c${page.uri}%c | Title: "${page.title}"`,
        "background: #ea580c; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #475569;",
        "color: #059669; font-weight: bold; background: #ecfdf5; padding: 1px 6px; border-radius: 3px;",
        "color: #475569;",
        "color: #7c3aed; font-weight: bold;",
        "color: #475569;"
      );
    }
  }, [page]);

  return (
    <main>
      <SEO
        title="Foster With Us — Journey, Allowances & FAQs"
        description="Discover how to become a foster carer with Shining Stars Fostering. Learn about allowances starting from £450/week, 24/7 support, training, and the application process."
        image={page?.image || HERO_IMGS.foster}
      />
      <PageHero
        eyebrow="Foster with us"
        title={page?.title || "Could you make a difference through fostering?"}
        intro="We support foster families across London and the surrounding counties, and aim to welcome foster carers from across England. The first step is simply a conversation."
        img={page?.image || HERO_IMGS.foster}
        imgAlt="Children enjoying time outdoors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <p className="font-display font-bold text-charcoal mb-3">Call us about fostering</p>
            <PhoneButtons />
          </div>
          <div className="flex items-center gap-2">
            {isLive && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-green/20 text-emerald-300 px-3 py-1.5 rounded-full backdrop-blur">
                <Rss size={12} /> Live from WordPress
              </span>
            )}
            {page?.databaseId && (
              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold bg-white/15 text-white px-3 py-1.5 rounded-full backdrop-blur">
                <Hash size={12} /> Page ID: {page.databaseId}
              </span>
            )}
          </div>
        </div>
      </PageHero>

      <InfoCards id="what" eyebrow="What fostering involves" color="blue" title="Giving a child a safe place to grow." items={FOSTER_INVOLVES} />

      <TextSection
        id="who" bg="bg-mint/50" eyebrow="Who can foster" color="green" title="People from many walks of life."
        paragraphs={[
          "Our foster carers come from varied backgrounds, cultures, faiths and family situations. What matters most is your ability to offer a child care, understanding, resilience and patience.",
          "Whether fostering is right for you depends on your individual circumstances. We will talk through the details with you personally.",
        ]}
        img={LONDON_MAP} imgAlt="Map of London boroughs and surrounding counties"
        note="Current recruitment areas across England."
      />

      <InfoCards id="types" eyebrow="Types of fostering" color="orange" title="Placements we offer." items={PLACEMENTS} />

      <JourneySteps id="journey" steps={JOURNEY} />

      <InfoCards id="training" eyebrow="Training & support" color="purple" title="You are never on your own." items={TRAINING} />

      <TextSection
        id="financial" bg="bg-sky/60" eyebrow="Financial support" color="blue" title="Help with the cost of caring."
        paragraphs={[
          "Foster carers receive a fostering allowance for each child in their care, to help meet the child's needs. The amount depends on the type of placement and the child's needs.",
          "We will explain current allowances, and any other financial matters, during your conversation with us.",
        ]}
        note="Current allowance rates and any tax information."
      >
        <Link to="/fostering-allowance-shiningstars" className="mt-5 inline-flex font-bold text-orange hover:text-blue py-1">
          Read about fostering allowances →
        </Link>
      </TextSection>

      <FaqSection id="faqs" faqs={FAQS} />

      <ClosingCta title="Call us about fostering." text="Speaking to us is the quickest way to get your questions answered." enquire={false} />

      <EnquirySection />
    </main>
  );
}
import React from "react";
import PageHero from "@/components/site/PageHero";
import PhoneButtons from "@/components/site/PhoneButtons";
import InfoCards from "@/components/site/InfoCards";
import TextSection from "@/components/site/TextSection";
import JourneySteps from "@/components/site/JourneySteps";
import FaqSection from "@/components/site/FaqSection";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { LONDON_MAP } from "@/lib/ssfaData";
import { HERO_IMGS, FOSTER_INVOLVES, PLACEMENTS, JOURNEY, TRAINING, FAQS, SITE } from "@/lib/pagesContent";

export default function FosterWithUs() {
  return (
    <main>
      <PageHero
        eyebrow="Foster with us"
        title="Could you make a difference through fostering?"
        intro="We support foster families across London and the surrounding counties, and aim to welcome foster carers from across England. The first step is simply a conversation."
        img={HERO_IMGS.foster}
        imgAlt="Children enjoying time outdoors"
      >
        <p className="font-display font-bold text-charcoal mb-3">Call us about fostering</p>
        <PhoneButtons />
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
        <a href={`${SITE}/fostering-allowance-shiningstars/`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-bold text-orange hover:text-blue py-1">
          Read about fostering allowances →
        </a>
      </TextSection>

      <FaqSection id="faqs" faqs={FAQS} />

      <ClosingCta title="Call us about fostering." text="Speaking to us is the quickest way to get your questions answered." enquire={false} />

      <EnquirySection />
    </main>
  );
}
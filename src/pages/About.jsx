import React from "react";
import PageHero from "@/components/site/PageHero";
import PhoneButtons from "@/components/site/PhoneButtons";
import TextSection from "@/components/site/TextSection";
import InfoCards from "@/components/site/InfoCards";
import TeamSection from "@/components/site/TeamSection";
import TbcNote from "@/components/site/TbcNote";
import RecognitionSection from "@/components/site/RecognitionSection";
import OfficeContact from "@/components/site/OfficeContact";
import ClosingCta from "@/components/site/ClosingCta";
import { MISSION_IMG } from "@/lib/ssfaData";
import { HERO_IMGS, ABOUT_STORY, VALUES, SUPPORT } from "@/lib/pagesContent";

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About Shining Stars"
        title="Helping children shine, supporting families to thrive."
        intro="We are an independent fostering agency based in Croydon, rated Outstanding by Ofsted. We support foster families across London and the surrounding counties."
        img={HERO_IMGS.about}
        imgAlt="Caroline from the Shining Stars team at the London Marathon"
        focus="center 30%"
      >
        <PhoneButtons />
      </PageHero>

      <TextSection
        id="story" eyebrow="Our story & purpose" color="blue" title="A fresh perspective on foster care."
        paragraphs={ABOUT_STORY} img={MISSION_IMG} imgAlt="Illustration of a family kept safe in a bubble"
        note="Founding year and current service coverage."
      />

      <InfoCards id="values" bg="bg-mint/50" eyebrow="Our values" color="green" title="What matters to us." items={VALUES} />

      <InfoCards id="support" eyebrow="How we support you" color="orange" title="Support for foster carers and the children in their care." items={SUPPORT} />

      <div id="team" className="scroll-mt-24">
        <TeamSection />
        <div className="container-ss -mt-12 pb-16 text-center">
          <TbcNote>Individual staff profiles and biographies. Placeholders until each profile is approved.</TbcNote>
        </div>
      </div>

      <RecognitionSection />
      <OfficeContact />
      <ClosingCta title="Let’s talk about fostering." text="Our friendly team is happy to answer your questions, with no obligation." />
    </main>
  );
}
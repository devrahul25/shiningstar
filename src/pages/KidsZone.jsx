import React from "react";
import { LifeBuoy } from "lucide-react";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import TextSection from "@/components/site/TextSection";
import InfoCards from "@/components/site/InfoCards";
import RightsSection from "@/components/site/RightsSection";
import ResourceGroups from "@/components/site/ResourceGroups";
import HelpBox from "@/components/site/HelpBox";
import { CONTACT } from "@/lib/ssfaData";
import { HERO_IMGS, KIDS_LIVING, TALK_TO, RESOURCE_GROUPS } from "@/lib/pagesContent";

const PROCEDURES = "https://www.proceduresonline.com/shiningstars/index.html";

export default function KidsZone() {
  return (
    <main>
      <SEO
        title="Kids Zone — Your Space & Your Rights"
        description="A dedicated space for children and young people in foster care: rights, resources, someone to talk to, and advice from Shining Stars Fostering Agency."
        image={HERO_IMGS.kids}
      />
      <PageHero
        eyebrow="Kids Zone"
        title="Your space. Your voice."
        intro="This page is for you: children and young people living with Shining Stars foster families."
        img={HERO_IMGS.kids}
        imgAlt="A sunny, open field"
      >
        <a href="#help" className="inline-flex items-center gap-2 bg-orange text-white font-bold px-6 py-3.5 rounded-full min-h-[48px] hover:bg-orange/90 shadow-md">
          <LifeBuoy size={18} /> I need help
        </a>
      </PageHero>

      <TextSection
        id="welcome" eyebrow="Welcome" color="orange" title="Hello, and welcome!"
        paragraphs={[
          "Here you can find out about living with a foster family, your rights, who you can talk to and where to get help.",
          "Whatever your age, and whatever is going on, you matter. You can come back to this page whenever you like.",
        ]}
      />

      <InfoCards id="living" bg="bg-sky/60" eyebrow="Living with a foster family" color="blue" title="What it can mean for you." items={KIDS_LIVING} />

      <RightsSection />

      <InfoCards id="talk" eyebrow="People you can talk to" color="purple" title="You are never on your own." items={TALK_TO} />

      <TextSection
        id="youth-panel" bg="bg-mint/50" eyebrow="Youth Panel" color="green" title="Help shape Shining Stars."
        paragraphs={["Young people can share ideas and feedback to help make things better for children in foster care. If you would like to get involved, ask your foster carer or your supervising social worker."]}
        note="How the Youth Panel works, who can join and when it meets."
      />

      <ResourceGroups groups={RESOURCE_GROUPS} />

      <TextSection
        id="concern" eyebrow="Raising a concern" color="orange" title="Something not right? Tell us."
        paragraphs={[
          "If you are unhappy about something, or want to make a complaint, you can tell your foster carer, your social worker or anyone at Shining Stars. You will not get into trouble for speaking up.",
          `You can also call our office on ${CONTACT.phone} or ${CONTACT.mobile}, or email ${CONTACT.email}.`,
        ]}
        note="Child-friendly complaints procedure approved by the agency."
      >
        <a href={PROCEDURES} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-bold text-orange hover:text-blue py-1">
          Read our policies and procedures →
        </a>
      </TextSection>

      <HelpBox />
    </main>
  );
}
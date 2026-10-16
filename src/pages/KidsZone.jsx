import React, { useEffect } from "react";
import { LifeBuoy, Rss, Hash } from "lucide-react";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import TextSection from "@/components/site/TextSection";
import InfoCards from "@/components/site/InfoCards";
import RightsSection from "@/components/site/RightsSection";
import ResourceGroups from "@/components/site/ResourceGroups";
import HelpBox from "@/components/site/HelpBox";
import { useWordPressPage } from "@/hooks/useWordPressData";
import { CONTACT } from "@/lib/ssfaData";
import { HERO_IMGS, KIDS_LIVING, TALK_TO, RESOURCE_GROUPS } from "@/lib/pagesContent";

const PROCEDURES = "https://www.proceduresonline.com/shiningstars/index.html";

export default function KidsZone() {
  const { data: page, isLive } = useWordPressPage("kids-zone");

  useEffect(() => {
    if (page?.databaseId) {
      console.log(
        `%c[Kids Zone Page Active]%c Loaded from WordPress | Database ID: %c#${page.databaseId}%c | URI: %c${page.uri}%c | Title: "${page.title}"`,
        "background: #16a34a; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
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
        title="Kids Zone — Your Space & Your Rights"
        description="A dedicated space for children and young people in foster care: rights, resources, someone to talk to, and advice from Shining Stars Fostering Agency."
        image={page?.image || HERO_IMGS.kids}
      />
      <PageHero
        eyebrow="Kids Zone"
        title={page?.title || "Your space. Your voice."}
        intro="This page is for you: children and young people living with Shining Stars foster families."
        img={page?.image || HERO_IMGS.kids}
        imgAlt="A sunny, open field"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <a href="#help" className="inline-flex items-center gap-2 bg-orange text-white font-bold px-6 py-3.5 rounded-full min-h-[48px] hover:bg-orange/90 shadow-md">
            <LifeBuoy size={18} /> I need help
          </a>
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
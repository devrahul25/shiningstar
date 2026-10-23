import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import TeamSection from "@/components/site/TeamSection";
import RecognitionSection from "@/components/site/RecognitionSection";
import OfficeContact from "@/components/site/OfficeContact";
import ClosingCta from "@/components/site/ClosingCta";
import WordPressContentRenderer from "@/components/site/WordPressContentRenderer";
import { useWordPressPage } from "@/hooks/useWordPressData";
import { HERO_IMGS } from "@/lib/pagesContent";
import { Loader2 } from "lucide-react";

export default function About() {
  const { data: page, isLoading, isLive } = useWordPressPage("about");

  useEffect(() => {
    if (page?.databaseId) {
      console.log(
        `%c[About Page Active]%c Loaded from WordPress | Database ID: %c#${page.databaseId}%c | URI: %c${page.uri}%c | Title: "${page.title}"`,
        "background: #2563eb; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
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
        title={page?.title || "About Us — Our Values & Mission"}
        description="Learn about Shining Stars Fostering Agency: our founding story, core values, family-feel environment, and Ofsted Outstanding rated care in Croydon and London."
        image={page?.image || HERO_IMGS.about}
      />

      <PageHero
        eyebrow="About Shining Stars"
        title={page?.title ? `${page.title} Shining Stars Fostering` : "Helping children shine, supporting families to thrive."}
        intro="We are an independent fostering agency based in Croydon, rated Outstanding by Ofsted. We support foster families across London and the surrounding counties."
        img={page?.image || HERO_IMGS.about}
        imgAlt={page?.imageAlt || "Caroline from the Shining Stars team at the London Marathon"}
        focus="center 30%"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/foster-with-us#enquire"
            className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-orange/90 transition-all shadow-md text-base"
          >
            Send an enquiry
          </Link>
        </div>
      </PageHero>

      {/* Dynamic WordPress Content Sections (Strictly from WordPress content, zero extra copy) */}
      {isLoading ? (
        <section className="bg-white py-20">
          <div className="container-ss max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
            <p className="text-charcoal/60 font-medium">Loading About page content from WordPress...</p>
          </div>
        </section>
      ) : page?.content ? (
        <section className="bg-slate-50/50 py-16 md:py-24">
          <div className="container-ss">
            <WordPressContentRenderer
              content={page.content}
              pageTitle={page.title}
              pageUri={page.uri}
              slug={page.slug}
            />
          </div>
        </section>
      ) : (
        <section className="bg-white py-16 md:py-24">
          <div className="container-ss max-w-4xl mx-auto">
            <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-200">
              <p className="text-charcoal/70">Content could not be loaded from WordPress at this time.</p>
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      <div id="team" className="scroll-mt-24">
        <TeamSection />
      </div>

      <RecognitionSection />
      <OfficeContact />
      <ClosingCta
        title="Let’s talk about fostering."
        text="Our friendly team is happy to answer your questions, with no obligation."
      />
    </main>
  );
}
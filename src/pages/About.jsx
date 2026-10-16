import React, { useEffect } from "react";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import PhoneButtons from "@/components/site/PhoneButtons";
import TeamSection from "@/components/site/TeamSection";
import RecognitionSection from "@/components/site/RecognitionSection";
import OfficeContact from "@/components/site/OfficeContact";
import ClosingCta from "@/components/site/ClosingCta";
import { useWordPressPage } from "@/hooks/useWordPressData";
import { HERO_IMGS } from "@/lib/pagesContent";
import { Rss, Hash, Loader2 } from "lucide-react";

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
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <PhoneButtons />
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

      {/* Real WordPress Content Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-ss max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue animate-spin mb-3" />
              <p className="text-charcoal/60 text-sm">Loading About page content from WordPress...</p>
            </div>
          ) : page?.content ? (
            <div
              className="prose prose-slate lg:prose-lg max-w-none text-charcoal/80 leading-relaxed space-y-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:font-display [&_h1]:text-charcoal [&_h1]:mt-12 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-charcoal [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-blue [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_a]:text-orange [&_a]:font-bold hover:[&_a]:text-blue [&_.text-wrap]:bg-sky/30 [&_.text-wrap]:p-8 [&_.text-wrap]:rounded-3xl [&_.text-wrap]:border [&_.text-wrap]:border-sky"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="bg-slate-50 p-8 rounded-3xl text-center">
              <p className="text-charcoal/70">Content could not be loaded from WordPress at this time.</p>
            </div>
          )}
        </div>
      </section>

      <div id="team" className="scroll-mt-24">
        <TeamSection />
      </div>

      <RecognitionSection />
      <OfficeContact />
      <ClosingCta title="Let’s talk about fostering." text="Our friendly team is happy to answer your questions, with no obligation." />
    </main>
  );
}
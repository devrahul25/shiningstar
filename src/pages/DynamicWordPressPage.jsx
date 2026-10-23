import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useWordPressPage } from "@/hooks/useWordPressData";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import PageNotFound from "@/lib/PageNotFound";
import { Loader2 } from "lucide-react";
import { HERO_IMGS } from "@/lib/pagesContent";
import { decodeHtmlEntities, stripHtml } from "@/api/wordpressUtils";
import WordPressContentRenderer from "@/components/site/WordPressContentRenderer";

export default function DynamicWordPressPage({ uriOverride }) {
  const params = useParams();
  const location = useLocation();

  // Resolve target URI from prop, router params, or pathname (handles nested WordPress pages)
  const resolvedUri =
    uriOverride ||
    params["*"] ||
    params.slug ||
    location.pathname.replace(/^\/+|\/+$/g, "") ||
    "what-is-fostering";

  const { data: page, isLoading, isError } = useWordPressPage(resolvedUri);

  React.useEffect(() => {
    if (page?.databaseId) {
      console.log(
        `%c[Dynamic Page Loaded]%c Database ID: %c#${page.databaseId}%c | Title: %c"${page.title}"%c | URI: %c${page.uri}`,
        "background: #0284c7; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #475569;",
        "color: #2563eb; font-weight: bold; background: #eff6ff; padding: 1px 6px; border-radius: 3px; font-size: 13px;",
        "color: #475569;",
        "color: #d97706; font-weight: bold;",
        "color: #475569;",
        "color: #7c3aed; font-weight: bold;"
      );
    }
  }, [page]);

  if (isLoading) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12">
        <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
        <p className="text-charcoal/70 font-semibold text-lg">Loading content from WordPress...</p>
      </main>
    );
  }

  // If WordPress returned null or error, gracefully display PageNotFound
  if (isError || !page) {
    return <PageNotFound />;
  }

  // Extract real dynamic lead sentence from WordPress content for the hero intro
  const leadMatch = page?.content
    ? page.content
        .replace(/<div[^>]*>/gi, "")
        .replace(/<\/div>/gi, "")
        .match(/<p[^>]*>([\s\S]*?)<\/p>/i)
    : null;
  const leadIntro = leadMatch ? decodeHtmlEntities(stripHtml(leadMatch[1])).trim() : "";
  const isAboutPage =
    resolvedUri.toLowerCase() === "about" ||
    resolvedUri.toLowerCase().includes("about-shining-stars") ||
    page.slug === "about";

  const pageDisplayTitle = isAboutPage ? "About Shining Stars Fostering" : page.title;
  const pageHeroIntro = isAboutPage
    ? "An independent fostering agency dedicated to placing children at the heart of everything we do, supporting compassionate foster families across London."
    : (leadIntro || "We provide 24/7 bespoke support, comprehensive training, and generous allowances for foster carers across London and the UK.");
  const pageHeroImg =
    page.image ||
    (isAboutPage
      ? "https://teal-penguin-283093.hostingersite.com/wp-content/uploads/2026/09/smiley-parent-child-together-outdoors-park-scaled-1.jpg"
      : HERO_IMGS.about);
  const pageHeroImgAlt =
    page.imageAlt ||
    (isAboutPage ? "Foster family smiling together in park" : page.title);

  return (
    <main>
      <SEO
        title={pageDisplayTitle}
        description={`Learn more about ${pageDisplayTitle} on the Shining Stars Fostering website.`}
        image={pageHeroImg}
      />

      <PageHero
        eyebrow="Shining Stars Fostering"
        title={pageDisplayTitle}
        intro={pageHeroIntro}
        img={pageHeroImg}
        imgAlt={pageHeroImgAlt}
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

      {/* Main Content Body (Structured sections) */}
      <section className="bg-slate-50/50 py-16 md:py-24">
        <div className="container-ss">
          {page.content ? (
            <WordPressContentRenderer
              content={page.content}
              pageTitle={page.title}
              pageUri={page.uri}
              slug={page.slug}
            />
          ) : (
            <div className="bg-sky/40 p-8 rounded-3xl text-center">
              <p className="text-charcoal/70">This page does not have any body content yet in WordPress.</p>
            </div>
          )}
        </div>
      </section>

      <ClosingCta
        title="Have questions about fostering?"
        text="Our team is here to support you every step of the way."
      />
      <EnquirySection />
    </main>
  );
}

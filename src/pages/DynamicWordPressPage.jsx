import React from "react";
import { useParams, Link } from "react-router-dom";
import { useWordPressPage } from "@/hooks/useWordPressData";
import PageHero from "@/components/site/PageHero";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { ArrowLeft, Calendar, Rss, Loader2 } from "lucide-react";
import { HERO_IMGS } from "@/lib/pagesContent";

export default function DynamicWordPressPage({ uriOverride }) {
  const params = useParams();
  const uri = uriOverride || params.slug || "what-is-fostering";
  const { data: page, isLoading, isError } = useWordPressPage(uri);

  if (isLoading) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12">
        <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
        <p className="text-charcoal/70 font-semibold text-lg">Loading content from WordPress...</p>
      </main>
    );
  }

  if (isError || !page) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center container-ss">
        <h1 className="text-3xl font-display font-bold text-charcoal mb-4">Page Not Found on WordPress</h1>
        <p className="text-charcoal/70 max-w-md mb-8">
          The WordPress page <code className="bg-slate-100 px-2 py-1 rounded text-sm text-blue">/{uri}</code> could not be found or has not been published yet.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-full font-bold hover:bg-orange transition-colors"
        >
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        eyebrow="Shining Stars Fostering"
        title={page.title}
        intro="Official information and guidance from Shining Stars Fostering Agency."
        img={page.image || HERO_IMGS.about}
        imgAlt={page.title}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1 text-xs font-bold bg-green/20 text-emerald-300 px-3 py-1.5 rounded-full backdrop-blur">
            <Rss size={12} /> Live from WordPress
          </span>
          {page.date && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-white/70">
              <Calendar size={13} /> {new Date(page.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          )}
        </div>
      </PageHero>

      {/* Main Content Body */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-ss max-w-4xl mx-auto">
          {page.content ? (
            <div
              className="prose prose-slate lg:prose-lg max-w-none text-charcoal/80 leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-charcoal [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-charcoal [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_img]:rounded-3xl [&_img]:my-6 [&_img]:shadow-md [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-blue [&_a]:font-bold hover:[&_a]:text-orange [&_.e-con]:my-8 [&_.e-con-inner]:flex [&_.e-con-inner]:flex-col [&_.e-con-inner]:md:flex-row [&_.e-con-inner]:gap-8 [&_.e-con-inner]:items-center [&_.elementor-widget-image]:w-full [&_.elementor-widget-image_img]:w-full [&_.elementor-widget-image_img]:h-auto [&_.elementor-widget-image_img]:object-cover"
              dangerouslySetInnerHTML={{ __html: page.content }}
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

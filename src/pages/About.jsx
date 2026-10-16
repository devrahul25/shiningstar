import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import TeamSection from "@/components/site/TeamSection";
import RecognitionSection from "@/components/site/RecognitionSection";
import OfficeContact from "@/components/site/OfficeContact";
import ClosingCta from "@/components/site/ClosingCta";
import { useWordPressPage } from "@/hooks/useWordPressData";
import { HERO_IMGS } from "@/lib/pagesContent";
import { CHILDREN_FUTURE_IMG } from "@/lib/ssfaData";
import {
  Rss,
  Loader2,
  HeartHandshake,
  ShieldCheck,
  Award,
  Users,
  ExternalLink,
  Sparkles,
  Home,
  CheckCircle2,
} from "lucide-react";

/**
 * Helper to parse the live WordPress page HTML into structured sections
 */
function parseAboutSections(html = "") {
  if (!html) return null;
  const clean = html.replace(/<div class="text-wrap">/gi, "").replace(/<\/div>/gi, "");

  const aboutUsMatch = clean.match(/<h3>About Us<\/h3>([\s\S]*?)<h1>/i);
  const londonMatch = clean.match(/<h1>FOSTERING AGENCY IN LONDON<\/h1>([\s\S]*?)<h3>Our Mission<\/h3>/i);
  const missionMatch = clean.match(/<h3>Our Mission<\/h3>([\s\S]*?)<h3>Our Values<\/h3>/i);
  const valuesMatch = clean.match(/<h3>Our Values<\/h3>([\s\S]*)$/i);

  if (!aboutUsMatch && !londonMatch && !missionMatch) {
    return null;
  }

  const extractParagraphs = (str) => {
    const matches = str.match(/<p>([\s\S]*?)<\/p>/gi);
    return matches ? matches.map((p) => p.replace(/<\/?p>/gi, "").trim()) : [];
  };

  const aboutParas = extractParagraphs(aboutUsMatch ? aboutUsMatch[1] : "");
  const londonParas = extractParagraphs(londonMatch ? londonMatch[1] : "");
  const missionParas = extractParagraphs(missionMatch ? missionMatch[1] : "");
  const valuesParas = extractParagraphs(valuesMatch ? valuesMatch[1] : "");

  return {
    aboutText: aboutParas.join(" "),
    londonLead: londonParas[0] || "",
    londonBody: londonParas[1] || "",
    missionText: missionParas[0] || "",
    valuesStandard: valuesParas[0] || "",
    valuesDiversity: valuesParas[1] || "",
  };
}

export default function About() {
  const { data: page, isLoading, isLive } = useWordPressPage("about");
  const parsed = parseAboutSections(page?.content || "");

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
          {isLive && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full">
              <Rss size={12} /> Live from WordPress (Page #{page?.databaseId || 6954})
            </span>
          )}
        </div>
      </PageHero>

      {/* Structured Content Sections */}
      {isLoading ? (
        <section className="bg-white py-20">
          <div className="container-ss max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
            <p className="text-charcoal/60 font-medium">Loading About page content from WordPress...</p>
          </div>
        </section>
      ) : parsed ? (
        <div className="bg-slate-50/60 py-16 md:py-24 space-y-16 md:space-y-24">
          {/* Section 1: About Us / Community Focus */}
          <section className="container-ss">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue bg-blue/10 px-3.5 py-1.5 rounded-full mb-4">
                  <Sparkles size={14} /> About Us
                </span>
                <h2 className="display-section text-charcoal text-balance">
                  A fresh perspective on foster care provision.
                </h2>
                <p className="mt-6 text-lg text-charcoal/80 leading-relaxed font-normal">
                  {parsed.aboutText}
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                    <CheckCircle2 className="text-green shrink-0" size={20} />
                    <span className="text-sm font-semibold text-charcoal">Child-Centred Community</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                    <CheckCircle2 className="text-blue shrink-0" size={20} />
                    <span className="text-sm font-semibold text-charcoal">Independent Agency (IFA)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                  <img
                    src={CHILDREN_FUTURE_IMG}
                    alt="Children future at Shining Stars Fostering"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white text-sm font-semibold">
                      Placing children at the heart of our organisation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Fostering Agency in London — Family Model */}
          <section className="container-ss">
            <div className="bg-gradient-to-br from-mint/40 via-sky/20 to-white rounded-3xl p-8 md:p-14 border border-mint/70 soft-shadow">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-3.5 py-1.5 rounded-full mb-4">
                  <Home size={14} /> Care Model
                </span>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-charcoal">
                  Fostering Agency in London
                </h2>

                <div className="mt-6 p-6 bg-white/90 rounded-2xl border-l-4 border-orange shadow-sm">
                  <p className="text-lg md:text-xl font-semibold text-charcoal leading-relaxed">
                    "{parsed.londonLead}"
                  </p>
                </div>

                <p className="mt-6 text-charcoal/75 leading-relaxed text-base md:text-lg">
                  {parsed.londonBody}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white/90 p-5 rounded-2xl border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-3">
                    <HeartHandshake size={20} />
                  </div>
                  <h3 className="font-bold text-charcoal text-base">Faith in Children</h3>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    Carers who believe wholeheartedly in children and their potential.
                  </p>
                </div>

                <div className="bg-white/90 p-5 rounded-2xl border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue mb-3">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-bold text-charcoal text-base">Caring Family Model</h3>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    Strong, stable home environments providing long-term security.
                  </p>
                </div>

                <div className="bg-white/90 p-5 rounded-2xl border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center text-green mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-bold text-charcoal text-base">Prosperous Futures</h3>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    Safe, flourishing pathways for every looked-after young person.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Our Mission */}
          <section className="container-ss">
            <div className="bg-gradient-to-br from-charcoal via-blue/95 to-purple rounded-3xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-4xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/20 px-3.5 py-1.5 rounded-full mb-4">
                  <Award size={14} /> Purpose & Vision
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-normal">
                  {parsed.missionText}
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="text-emerald-300" size={24} />
                      <h3 className="text-lg font-bold text-white">Security & Well-Being</h3>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Placing children in families dedicated to bringing about positive change through stable and nurturing environments.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                    <div className="flex items-center gap-3 mb-3">
                      <HeartHandshake className="text-amber-300" size={24} />
                      <h3 className="text-lg font-bold text-white">Child-Centred Culture</h3>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Recruiting and continuously training foster families with genuine love, care, understanding, resilience, and patience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Our Values & Tri-X Policies */}
          <section className="container-ss">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-purple bg-purple/10 px-3.5 py-1.5 rounded-full mb-3">
                <Users size={14} /> Standards & Ethos
              </span>
              <h2 className="display-section text-charcoal">Our Values</h2>
              <p className="mt-3 text-charcoal/70 text-lg">
                Guiding principles that define our commitment to children and foster families.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Value Card 1 */}
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue/10 flex items-center justify-center text-blue mb-6">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-display text-charcoal mb-4">
                    Exceeding Government Targets
                  </h3>
                  <p className="text-charcoal/75 leading-relaxed text-sm md:text-base">
                    {parsed.valuesStandard}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue">
                  <CheckCircle2 size={16} /> Quality services for looked-after children
                </div>
              </div>

              {/* Value Card 2 */}
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mb-6">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-display text-charcoal mb-4">
                    Respect & Celebrating Diversity
                  </h3>
                  <p className="text-charcoal/75 leading-relaxed text-sm md:text-base">
                    {parsed.valuesDiversity}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-orange">
                  <CheckCircle2 size={16} /> Safeguarding & thriving environments
                </div>
              </div>
            </div>

            {/* Tri-X Policies Accreditation Banner */}
            <div className="mt-8 bg-sky/40 rounded-3xl p-6 md:p-8 border border-sky flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-charcoal text-lg">
                  Shining Stars Fostering Agency Tri-X Policies
                </h4>
                <p className="text-sm text-charcoal/70 mt-1">
                  Access our full online policies and procedural framework approved for independent fostering.
                </p>
              </div>
              <a
                href="https://www.proceduresonline.com/shiningstars/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-blue text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-orange transition-colors shadow-sm"
              >
                View Tri-X Policies <ExternalLink size={15} />
              </a>
            </div>
          </section>
        </div>
      ) : (
        /* Fallback renderer for custom or modified WordPress content */
        <section className="bg-white py-16 md:py-24">
          <div className="container-ss max-w-4xl mx-auto">
            {page?.content ? (
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
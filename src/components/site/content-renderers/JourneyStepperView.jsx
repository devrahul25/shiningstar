import React, { useMemo } from "react";
import { CheckCircle2, ArrowRight, Sparkles, Compass } from "lucide-react";
import { stripHtml, decodeHtmlEntities, sanitizeHtml, cleanWPBakeryShortcodes } from "@/api/wordpressUtils";
import { Link } from "react-router-dom";
import { ENQUIRE_TO } from "@/lib/siteNav";

/**
 * Extracts sequential steps from WordPress content (e.g. "Step 1", "Step 2" or numbered sections).
 */
function extractJourneySteps(rawContent = "") {
  const steps = [];
  const cleaned = cleanWPBakeryShortcodes(rawContent);

  // 1. Try matching Step 1, Step 2, etc.
  const parts = cleaned.split(/(?=Step\s*\d+)/i);
  parts.forEach((part) => {
    const m = part.match(/^Step\s*(\d+)[\s\S]*?(?:<strong>|<h[2-4][^>]*>)([\s\S]*?)(?:<\/strong>|<\/h[2-4]>)[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
    if (m) {
      const num = parseInt(m[1], 10);
      const title = decodeHtmlEntities(stripHtml(m[2])).trim();
      const descHtml = sanitizeHtml(m[3].trim());
      if (title && descHtml) {
        steps.push({
          stepNumber: num < 10 ? `0${num}` : `${num}`,
          title,
          descHtml,
        });
      }
    }
  });

  // 2. Fallback: match sections if not explicitly formatted with "Step X"
  if (steps.length === 0) {
    const hRegex = /<h([2-3])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[2-3]|$)/gi;
    let hMatch;
    let count = 1;
    while ((hMatch = hRegex.exec(cleaned)) !== null) {
      const title = decodeHtmlEntities(stripHtml(hMatch[2])).trim();
      const bodyHtml = sanitizeHtml(hMatch[3].trim());
      if (title && stripHtml(bodyHtml).length > 20 && !title.toLowerCase().includes("recruiting")) {
        steps.push({
          stepNumber: count < 10 ? `0${count}` : `${count}`,
          title,
          descHtml: bodyHtml,
        });
        count++;
      }
    }
  }

  return steps;
}

export default function JourneyStepperView({ content = "", pageTitle = "How to Become a Foster Carer" }) {
  const steps = useMemo(() => extractJourneySteps(content), [content]);

  // Extract initial overview paragraph before the steps
  const overviewHtml = useMemo(() => {
    const cleaned = cleanWPBakeryShortcodes(content);
    const stepIdx = cleaned.search(/Step\s*1/i);
    const introPart = stepIdx > -1 ? cleaned.slice(0, stepIdx) : cleaned.slice(0, 800);
    const pMatches = introPart.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    const valid = pMatches.filter((p) => {
      const text = stripHtml(p).toLowerCase();
      return (
        text.length > 30 &&
        !text.includes("what is fostering?") &&
        !text.includes("could you foster?") &&
        !text.includes("become a foster carer")
      );
    });
    return valid.length > 0 ? sanitizeHtml(valid.join("")) : "";
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Overview Intro Card */}
      {overviewHtml && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-orange/10 text-orange border border-orange/20 mb-4">
            <Compass size={14} />
            <span>Step-by-Step Guidance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal tracking-tight mb-4">
            {pageTitle}
          </h2>

          <div
            className="prose-clean text-charcoal/80 text-base leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: overviewHtml }}
          />
        </div>
      )}

      {/* Connected Timeline Stepper */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-8 before:w-0.5 before:bg-gradient-to-b before:from-blue before:via-sky/60 before:to-transparent">
        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
            {/* Step Number Marker */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-blue shadow-md flex items-center justify-center font-display font-black text-blue text-sm sm:text-base group-hover:scale-110 group-hover:bg-blue group-hover:text-white transition-all duration-300">
              {step.stepNumber}
            </div>

            {/* Step Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue/30 transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
                  Phase {step.stepNumber}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  <CheckCircle2 size={12} /> Milestone
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal mb-4 tracking-tight">
                {step.title}
              </h3>

              <div
                className="prose-clean text-charcoal/80 text-base leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: step.descHtml }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Final Action Callout Card */}
      <div className="bg-gradient-to-r from-blue/10 via-sky/20 to-blue/10 rounded-3xl p-8 border border-blue/20 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue bg-white px-3.5 py-1 rounded-full shadow-sm">
          <Sparkles size={13} />
          <span>Ready to take the first step?</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
          Begin your fostering journey with Shining Stars
        </h3>
        <p className="text-charcoal/70 text-sm sm:text-base max-w-xl mx-auto">
          Our friendly team will guide you through each stage with personalized training and support.
        </p>
        <div>
          <Link
            to={ENQUIRE_TO}
            className="inline-flex items-center gap-2 bg-orange text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-orange/90 transition-all shadow-md hover:shadow-lg"
          >
            <span>Start your enquiry</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

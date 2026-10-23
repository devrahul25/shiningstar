import React, { useMemo } from "react";
import { Coins, CheckCircle, Shield, CalendarCheck, ArrowRight } from "lucide-react";
import { cleanWPBakeryShortcodes, sanitizeHtml, stripHtml, decodeHtmlEntities } from "@/api/wordpressUtils";
import { Link } from "react-router-dom";
import { ENQUIRE_TO } from "@/lib/siteNav";

/**
 * Extracts sections and financial highlights from WordPress allowance content.
 */
function extractAllowanceData(rawContent = "") {
  const cleaned = cleanWPBakeryShortcodes(rawContent);

  // Extract sections by <h2> or <h3>
  const sections = [];
  const regex = /<h([2-3])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[2-3]|$)/gi;
  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    const title = decodeHtmlEntities(stripHtml(match[2])).trim();
    const bodyHtml = sanitizeHtml(match[3].trim());
    if (title && stripHtml(bodyHtml).length > 20 && !title.toLowerCase().includes("recruiting")) {
      sections.push({ title, bodyHtml });
    }
  }

  // Extract top lead paragraph
  const pMatches = cleaned.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const introParagraphs = pMatches
    .map((p) => decodeHtmlEntities(stripHtml(p)).trim())
    .filter(
      (text) =>
        text.length > 40 &&
        !text.toLowerCase().includes("what is fostering?") &&
        !text.toLowerCase().includes("could you foster?") &&
        !text.toLowerCase().includes("recruiting")
    );

  return {
    leadText: introParagraphs[0] || "We offer generous weekly allowances to support foster carers and children.",
    supportingText: introParagraphs.slice(1, 3),
    sections,
    rawCleaned: cleaned,
  };
}

export default function AllowancesView({ content = "", pageTitle = "Fostering Allowances & Pay" }) {
  const data = useMemo(() => extractAllowanceData(content), [content]);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Financial Highlight Banner */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 text-emerald-100 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full backdrop-blur-sm">
            <Coins size={14} />
            <span>Generous Weekly Allowance & Support</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            {pageTitle}
          </h2>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            {data.leadText}
          </p>

          {data.supportingText.length > 0 && (
            <div className="pt-2 text-white/80 text-sm sm:text-base space-y-2 border-t border-white/15">
              {data.supportingText.map((t, idx) => (
                <p key={idx}>{t}</p>
              ))}
            </div>
          )}
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Structured Financial Cards from WordPress Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.sections.map((sec, idx) => {
          const isFullWidth = idx === 0 && data.sections.length % 2 !== 0;

          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 ${
                isFullWidth ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  {idx % 3 === 0 ? (
                    <Coins size={20} />
                  ) : idx % 3 === 1 ? (
                    <Shield size={20} />
                  ) : (
                    <CalendarCheck size={20} />
                  )}
                </div>
                <h3 className="text-xl font-display font-bold text-charcoal tracking-tight">
                  {sec.title}
                </h3>
              </div>

              <div
                className="prose-clean text-charcoal/80 text-base leading-relaxed space-y-3
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-charcoal/80"
                dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}
              />
            </div>
          );
        })}
      </div>

      {/* Tax Relief & Benefits Assurance Box */}
      <div className="bg-sky/30 border border-sky/50 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue">
            <CheckCircle size={14} />
            <span>Tax-Free Allowances & Guidance</span>
          </div>
          <h4 className="text-lg font-bold text-charcoal">
            Want to discuss your specific financial situation?
          </h4>
          <p className="text-charcoal/70 text-sm">
            We explain current allowances, tax relief, and council tax discounts with no obligation.
          </p>
        </div>
        <Link
          to={ENQUIRE_TO}
          className="inline-flex items-center gap-2 bg-orange text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-orange/90 transition-all shadow-sm shrink-0"
        >
          <span>Enquire about pay</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

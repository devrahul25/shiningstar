import React, { useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle, Phone, Sparkles } from "lucide-react";
import { stripHtml, decodeHtmlEntities, sanitizeHtml } from "@/api/wordpressUtils";
import { CONTACT } from "@/lib/ssfaData";

/**
 * Extracts FAQ question and answer items from WordPress content.
 * Supports both transformed wp-accordion-item markup and question headings.
 */
function extractFaqItems(rawContent = "") {
  const items = [];

  // 1. Try matching wp-accordion-item transformed from vc_tta_section
  const accordionRegex =
    /<div class="wp-accordion-item"><h3 class="wp-accordion-title">([\s\S]*?)<\/h3><div class="wp-accordion-content">([\s\S]*?)<\/div><\/div>/gi;
  let match;
  while ((match = accordionRegex.exec(rawContent)) !== null) {
    const question = decodeHtmlEntities(stripHtml(match[1])).trim();
    const answerHtml = sanitizeHtml(match[2].trim());
    if (question && answerHtml) {
      items.push({ question, answerHtml });
    }
  }

  // 2. Fallback: match <h3> or <h2> with question marks
  if (items.length === 0) {
    const qHeadingRegex = /<h([2-4])[^>]*>([\s\S]*?\?)<\/h\1>([\s\S]*?)(?=<h[2-4]|$)/gi;
    let hMatch;
    while ((hMatch = qHeadingRegex.exec(rawContent)) !== null) {
      const question = decodeHtmlEntities(stripHtml(hMatch[2])).trim();
      const answerHtml = sanitizeHtml(hMatch[3].trim());
      if (question && stripHtml(answerHtml).length > 10) {
        items.push({ question, answerHtml });
      }
    }
  }

  return items;
}

export default function FaqView({ content = "", pageTitle = "Frequently Asked Questions" }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems = useMemo(() => extractFaqItems(content), [content]);

  // Extract any introductory paragraph before the first question
  const introText = useMemo(() => {
    const firstAccordionIdx = content.indexOf('class="wp-accordion-item"');
    const beforeAccordion = firstAccordionIdx > -1 ? content.slice(0, firstAccordionIdx) : content;
    const pMatch = beforeAccordion.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      const stripped = stripHtml(pMatch[1]).trim();
      if (stripped.length > 30 && !stripped.toLowerCase().includes("what is fostering?")) {
        return stripped;
      }
    }
    return "Find answers to the most common questions potential foster carers ask us about.";
  }, [content]);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return faqItems;
    const term = searchTerm.toLowerCase();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        stripHtml(item.answerHtml).toLowerCase().includes(term)
    );
  }, [faqItems, searchTerm]);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* FAQ Header & Filter Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20 mb-4">
          <HelpCircle size={14} />
          <span>Questions & Answers ({faqItems.length})</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal tracking-tight mb-3">
          {pageTitle}
        </h2>

        {introText && (
          <p className="text-charcoal/70 text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            {introText}
          </p>
        )}

        {/* Live Search Input */}
        <div className="relative max-w-lg mx-auto">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. spare room, allowances, age limit)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
          />
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <p className="text-charcoal/60 font-medium">
              No questions found matching "{searchTerm}".
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-3 text-sm font-bold text-blue hover:underline"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-blue/50 shadow-md ring-1 ring-blue/20"
                    : "border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-slate-50/50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-blue text-white"
                          : "bg-sky/60 text-blue group-hover:bg-sky"
                      }`}
                    >
                      Q{idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-charcoal leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-charcoal/50 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-charcoal/80 text-base leading-relaxed border-t border-slate-100 bg-gradient-to-b from-sky/10 to-transparent">
                    <div
                      className="prose-clean max-w-none space-y-3 pt-2"
                      dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Real Contact Note from WordPress */}
      <div className="bg-gradient-to-r from-sky/40 via-mint/30 to-sky/40 rounded-3xl p-6 sm:p-8 border border-sky/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange">
            <Sparkles size={13} />
            <span>Still have questions?</span>
          </div>
          <h4 className="text-lg font-bold text-charcoal">
            Our team is always happy to speak with you
          </h4>
          <p className="text-charcoal/70 text-sm">
            Call our friendly office team directly or send an enquiry.
          </p>
        </div>
        <a
          href={CONTACT.phoneHref}
          className="inline-flex items-center gap-2 bg-orange text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-orange/90 transition-all shadow-sm shrink-0"
        >
          <Phone size={15} />
          <span>Call {CONTACT.phone}</span>
        </a>
      </div>
    </div>
  );
}

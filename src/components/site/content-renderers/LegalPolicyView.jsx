import React, { useState, useEffect, useMemo } from "react";
import { Shield, ArrowUpRight, List } from "lucide-react";
import { cleanWPBakeryShortcodes, sanitizeHtml, stripHtml, decodeHtmlEntities } from "@/api/wordpressUtils";

/**
 * Parses formal legal/policy content into navigable sections for the document reader.
 */
function extractLegalSections(rawContent = "") {
  const cleaned = cleanWPBakeryShortcodes(rawContent);
  const sections = [];

  // Match headings or strong section titles
  const regex = /<h([2-3])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[2-3]|$)/gi;
  let match;
  let count = 1;

  while ((match = regex.exec(cleaned)) !== null) {
    const title = decodeHtmlEntities(stripHtml(match[2])).trim();
    const bodyHtml = sanitizeHtml(match[3].trim());
    if (title && stripHtml(bodyHtml).length > 20 && !title.toLowerCase().includes("recruiting")) {
      const id = `policy-sec-${count}`;
      sections.push({ id, title, bodyHtml, num: count });
      count++;
    }
  }

  // Fallback if no explicit h2/h3: chunk by prominent paragraphs
  if (sections.length === 0) {
    const pMatches = cleaned.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    let currentTitle = "Overview & Scope";
    let currentBody = [];
    let secCount = 1;

    pMatches.forEach((p) => {
      const text = stripHtml(p).trim();
      const isHeaderLike = p.includes("<strong>") && text.length < 80;

      if (isHeaderLike && currentBody.length > 0) {
        sections.push({
          id: `policy-sec-${secCount}`,
          title: currentTitle,
          bodyHtml: sanitizeHtml(currentBody.join("")),
          num: secCount,
        });
        secCount++;
        currentTitle = text;
        currentBody = [];
      } else {
        currentBody.push(p);
      }
    });

    if (currentBody.length > 0) {
      sections.push({
        id: `policy-sec-${secCount}`,
        title: currentTitle,
        bodyHtml: sanitizeHtml(currentBody.join("")),
        num: secCount,
      });
    }
  }

  return sections;
}

export default function LegalPolicyView({ content = "", pageTitle = "Privacy Policy & Regulatory Information" }) {
  const sections = useMemo(() => extractLegalSections(content), [content]);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || "");

  useEffect(() => {
    if (sections.length > 0 && !activeSectionId) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections, activeSectionId]);

  const scrollToSection = (id) => {
    setActiveSectionId(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Policy Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            <Shield size={13} />
            <span>Official Policy & Compliance Document</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            {pageTitle}
          </h2>
          <p className="text-charcoal/70 text-sm">
            Shining Stars Fostering Agency • Reviewed and updated according to UK standards
          </p>
        </div>
        <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 shrink-0">
          <span className="text-xs text-charcoal/50 block">Document Sections</span>
          <span className="text-2xl font-display font-bold text-blue">{sections.length} Chapters</span>
        </div>
      </div>

      {/* Two-Column Document Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-4 sticky top-28 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-charcoal/60">
            <List size={14} />
            <span>Table of Contents</span>
          </div>

          <nav className="space-y-1">
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all flex items-center justify-between gap-2 ${
                  activeSectionId === sec.id
                    ? "bg-blue text-white font-bold shadow-sm"
                    : "text-charcoal/75 hover:bg-slate-100 hover:text-charcoal"
                }`}
              >
                <span className="truncate">
                  {sec.num}. {sec.title}
                </span>
                <ArrowUpRight size={12} className="shrink-0 opacity-60" />
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Document Reading Pane */}
        <main className="lg:col-span-8 space-y-8">
          {sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue mb-2">
                <span>Clause {sec.num}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal mb-4 pb-3 border-b border-slate-100">
                {sec.title}
              </h3>

              <div
                className="prose-clean text-charcoal/80 text-base leading-relaxed space-y-4
                  [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:border [&_th]:border-slate-200 [&_td]:p-3 [&_td]:border [&_td]:border-slate-200"
                dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}
              />
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

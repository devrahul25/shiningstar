import React, { useMemo } from "react";
import { Heart, ShieldCheck, LifeBuoy, BookOpen, Sparkles, Phone } from "lucide-react";
import { cleanWPBakeryShortcodes, sanitizeHtml, stripHtml, decodeHtmlEntities } from "@/api/wordpressUtils";
import { CONTACT } from "@/lib/ssfaData";

/**
 * Extracts sections and supportive topics from children & young people WordPress content.
 */
function extractKidsData(rawContent = "") {
  const cleaned = cleanWPBakeryShortcodes(rawContent);

  const sections = [];
  const regex = /<h([2-3])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[2-3]|$)/gi;
  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    const title = decodeHtmlEntities(stripHtml(match[2])).trim();
    const bodyHtml = sanitizeHtml(match[3].trim());
    if (title && stripHtml(bodyHtml).length > 15 && !title.toLowerCase().includes("recruiting")) {
      sections.push({ title, bodyHtml });
    }
  }

  // Extract introductory paragraphs
  const pMatches = cleaned.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const introParagraphs = pMatches
    .map((p) => decodeHtmlEntities(stripHtml(p)).trim())
    .filter(
      (text) =>
        text.length > 30 &&
        !text.toLowerCase().includes("what is fostering?") &&
        !text.toLowerCase().includes("could you foster?") &&
        !text.toLowerCase().includes("recruiting")
    );

  return {
    welcomeText: introParagraphs[0] || "This space is dedicated to children and young people living with foster families.",
    supportingText: introParagraphs.slice(1, 3),
    sections,
  };
}

export default function KidsZoneView({ content = "", pageTitle = "Children & Young People Zone" }) {
  const data = useMemo(() => extractKidsData(content), [content]);

  // Color styles for kid-friendly cards
  const CARD_COLORS = [
    { bg: "bg-sky/40", border: "border-sky/60", badge: "bg-blue/10 text-blue", icon: Heart },
    { bg: "bg-mint/50", border: "border-mint/80", badge: "bg-emerald-100 text-emerald-800", icon: ShieldCheck },
    { bg: "bg-purple/15", border: "border-purple/30", badge: "bg-purple-100 text-purple-800", icon: BookOpen },
    { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-800", icon: Sparkles },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Friendly Welcome Hero Banner */}
      <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-sm">
            <Heart size={14} className="text-yellow" />
            <span>Your Space • Your Voice • Your Rights</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            {pageTitle}
          </h2>

          <p className="text-white/95 text-base sm:text-lg leading-relaxed font-medium">
            {data.welcomeText}
          </p>

          {data.supportingText.length > 0 && (
            <div className="pt-2 text-white/85 text-sm sm:text-base space-y-2 border-t border-white/20">
              {data.supportingText.map((t, idx) => (
                <p key={idx}>{t}</p>
              ))}
            </div>
          )}
        </div>

        {/* Ambient playful circles */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-24 top-6 w-32 h-32 rounded-full bg-yellow/20 blur-xl pointer-events-none" />
      </div>

      {/* Immediate Reassurance / Helpline Callout Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange/15 text-orange flex items-center justify-center shrink-0">
            <LifeBuoy size={28} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange">
              Always here for you
            </span>
            <h3 className="text-lg sm:text-xl font-display font-bold text-charcoal">
              Need someone to talk to or feeling worried?
            </h3>
            <p className="text-charcoal/70 text-sm">
              You can talk to your foster carer, your social worker, or our 24/7 team anytime.
            </p>
          </div>
        </div>

        <a
          href={CONTACT.phoneHref}
          className="inline-flex items-center gap-2 bg-orange text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-orange/90 transition-all shadow-sm shrink-0 whitespace-nowrap"
        >
          <Phone size={16} />
          <span>Call our office: {CONTACT.phone}</span>
        </a>
      </div>

      {/* Kid-Friendly Supportive Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.sections.map((sec, idx) => {
          const style = CARD_COLORS[idx % CARD_COLORS.length];
          const IconComponent = style.icon;

          return (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 border ${style.border} ${style.bg} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${style.badge}`}
                  >
                    <IconComponent size={13} />
                    <span>Topic {idx + 1}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal mb-4 tracking-tight">
                  {sec.title}
                </h3>

                <div
                  className="prose-clean text-charcoal/85 text-base leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

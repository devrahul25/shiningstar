import React, { useMemo } from "react";
import { MapPin, Home, Users, HeartHandshake, ArrowRight, Phone } from "lucide-react";
import { cleanWPBakeryShortcodes, sanitizeHtml, stripHtml, decodeHtmlEntities } from "@/api/wordpressUtils";
import { Link } from "react-router-dom";
import { CONTACT } from "@/lib/ssfaData";
import { ENQUIRE_TO } from "@/lib/siteNav";

/**
 * Parses regional/borough content into structured local recruitment highlights.
 */
function extractLocationData(rawContent = "", pageTitle = "") {
  const cleaned = cleanWPBakeryShortcodes(rawContent);
  const sections = [];

  const regex = /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>([\s\S]*?)(?=<h[1-3]|$)/gi;
  let match;

  while ((match = regex.exec(cleaned)) !== null) {
    const title = decodeHtmlEntities(stripHtml(match[2])).trim();
    const bodyHtml = sanitizeHtml(match[3].trim());
    if (
      title &&
      stripHtml(bodyHtml).length > 20 &&
      !title.toLowerCase().includes("recruiting foster carers") &&
      !title.toLowerCase().includes("foster in your area")
    ) {
      sections.push({ title, bodyHtml });
    }
  }

  // Derive location name from title (e.g. "Fostering in Birmingham" -> "Birmingham")
  const locationName = pageTitle.replace(/^Fostering in\s+/i, "").replace(/^How to Begin Fostering in\s+/i, "").replace(/:.*$/, "").trim() || "Your Local Area";

  return {
    locationName,
    sections,
  };
}

export default function LocationPageView({ content = "", pageTitle = "Fostering in Your Area" }) {
  const { locationName, sections } = useMemo(
    () => extractLocationData(content, pageTitle),
    [content, pageTitle]
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Regional Hero Banner */}
      <div className="bg-gradient-to-br from-blue via-sky-600 to-indigo-800 text-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-sm">
            <MapPin size={14} className="text-yellow" />
            <span>Local Community Fostering • {locationName}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            {pageTitle}
          </h2>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            Support children and young people across {locationName} with dedicated local support, generous allowances, and 24/7 guidance from Shining Stars.
          </p>
        </div>

        {/* Ambient subtle decorative shape */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Local Requirements & Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue/10 text-blue flex items-center justify-center mb-3">
            <Home size={20} />
          </div>
          <h4 className="font-display font-bold text-charcoal text-lg">A Spare Bedroom</h4>
          <p className="text-charcoal/70 text-sm">
            To provide a child in {locationName} their own personal space to thrive and feel secure.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center mb-3">
            <Users size={20} />
          </div>
          <h4 className="font-display font-bold text-charcoal text-lg">Age 21 or Older</h4>
          <p className="text-charcoal/70 text-sm">
            Open to adults from all backgrounds, marital statuses, and cultures across the region.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <HeartHandshake size={20} />
          </div>
          <h4 className="font-display font-bold text-charcoal text-lg">Local 24/7 Support</h4>
          <p className="text-charcoal/70 text-sm">
            Direct access to dedicated supervising social workers and regular local training events.
          </p>
        </div>
      </div>

      {/* Main Sections from WordPress Content */}
      <div className="space-y-8">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue bg-sky/40 px-3 py-1 rounded-full">
                {locationName} Guide • Part {idx + 1}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal mb-4 tracking-tight">
              {sec.title}
            </h3>

            <div
              className="prose-clean text-charcoal/80 text-base leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}
            />
          </div>
        ))}
      </div>

      {/* Local Enquiry Call-to-Action */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-orange">
            Ready to foster in {locationName}?
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            Speak with our local fostering recruitment team
          </h3>
          <p className="text-white/70 text-sm">
            We are actively looking for compassionate foster carers in {locationName}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 bg-orange text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-orange/90 transition-all shadow-md whitespace-nowrap"
          >
            <Phone size={15} />
            <span>{CONTACT.phone}</span>
          </a>
          <Link
            to={ENQUIRE_TO}
            className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-white hover:text-charcoal transition-all whitespace-nowrap"
          >
            <span>Send Enquiry</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

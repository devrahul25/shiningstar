import React from "react";
import { splitWordPressContentIntoSections } from "@/api/wordpressUtils";
import {
  Sparkles,
  Award,
  HeartHandshake,
  ShieldCheck,
  HelpCircle,
  Users,
  Compass,
} from "lucide-react";

/**
 * Authentic brand photography library matched contextually to section topics.
 */
const BRAND_IMAGES = [
  {
    keywords: ["what is", "fostering", "stable", "understanding"],
    img: "https://teal-penguin-283093.hostingersite.com/wp-content/uploads/2026/09/smiley-parent-child-together-outdoors-park-scaled-1.jpg",
    alt: "Foster family enjoying a joyful moment outdoors",
  },
  {
    keywords: ["why", "need", "other families", "reasons"],
    img: "https://shiningstarsfostering.com/wp-content/uploads/2019/10/field-1728099_960_720-1.jpg",
    alt: "Children playing happily in a safe and supportive community",
  },
  {
    keywords: ["who are", "role", "carer", "specialise"],
    img: "https://shiningstarsfostering.com/wp-content/uploads/2019/10/photo-1508205065970-cad01cebebb4-e1571942143484-1024x596.jpeg",
    alt: "Foster carer reading together with child at home",
  },
  {
    keywords: ["difference", "adoption", "pathway", "legal"],
    img: "https://shiningstarsfostering.com/wp-content/uploads/2026/02/children-future-shining-stars-fostering-star-300x215-1.webp",
    alt: "Children smiling with bright and secure future ahead",
  },
  {
    keywords: ["mission", "purpose", "vision"],
    img: "https://shiningstarsfostering.com/wp-content/uploads/2026/02/our-mission-shining-stars-fostering-300x215-1.webp",
    alt: "Our mission to support children and foster carers",
  },
  {
    keywords: ["value", "ethos", "standard"],
    img: "https://shiningstarsfostering.com/wp-content/uploads/2026/02/shining-stars-our-core-values.webp",
    alt: "Our core values: safety, respect, and diversity",
  },
  {
    keywords: ["about", "story", "perspective"],
    img: "https://shiningstarsfostering.com/wp-content/uploads/2025/05/London-Marathon_caroline-1024x684.png",
    alt: "Shining Stars team supporting the local community",
  },
  {
    keywords: ["london", "agency", "community"],
    img: "https://shiningstarsfostering.com/wp-content/uploads/2026/02/london-boroughs-around.webp",
    alt: "Fostering agency across London and surrounding boroughs",
  },
];

function formatSectionTitle(title = "") {
  if (!title) return "";
  // If the heading was authored entirely in uppercase in WordPress, convert gracefully to Title Case
  if (title === title.toUpperCase() && title.length > 3) {
    return title
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (["in", "at", "to", "for", "and", "or", "of", "the", "a", "an"].includes(word)) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ")
      .replace(/^([a-z])/, (m) => m.toUpperCase());
  }
  return title;
}

function getSectionMedia(title = "", index = 0, html = "") {
  // If HTML from WordPress embeds an image, use it
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (imgMatch) {
    const altMatch = html.match(/alt=["']([^"']*)["']/i);
    return {
      img: imgMatch[1],
      alt: altMatch ? altMatch[1] : title,
      cleanHtml: html.replace(/<img[^>]*>/gi, "").replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, ""),
    };
  }

  // Contextual match by title keywords
  const t = title ? title.toLowerCase() : "";
  const matched = BRAND_IMAGES.find((item) =>
    item.keywords.some((kw) => t.includes(kw))
  );

  const fallback = BRAND_IMAGES[index % BRAND_IMAGES.length];
  const selected = matched || fallback;

  return {
    img: selected.img,
    alt: selected.alt,
    cleanHtml: html,
  };
}

function getSectionBadge(title = "", index = 0) {
  const t = title ? title.toLowerCase() : "";

  if (t.includes("what is fostering") || (t.includes("fostering") && !t.includes("agency"))) {
    return {
      label: "Understanding Foster Care",
      icon: Sparkles,
      pill: "bg-blue/10 text-blue border-blue/20",
      borderTop: "border-t-blue",
    };
  }
  if (t.includes("why") || t.includes("need") || t.includes("other families")) {
    return {
      label: "Why Children Need Care",
      icon: HeartHandshake,
      pill: "bg-orange/10 text-orange border-orange/20",
      borderTop: "border-t-orange",
    };
  }
  if (t.includes("who are") || t.includes("role") || t.includes("carer")) {
    return {
      label: "The Foster Carer Role",
      icon: Users,
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      borderTop: "border-t-emerald-500",
    };
  }
  if (t.includes("difference") || t.includes("adoption") || t.includes("pathway") || t.includes("types")) {
    return {
      label: "Care Pathways & Comparisons",
      icon: Compass,
      pill: "bg-purple-50 text-purple-700 border-purple-200",
      borderTop: "border-t-purple",
    };
  }
  if (t.includes("about") || t.includes("who we are")) {
    return {
      label: "About Shining Stars",
      icon: Sparkles,
      pill: "bg-blue/10 text-blue border-blue/20",
      borderTop: "border-t-blue",
    };
  }
  if (t.includes("fostering agency") || t.includes("london")) {
    return {
      label: "Fostering in London",
      icon: Compass,
      pill: "bg-sky/30 text-blue border-blue/20",
      borderTop: "border-t-blue",
    };
  }
  if (t.includes("mission") || t.includes("purpose") || t.includes("vision")) {
    return {
      label: "Our Purpose & Mission",
      icon: Award,
      pill: "bg-amber-400/20 text-amber-700 border-amber-300",
      borderTop: "border-t-amber-400",
    };
  }
  if (t.includes("value") || t.includes("ethos") || t.includes("standard")) {
    return {
      label: "Values & Standards",
      icon: ShieldCheck,
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      borderTop: "border-t-emerald-500",
    };
  }

  const fallbacks = [
    { label: "Overview & Guidance", icon: Sparkles, pill: "bg-blue/10 text-blue border-blue/20", borderTop: "border-t-blue" },
    { label: "Care Guidance", icon: HelpCircle, pill: "bg-orange/10 text-orange border-orange/20", borderTop: "border-t-orange" },
    { label: "Community & Support", icon: HeartHandshake, pill: "bg-emerald-50 text-emerald-700 border-emerald-200", borderTop: "border-t-emerald-500" },
    { label: "Key Standards", icon: Award, pill: "bg-purple-50 text-purple-700 border-purple-200", borderTop: "border-t-purple" },
  ];

  return fallbacks[index % fallbacks.length];
}

export default function NarrativeView({ content = "", className = "" }) {
  if (!content || typeof content !== "string") {
    return null;
  }

  const sections = splitWordPressContentIntoSections(content);
  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-10 md:space-y-14 ${className}`}>
      {sections.map((sec, idx) => {
        const isEven = idx % 2 === 0;
        const badge = getSectionBadge(sec.title, idx);
        const Icon = badge.icon;

        const rawBody =
          idx === 0
            ? (() => {
                const hrSplit = sec.bodyHtml.split(/<hr\s*\/?>/i);
                if (hrSplit.length > 1 && hrSplit[1].replace(/<[^>]+>/g, "").trim().length > 0) {
                  return hrSplit.slice(1).join("").trim();
                }
                return sec.bodyHtml;
              })()
            : sec.bodyHtml;

        const media = getSectionMedia(sec.title, idx, rawBody);

        return (
          <section
            key={sec.id || idx}
            className={`bg-white rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 border-t-4 ${badge.borderTop} relative overflow-hidden`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Content Column */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? "order-2 lg:order-1" : "order-2 lg:order-2"
                }`}
              >
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${badge.pill}`}
                  >
                    <Icon size={13} className="shrink-0" />
                    <span>{badge.label}</span>
                  </span>
                </div>

                {sec.title && (
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-charcoal tracking-tight mb-4 text-balance">
                    {formatSectionTitle(sec.title)}
                  </h2>
                )}

                <div
                  className="prose-clean text-charcoal/80 text-base leading-relaxed space-y-4
                    [&_p]:leading-relaxed
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
                    [&_.text-wrap]:bg-sky/20 [&_.text-wrap]:p-5 [&_.text-wrap]:rounded-xl [&_.text-wrap]:border [&_.text-wrap]:border-sky/40 [&_.text-wrap]:space-y-3 [&_.text-wrap]:my-3
                    [&_p:has(>a:only-child)]:pt-2
                    [&_p:has(>a:only-child)_a]:inline-flex [&_p:has(>a:only-child)_a]:items-center [&_p:has(>a:only-child)_a]:gap-2 [&_p:has(>a:only-child)_a]:bg-blue [&_p:has(>a:only-child)_a]:text-white [&_p:has(>a:only-child)_a]:font-bold [&_p:has(>a:only-child)_a]:text-sm [&_p:has(>a:only-child)_a]:px-6 [&_p:has(>a:only-child)_a]:py-2.5 [&_p:has(>a:only-child)_a]:rounded-full [&_p:has(>a:only-child)_a]:no-underline hover:[&_p:has(>a:only-child)_a]:bg-orange [&_p:has(>a:only-child)_a]:transition-all [&_p:has(>a:only-child)_a]:duration-300 [&_p:has(>a:only-child)_a]:shadow-sm hover:[&_p:has(>a:only-child)_a]:shadow-md
                    [&_a]:text-blue [&_a]:font-bold hover:[&_a]:text-orange [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: media.cleanHtml }}
                />
              </div>

              {/* Image Column */}
              <div
                className={`lg:col-span-5 ${
                  isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-slate-100 ring-4 ring-slate-100/80 group">
                  <img
                    src={media.img}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Ambient subtle glow */}
            <div
              className={`absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-40 ${
                isEven ? "bg-sky/30" : "bg-mint/30"
              }`}
            />
          </section>
        );
      })}
    </div>
  );
}

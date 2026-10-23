import DOMPurify from "dompurify";

/**
 * Utilities for cleaning, sanitizing, and formatting WordPress GraphQL content
 */

/**
 * Decode HTML entities like &#8217;, &amp;, &quot;, &#038;, &hellip;, &#8220;, etc.
 */
export function decodeHtmlEntities(str = "") {
  if (!str || typeof str !== "string") return "";

  // Fast browser entity decode if DOM is available
  if (typeof document !== "undefined") {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  // Fallback regex for SSR/non-browser
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&#8230;/g, "…")
    .replace(/&#160;/g, " ")
    .replace(/&nbsp;/g, " ");
}

/**
 * Strip HTML tags from strings (e.g. <p>...</p>)
 */
export function stripHtml(html = "") {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Clean WordPress excerpt (strips HTML, decodes entities, trims length)
 */
export function cleanExcerpt(excerpt = "", maxLength = 180) {
  if (!excerpt) return "";
  const withoutShortcodes = cleanWPBakeryShortcodes(excerpt);
  const cleaned = decodeHtmlEntities(stripHtml(withoutShortcodes));
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim() + "…";
}

/**
 * Clean WordPress title
 */
export function cleanTitle(title = "") {
  if (!title) return "";
  const withoutShortcodes = cleanWPBakeryShortcodes(title);
  return decodeHtmlEntities(stripHtml(withoutShortcodes));
}

/**
 * Resolves an image URL safely
 */
export function resolveImageUrl(sourceUrl, fallbackUrl = "") {
  if (!sourceUrl || typeof sourceUrl !== "string") return fallbackUrl;
  return sourceUrl.trim();
}

/**
 * Clean and parse legacy WPBakery / Visual Composer shortcodes out of WordPress content
 * Converts structured elements (headings, buttons) into clean HTML and strips container tags.
 */
export function cleanWPBakeryShortcodes(html = "") {
  if (!html || typeof html !== "string") return "";

  let cleaned = html;

  // 1. Transform vc_tta_section into structured accordion items with preserved question titles
  cleaned = cleaned.replace(
    /\[vc_tta_section[^\]]*title=(?:&#8221;|&#8220;|["'\u201C\u201D])([^"'\u201C\u201D&#]+)(?:&#8221;|&#8220;|["'\u201C\u201D])[^\]]*\]([\s\S]*?)\[\/vc_tta_section\]/gi,
    (match, title, body) => {
      const cleanTitle = title.trim();
      return `<div class="wp-accordion-item"><h3 class="wp-accordion-title">${cleanTitle}</h3><div class="wp-accordion-content">${body}</div></div>`;
    }
  );

  // 2. Transform vc_custom_heading into proper <h2> tags
  cleaned = cleaned.replace(
    /\[vc_custom_heading[^\]]*text=(?:&#8221;|&#8220;|["'\u201C\u201D])([^"'\u201C\u201D&#]+)(?:&#8221;|&#8220;|["'\u201C\u201D])[^\]]*\]/gi,
    "<h2>$1</h2>"
  );

  // 3. Transform vc_btn into a styled button link
  cleaned = cleaned.replace(
    /\[vc_btn[^\]]*title=(?:&#8221;|&#8220;|["'\u201C\u201D])([^"'\u201C\u201D&#]+)(?:&#8221;|&#8220;|["'\u201C\u201D])[^\]]*link=(?:&#8221;|&#8220;|["'\u201C\u201D])url:([^|"'&#\s]+)[^\]]*\]/gi,
    '<p><a href="$2" class="inline-block bg-blue text-white px-5 py-2.5 rounded-full font-bold hover:bg-orange transition-colors">$1</a></p>'
  );

  // 4. Transform vc_separator into a clean divider
  cleaned = cleaned.replace(/\[vc_separator[^\]]*\]/gi, '<hr class="my-8 border-border" />');

  // 5. Strip slider and container shortcodes while keeping the inner content intact
  cleaned = cleaned.replace(/\[rev_slider_vc[^\]]*\]/gi, "");
  cleaned = cleaned.replace(
    /\[\/?vc_(?:row|column|column_text|section|mad_team_member|empty_space|single_image|row_inner|column_inner|tta_accordion|tta_tabs|tta_tour)[^\]]*\]/gi,
    ""
  );

  // 6. Strip contact-form-7 shortcodes
  cleaned = cleaned.replace(/\[contact-form-7[^\]]*\]/gi, "");

  // 7. Strip any residual WordPress shortcodes like [vc_*], [wpb_*]
  cleaned = cleaned.replace(/\[\/?(?:vc_|wpb_)[^\]]*\]/gi, "");

  // 8. Strip empty vc containers like vc_empty_space
  cleaned = cleaned.replace(/<div class="vc_empty_space"[^>]*><\/div>/gi, "");

  // 9. Convert standalone strong paragraphs into h2 headings (common in WordPress content)
  cleaned = cleaned.replace(/<p[^>]*>\s*<strong>(.*?)<\/strong>\s*<\/p>/gi, (match, inner) => {
    const text = stripHtml(inner).trim();
    if (text.length > 0 && text.length < 150) {
      return `<h2>${text}</h2>`;
    }
    return match;
  });

  // 10. Unwrap links inside heading tags so headings are clean text
  cleaned = cleaned.replace(/<h([1-6])([^>]*)>\s*<a[^>]*>([\s\S]*?)<\/a>\s*<\/h\1>/gi, "<h$1$2>$3</h$1>");

  // 11. Remove empty paragraphs and leftover empty wrappers
  cleaned = cleaned.replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/gi, "");

  return cleaned.trim();
}

/**
 * Sanitize HTML before injecting into React dangerouslySetInnerHTML
 * Uses DOMPurify in browser environments to prevent XSS.
 */
export function sanitizeHtml(html = "") {
  if (!html || typeof html !== "string") return "";

  const preCleaned = cleanWPBakeryShortcodes(html);

  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(preCleaned, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel", "style", "class"],
      FORBID_TAGS: ["script", "iframe", "object", "embed", "form"],
    });
  }

  return preCleaned;
}

/**
 * Split WordPress HTML content dynamically into structured sections based on headings (h1-h6).
 * Preserves the exact original content without inventing any fake copy or placeholders.
 * Extensible for any future content additions in WordPress.
 */
export function splitWordPressContentIntoSections(html = "") {
  if (!html || typeof html !== "string") return [];

  // Pre-clean shortcodes and normalize headings
  const cleaned = cleanWPBakeryShortcodes(html);
  if (!cleaned.trim()) return [];

  // Split before any heading tag (h1-h6)
  const parts = cleaned.split(/(?=<h[1-6][^>]*>)/i).filter((p) => p.trim().length > 0);

  if (parts.length === 0) return [];

  return parts
    .map((part, idx) => {
      const headingMatch = part.match(/^<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/i);
      if (headingMatch) {
        const level = parseInt(headingMatch[1], 10);
        const title = decodeHtmlEntities(stripHtml(headingMatch[2])).trim();
        const bodyHtml = sanitizeHtml(part.slice(headingMatch[0].length).trim());
        return {
          id: `sec-${idx}`,
          level,
          title,
          headingHtml: headingMatch[0],
          bodyHtml,
        };
      } else {
        const stripped = stripHtml(part).trim();
        if (!stripped) return null;
        return {
          id: `sec-${idx}`,
          level: 0,
          title: null,
          headingHtml: "",
          bodyHtml: sanitizeHtml(part.trim()),
        };
      }
    })
    .filter(Boolean)
    .filter(
      (sec) =>
        (sec.title && sec.title.trim().length > 0) ||
        (sec.bodyHtml && stripHtml(sec.bodyHtml).length > 0)
    );
}

/**
 * Format WordPress ISO date into human-readable British format (e.g. 14 Oct 2026)
 */
export function formatWpDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Format event date from Tribe Events Calendar (e.g. "Mon, 27 Jul 2026")
 */
export function formatEventDate(str) {
  if (!str) return "Upcoming";
  try {
    const datePart = str.split(" ")[0];
    const [y, m, d] = datePart.split("-").map(Number);
    if (!y || !m || !d) return str;
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return str;
  }
}

/**
 * Format event time from Tribe Events Calendar (e.g. "12:00 pm – 4:00 pm" or "All Day")
 */
export function formatEventTime(startStr, endStr, allDay = false) {
  if (allDay) return "All Day";
  if (!startStr) return "Check details";

  const parseTime = (str) => {
    if (!str) return "";
    const parts = str.split(" ")[1]?.split(":");
    if (!parts || parts.length < 2) return "";
    let h = parseInt(parts[0], 10);
    const m = parts[1];
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${m} ${ampm}`;
  };

  const sTime = parseTime(startStr);
  const eTime = parseTime(endStr);
  if (!sTime) return "Check details";
  if (!eTime || sTime === eTime) return sTime;
  return `${sTime} – ${eTime}`;
}


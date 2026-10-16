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

  // 1. Transform vc_custom_heading into proper <h2> tags
  // Handles straight quotes, curved quotes, and html entity quotes
  cleaned = cleaned.replace(
    /\[vc_custom_heading[^\]]*text=(?:&#8221;|&#8220;|["'\u201C\u201D])([^"'\u201C\u201D&#]+)(?:&#8221;|&#8220;|["'\u201C\u201D])[^\]]*\]/gi,
    "<h2>$1</h2>"
  );

  // 2. Transform vc_btn into a styled button link
  cleaned = cleaned.replace(
    /\[vc_btn[^\]]*title=(?:&#8221;|&#8220;|["'\u201C\u201D])([^"'\u201C\u201D&#]+)(?:&#8221;|&#8220;|["'\u201C\u201D])[^\]]*link=(?:&#8221;|&#8220;|["'\u201C\u201D])url:([^|"'&#\s]+)[^\]]*\]/gi,
    '<p><a href="$2" class="inline-block bg-blue text-white px-5 py-2.5 rounded-full font-bold hover:bg-orange transition-colors">$1</a></p>'
  );

  // 3. Transform vc_separator into a clean divider
  cleaned = cleaned.replace(/\[vc_separator[^\]]*\]/gi, '<hr class="my-8 border-border" />');

  // 4. Strip container / layout shortcodes while keeping the inner text/html intact
  cleaned = cleaned.replace(
    /\[\/?vc_(?:row|column|column_text|section|mad_team_member|empty_space|single_image)[^\]]*\]/gi,
    ""
  );

  // 5. Strip contact-form-7 shortcodes
  cleaned = cleaned.replace(/\[contact-form-7[^\]]*\]/gi, "");

  // 6. Strip any residual WordPress shortcodes like [vc_*], [wpb_*]
  cleaned = cleaned.replace(/\[\/?(?:vc_|wpb_)[^\]]*\]/gi, "");

  // 7. Remove empty paragraphs generated from shortcode stripping
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

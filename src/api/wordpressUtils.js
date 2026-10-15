/**
 * Utilities for cleaning and formatting WordPress GraphQL content
 */

/**
 * Decode HTML entities like &#8217;, &amp;, &quot;, &#038;, &hellip;
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
    .replace(/&#160;/g, " ");
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
  const cleaned = decodeHtmlEntities(stripHtml(excerpt));
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim() + "…";
}

/**
 * Clean WordPress title
 */
export function cleanTitle(title = "") {
  return decodeHtmlEntities(stripHtml(title));
}

/**
 * Resolves an image URL safely
 */
export function resolveImageUrl(sourceUrl, fallbackUrl = "") {
  if (!sourceUrl || typeof sourceUrl !== "string") return fallbackUrl;
  return sourceUrl.trim();
}

import { useEffect } from "react";

/**
 * Reusable SEO component for dynamic metadata management (Title, Description, Canonical, OG tags)
 */
export default function SEO({
  title,
  description = "Shining Stars Fostering Agency — An Independent Fostering Agency rated Outstanding by Ofsted, providing dedicated 24/7 care and fostering in London and across the UK.",
  image = "https://teal-penguin-283093.hostingersite.com/wp-content/uploads/2019/10/shining-stars-logo-white-back-320x80.png",
  canonicalUrl,
}) {
  useEffect(() => {
    // 1. Set document title
    const fullTitle = title
      ? `${title} | Shining Stars Fostering Agency`
      : "Shining Stars Fostering Agency — Outstanding Independent Fostering";
    document.title = fullTitle;

    // Helper to create or update meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "author", "wolfmedia");

    // 3. OpenGraph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", "Shining Stars Fostering Agency");

    // 4. Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // 5. Canonical Link
    if (canonicalUrl || typeof window !== "undefined") {
      const url = canonicalUrl || window.location.href;
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", url);
    }
  }, [title, description, image, canonicalUrl]);

  return null;
}

import React, { useMemo } from "react";
import FaqView from "@/components/site/content-renderers/FaqView";
import JourneyStepperView from "@/components/site/content-renderers/JourneyStepperView";
import AllowancesView from "@/components/site/content-renderers/AllowancesView";
import KidsZoneView from "@/components/site/content-renderers/KidsZoneView";
import LegalPolicyView from "@/components/site/content-renderers/LegalPolicyView";
import LocationPageView from "@/components/site/content-renderers/LocationPageView";
import NarrativeView from "@/components/site/content-renderers/NarrativeView";

/**
 * Detects the specific layout archetype suited for this page content.
 * Guarantees distinct, non-repetitive designs tailored to each page's actual data.
 */
export function detectPageContentType(slugOrUri = "", content = "") {
  const s = (slugOrUri || "").toLowerCase().replace(/^\/+|\/+$/g, "");
  const c = (content || "").toLowerCase();

  // 1. Legal, Policies, Regulatory Documents & Cookies
  if (
    s.includes("privacy") ||
    s.includes("cookie") ||
    s.includes("complaint") ||
    s.includes("statement-of-purpose")
  ) {
    return "legal";
  }

  // 2. FAQ & Q&A pages
  if (
    s.includes("faq") ||
    s.includes("frequently-asked") ||
    content.includes("wp-accordion-item")
  ) {
    return "faq";
  }

  // 3. Step-by-Step / Application & Transfer Journey
  if (
    s.includes("how-to-become") ||
    s.includes("how-to-transfer") ||
    (c.includes("step 1") && c.includes("step 2"))
  ) {
    return "journey";
  }

  // 4. Financial Allowances & Pay
  if (s.includes("allowance") || s.includes("fostering-pay")) {
    return "allowances";
  }

  // 5. Regional / Borough Location Pages
  if (s.startsWith("fostering-in-") || s.startsWith("fostering_in_")) {
    return "location";
  }

  // 6. Carer guides (prevent false-positive match to kids zone because of "children" in URL)
  if (
    s.includes("could-you-foster") ||
    s.includes("why-foster") ||
    s.includes("why-do-people-foster") ||
    s.includes("types-of-placement")
  ) {
    return "narrative";
  }

  // 7. Children & Young People Zone
  if (
    s.includes("children-young-people") ||
    s.includes("kids-zone") ||
    s.includes("fun-zone") ||
    s.includes("comfort-box") ||
    s.includes("step-up") ||
    s.includes("safeguarding") ||
    s.includes("uasc-guides") ||
    s.includes("birth-children")
  ) {
    return "kids";
  }

  // Default: Narrative Editorial layout (About Us, Core Mission, Values)
  return "narrative";
}

/**
 * Master Content Renderer:
 * Dispatches each page to its tailored, content-specific design archetype.
 * Strictly uses only the fetched WordPress content without adding extra dummy copy.
 */
export default function WordPressContentRenderer({
  content = "",
  pageTitle = "",
  pageUri = "",
  slug = "",
  className = "",
}) {
  const layoutType = useMemo(
    () => detectPageContentType(slug || pageUri, content || ""),
    [slug, pageUri, content]
  );

  if (!content || typeof content !== "string") {
    return null;
  }

  switch (layoutType) {
    case "faq":
      return <FaqView content={content} pageTitle={pageTitle} />;

    case "journey":
      return <JourneyStepperView content={content} pageTitle={pageTitle} />;

    case "allowances":
      return <AllowancesView content={content} pageTitle={pageTitle} />;

    case "kids":
      return <KidsZoneView content={content} pageTitle={pageTitle} />;

    case "legal":
      return <LegalPolicyView content={content} pageTitle={pageTitle} />;

    case "location":
      return <LocationPageView content={content} pageTitle={pageTitle} />;

    case "narrative":
    default:
      return <NarrativeView content={content} className={className} />;
  }
}

import { useQuery } from "@tanstack/react-query";
import { executeWpQuery, executeWpRest, WORDPRESS_GRAPHQL_URL } from "@/api/wordpressClient";
import {
  GET_POSTS_QUERY,
  GET_POSTS_BY_CATEGORY_QUERY,
  GET_POST_BY_SLUG_QUERY,
  GET_POST_BY_URI_QUERY,
  GET_PAGE_BY_URI_QUERY,
  GET_TEAM_MEMBERS_QUERY,
  GET_TEAM_MEMBER_BY_URI_QUERY,
  GET_TEAM_MEMBER_BY_SLUG_QUERY,
  GET_CATEGORIES_QUERY,
  GET_SITE_SETTINGS_QUERY,
} from "@/api/wordpressQueries";
import {
  cleanTitle,
  cleanExcerpt,
  cleanWPBakeryShortcodes,
  sanitizeHtml,
  resolveImageUrl,
  formatWpDate,
  formatEventDate,
  formatEventTime,
} from "@/api/wordpressUtils";
import {
  HERO_SLIDES,
  TICKER_ITEMS,
  NEWS as DEFAULT_NEWS,
  EVENTS as DEFAULT_EVENTS,
  TEAM as DEFAULT_TEAM,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  LOGO,
} from "@/lib/ssfaData";

// Real-time polling configuration: fresh for 5s, background refetch every 20s
const REALTIME_QUERY_CONFIG = {
  staleTime: 1000 * 5,
  refetchInterval: 1000 * 20,
  refetchOnWindowFocus: true,
};

/**
 * Helper to resolve a team member's role/job title from WordPress metadata or local catalogue
 */
function resolveTeamMemberRole(node) {
  const name = cleanTitle(node?.title || "");
  const alt = node?.featuredImage?.node?.altText?.trim() || "";

  // If altText contains a valid role that is not just the person's name
  if (
    alt &&
    !name.toLowerCase().includes(alt.toLowerCase()) &&
    !alt.toLowerCase().includes(name.toLowerCase())
  ) {
    return alt;
  }

  // Look up in curated local team data
  const matched = DEFAULT_TEAM.find(
    (m) => m.name.toLowerCase() === name.toLowerCase()
  );
  if (matched?.title) return matched.title;

  return alt || "Team Member";
}

/**
 * Hook to fetch latest WordPress Posts / News with cursor pagination and real-time updates
 */
export function useWordPressPosts(limit = 10, after = null) {
  const query = useQuery({
    queryKey: ["wp-posts", limit, after],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_POSTS_QUERY, {
        first: limit,
        after,
      });

      if (error || !data?.posts?.nodes?.length) {
        return null;
      }

      const rawNodes = data.posts.nodes;
      const pageInfo = data.posts.pageInfo || { hasNextPage: false, endCursor: null };

      const nodes = rawNodes.map((node) => {
        const catName = node.categories?.nodes?.[0]?.name || "News & Updates";
        const image =
          node.featuredImage?.node?.sourceUrl ||
          DEFAULT_NEWS[0]?.img ||
          LOGO;

        const siteBase = WORDPRESS_GRAPHQL_URL.replace(/\/graphql\/?$/, "");
        const externalHref = node.uri
          ? `${siteBase}${node.uri}`
          : `https://shiningstarsfostering.com/${node.slug}/`;

        return {
          id: node.id,
          databaseId: node.databaseId,
          title: cleanTitle(node.title),
          excerpt: cleanExcerpt(node.excerpt || "", 170),
          img: resolveImageUrl(image),
          tag: catName,
          categories: node.categories?.nodes || [],
          tags: node.tags?.nodes || [],
          author: node.author?.node?.name || "wolfmedia",
          href: `/news/${node.slug}`,
          externalHref,
          slug: node.slug,
          uri: node.uri,
          date: node.date,
          formattedDate: formatWpDate(node.date),
          isWpLive: true,
        };
      });

      return { nodes, pageInfo };
    },
    ...REALTIME_QUERY_CONFIG,
  });

  const isLive = Boolean(query.data?.nodes && query.data.nodes.length > 0);

  // If fewer than 3 posts exist in WordPress, pad with defaults
  let posts = DEFAULT_NEWS;
  if (isLive) {
    if (query.data.nodes.length < 3) {
      posts = [...query.data.nodes, ...DEFAULT_NEWS.slice(query.data.nodes.length)];
    } else {
      posts = query.data.nodes;
    }
  }

  return {
    ...query,
    posts,
    pageInfo: query.data?.pageInfo || { hasNextPage: false, endCursor: null },
    isLive,
    rawError: query.error,
  };
}

/**
 * Hook to fetch a single post by slug or URI
 */
export function useWordPressPost(slugOrUri) {
  return useQuery({
    queryKey: ["wp-post", slugOrUri],
    queryFn: async () => {
      if (!slugOrUri) return null;

      // Determine if slugOrUri looks like a URI (/path/) or a slug
      const isUri = slugOrUri.startsWith("/") || slugOrUri.includes("/");
      let data, error;

      if (isUri) {
        const res = await executeWpQuery(GET_POST_BY_URI_QUERY, { uri: slugOrUri });
        data = res.data;
        error = res.error;
      } else {
        const res = await executeWpQuery(GET_POST_BY_SLUG_QUERY, { slug: slugOrUri });
        data = res.data;
        error = res.error;
      }

      if (error || !data?.post) {
        // Fallback check against local DEFAULT_NEWS
        const localMatch = DEFAULT_NEWS.find(
          (n) => n.slug === slugOrUri || n.title.toLowerCase().includes(slugOrUri.toLowerCase())
        );
        if (localMatch) {
          return {
            title: localMatch.title,
            slug: localMatch.slug || slugOrUri,
            content: `<p>${localMatch.excerpt || "Read more about this story from Shining Stars Fostering Agency."}</p>`,
            date: new Date().toISOString(),
            formattedDate: "Recent",
            author: "wolfmedia",
            tag: localMatch.tag || "News & Updates",
            image: localMatch.img || LOGO,
            isWpLive: false,
          };
        }
        return null;
      }

      const p = data.post;
      return {
        id: p.id,
        databaseId: p.databaseId,
        title: cleanTitle(p.title),
        slug: p.slug,
        uri: p.uri,
        content: sanitizeHtml(p.content || ""),
        rawContent: p.content || "",
        excerpt: cleanExcerpt(p.excerpt || "", 200),
        date: p.date,
        formattedDate: formatWpDate(p.date),
        author: p.author?.node?.name || "wolfmedia",
        categories: p.categories?.nodes || [],
        tags: p.tags?.nodes || [],
        image: resolveImageUrl(p.featuredImage?.node?.sourceUrl, LOGO),
        imageAlt: p.featuredImage?.node?.altText || p.title,
        isWpLive: true,
      };
    },
    enabled: Boolean(slugOrUri),
    ...REALTIME_QUERY_CONFIG,
  });
}

/**
 * Hook to fetch Team members from WordPress JetEngine custom post type (team-members)
 */
export function useWordPressTeam(limit = 50) {
  const query = useQuery({
    queryKey: ["wp-team-cpt", limit],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_TEAM_MEMBERS_QUERY, {
        first: limit,
      });

      if (error || !data?.teamMembers?.nodes?.length) {
        return null;
      }

      return data.teamMembers.nodes.map((node) => {
        const role = resolveTeamMemberRole(node);
        const image = node.featuredImage?.node?.sourceUrl || LOGO;
        const cleanedBio = cleanWPBakeryShortcodes(node.content || "");

        return {
          id: node.id,
          databaseId: node.databaseId,
          name: cleanTitle(node.title),
          title: role,
          slug: node.slug,
          uri: node.uri || `/team-members/${node.slug}/`,
          href: `/team-members/${node.slug}`,
          img: resolveImageUrl(image, LOGO),
          bio: cleanedBio,
          date: node.date,
          isWpLive: true,
        };
      });
    },
    ...REALTIME_QUERY_CONFIG,
  });

  const isLive = Boolean(query.data && query.data.length > 0);
  const team = isLive ? query.data : DEFAULT_TEAM;

  return {
    ...query,
    team,
    isLive,
  };
}

/**
 * Hook to fetch a single team member by slug or URI
 */
export function useWordPressTeamMember(slugOrUri) {
  return useQuery({
    queryKey: ["wp-team-member", slugOrUri],
    queryFn: async () => {
      if (!slugOrUri) return null;

      const slug = slugOrUri.replace(/^\/team-members\/|\/$/g, "");
      const uri = `/team-members/${slug}/`;

      // Try URI first (verified in Phase 1)
      let { data, error } = await executeWpQuery(GET_TEAM_MEMBER_BY_URI_QUERY, {
        uri,
      });

      // If URI query returned null, try query by slug
      if (!data?.teamMember) {
        const resSlug = await executeWpQuery(GET_TEAM_MEMBER_BY_SLUG_QUERY, {
          slug,
        });
        if (resSlug.data?.teamMembers?.nodes?.[0]) {
          data = { teamMember: resSlug.data.teamMembers.nodes[0] };
          error = null;
        }
      }

      if (error || !data?.teamMember) {
        // Fallback to local DEFAULT_TEAM
        const localMatch = DEFAULT_TEAM.find(
          (m) =>
            m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug ||
            m.name.toLowerCase() === slug.replace(/-/g, " ").toLowerCase()
        );

        if (localMatch) {
          return {
            name: localMatch.name,
            title: localMatch.title,
            slug,
            img: localMatch.img,
            bio: `<p>${localMatch.name} is a dedicated member of the Shining Stars Fostering Agency team, committed to providing outstanding support to children and foster families.</p>`,
            isWpLive: false,
          };
        }
        return null;
      }

      const m = data.teamMember;
      const role = resolveTeamMemberRole(m);
      const cleanedBio = sanitizeHtml(m.content || "");

      return {
        id: m.id,
        databaseId: m.databaseId,
        name: cleanTitle(m.title),
        title: role,
        slug: m.slug,
        uri: m.uri,
        img: resolveImageUrl(m.featuredImage?.node?.sourceUrl, LOGO),
        imageAlt: m.featuredImage?.node?.altText || m.title,
        bio: cleanedBio,
        date: m.date,
        isWpLive: true,
      };
    },
    enabled: Boolean(slugOrUri),
    ...REALTIME_QUERY_CONFIG,
  });
}

// Known alias mappings for WordPress pages where URI slugs differ between frontend and WP
const PAGE_ALIASES = {
  home: ["/home-2/", "/home/", "/"],
  "home-2": ["/home-2/"],
  about: ["/about/", "/about-shining-stars-fostering/"],
  "about-us": ["/about/", "/about-shining-stars-fostering/"],
  "about-shining-stars-fostering": ["/about/", "/about-shining-stars-fostering/"],
  "foster-with-us": ["/why-foster-with-us/", "/fostering-with-us/", "/could-you-foster-children/"],
  "kids-zone": ["/children-young-people-zone/", "/kids-zone/birth-children-guides-to-foster-care/"],
  "what-is-fostering": ["/what-is-fostering-2/", "/fostering/"],
  "faqs": ["/frequently-asked-questions-faq/", "/services/frequently-asked-questions/"],
  "frequently-asked-questions": ["/frequently-asked-questions-faq/", "/services/frequently-asked-questions/"],
  "fostering-allowance": ["/fostering-allowance-shiningstars/", "/fostering-pay/", "/fostering-allowance/"],
  "fostering-allowances": ["/fostering-allowance-shiningstars/", "/fostering-pay/"],
  "fostering-pay": ["/fostering-pay/", "/fostering-allowance-shiningstars/"],
  "types-of-placement": ["/types-of-placement-shiningstars/", "/services/types-of-placement/"],
  "how-to-transfer-to-us": ["/how-to-transfer-to-us/"],
  "transfer-to-us": ["/how-to-transfer-to-us/"],
  "how-to-become-foster-carer": ["/how-to-become-foster-carer/"],
  "apply": ["/how-to-become-foster-carer/"],
  "apply-to-become-a-foster-carer": ["/how-to-become-foster-carer/"],
  "could-you-foster": ["/could-you-foster-children/"],
  "could-you-foster-children": ["/could-you-foster-children/"],
  "why-foster-with-us": ["/why-foster-with-us/"],
  "children-young-people-zone": ["/children-young-people-zone/"],
  "testimonials": ["/testimonials-all-foster-carer/"],
  "contact": ["/contact-us/"],
  "contact-us": ["/contact-us/"],
  "privacy-policy": ["/privacy-policy-shining-stars-fostering/", "/privacy-policy/"],
  "our-site-cookies": ["/our-site-cookies/"],
  "cookies": ["/our-site-cookies/"],
};

/**
 * Hook to fetch a WordPress page by URI with alias resolution, HTML sanitization, and console logging
 */
export function useWordPressPage(uri) {
  return useQuery({
    queryKey: ["wp-page", uri],
    queryFn: async () => {
      if (!uri) return null;
      // Strip leading and trailing slashes for clean URI resolution
      const cleanUri = uri.replace(/^\/+|\/+$/g, "");
      const lastSegment = cleanUri.includes("/") ? cleanUri.split("/").pop() : cleanUri;

      const candidates = [
        ...(PAGE_ALIASES[cleanUri] || []),
        ...(PAGE_ALIASES[lastSegment] || []),
        `/${cleanUri}/`,
        cleanUri,
        `/${lastSegment}/`,
        lastSegment,
      ];
      const uniqueCandidates = [...new Set(candidates)];

      let pageData = null;

      for (const candidate of uniqueCandidates) {
        const { data, error } = await executeWpQuery(GET_PAGE_BY_URI_QUERY, {
          uri: candidate,
        });

        if (!error && data?.page?.databaseId) {
          pageData = data.page;
          break;
        }
      }

      if (!pageData) {
        if (import.meta.env.DEV) {
          console.warn(`[WordPress Page] No page found for URI: "${uri}" (tried candidates: ${uniqueCandidates.join(", ")})`);
        }
        return null;
      }

      const p = pageData;
      const sanitizedContent = sanitizeHtml(p.content || "");

      // Prominently log the fetched page ID to the browser console
      console.log(
        `%c[WordPress Page Fetched]%c ID: %c#${p.databaseId}%c | Title: %c"${p.title}"%c | URI: %c${p.uri}%c | GraphQL ID: %c${p.id}`,
        "background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #64748b;",
        "color: #2563eb; font-weight: bold; background: #eff6ff; padding: 1px 6px; border-radius: 3px; font-size: 13px;",
        "color: #64748b;",
        "color: #b45309; font-weight: bold;",
        "color: #64748b;",
        "color: #7c3aed; font-weight: bold;",
        "color: #64748b;",
        "color: #059669; font-family: monospace;"
      );

      return {
        id: p.id,
        databaseId: p.databaseId,
        pageId: p.databaseId,
        title: cleanTitle(p.title),
        slug: p.slug,
        uri: p.uri,
        content: sanitizedContent,
        rawContent: p.content || "",
        image: resolveImageUrl(p.featuredImage?.node?.sourceUrl, null),
        imageAlt: p.featuredImage?.node?.altText || p.title,
        date: p.date,
        isWpLive: true,
      };
    },
    enabled: Boolean(uri),
    ...REALTIME_QUERY_CONFIG,
  });
}

/**
 * Hook to fetch post categories from WordPress
 */
export function useWordPressCategories() {
  return useQuery({
    queryKey: ["wp-categories"],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_CATEGORIES_QUERY);
      if (error || !data?.categories?.nodes?.length) return [];
      return data.categories.nodes;
    },
    ...REALTIME_QUERY_CONFIG,
  });
}

/**
 * Helper to normalize raw event object from The Events Calendar plugin into a standardized format
 */
export function normalizeTribeEvent(raw, idx = 0) {
  if (!raw) return null;
  const colors = ["orange", "blue", "green"];
  const color = colors[idx % colors.length];

  const venueName =
    raw.venue?.venue ||
    (typeof raw.venue === "string" ? raw.venue : "") ||
    "Shining Stars Fostering";
  const venueTown =
    raw.venue?.city ||
    (raw.venue?.state ? `${raw.venue.city ? raw.venue.city + ", " : ""}${raw.venue.state}` : "") ||
    "London & Surrounding";
  const venueAddress = raw.venue?.address || "";
  const venueZip = raw.venue?.zip || "";

  const organizer = raw.organizer?.[0] || {};
  const organizerName = organizer.organizer || "Shining Stars Fostering Agency";
  const organizerPhone = organizer.phone || "020 8263 6260";
  const organizerEmail = organizer.email || "info@shiningstarsfostering.com";

  // Featured image resolution with fallback
  const imgUrl = raw.image?.url || raw.image?.sizes?.large?.url || null;

  const cats = Array.isArray(raw.categories)
    ? raw.categories.map((c) => ({
        id: c.id,
        name: cleanTitle(c.name),
        slug: c.slug,
      }))
    : [];

  const rawDescription = raw.description || "";
  const cleanedDescription = sanitizeHtml(rawDescription);
  const excerptText = raw.excerpt
    ? cleanExcerpt(raw.excerpt, 200)
    : cleanExcerpt(rawDescription, 160);

  return {
    id: raw.id,
    databaseId: raw.id,
    title: cleanTitle(raw.title),
    slug: raw.slug,
    description: cleanedDescription,
    excerpt: excerptText,
    image: imgUrl,
    startDate: raw.start_date,
    endDate: raw.end_date,
    allDay: Boolean(raw.all_day),
    date: formatEventDate(raw.start_date),
    time: formatEventTime(raw.start_date, raw.end_date, raw.all_day),
    venue: venueName,
    town: venueTown,
    address: venueAddress,
    postcode: venueZip,
    cost: raw.cost || "Free",
    costDetails: raw.cost_details || null,
    categories: cats,
    categoryNames: cats.map((c) => c.name),
    organizer: organizerName,
    organizerPhone,
    organizerEmail,
    website: raw.website || "",
    color,
    href: `/events/${raw.slug}`,
    wpUrl: raw.url || "",
    isWpLive: true,
  };
}

/**
 * Hook to fetch Events directly from WordPress The Events Calendar plugin (/wp-json/tribe/events/v1/events)
 */
export function useWordPressEvents(limit = null) {
  const query = useQuery({
    queryKey: ["wp-tribe-events"],
    queryFn: async () => {
      // The Events Calendar API caps per_page at 50, so fetch pages concurrently to get all events
      const [res1, res2] = await Promise.all([
        executeWpRest("/tribe/events/v1/events", {
          per_page: 50,
          page: 1,
          start_date: "2015-01-01",
        }),
        executeWpRest("/tribe/events/v1/events", {
          per_page: 50,
          page: 2,
          start_date: "2015-01-01",
        }),
      ]);

      const rawEvents = [
        ...(res1.data?.events || []),
        ...(res2.data?.events || []),
      ];

      if (!rawEvents.length) {
        return null;
      }

      // Sort newest date first
      rawEvents.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

      const normalized = rawEvents.map((e, idx) => normalizeTribeEvent(e, idx));

      console.log(
        `%c[WordPress Events Fetched]%c Loaded %c${normalized.length}%c events from The Events Calendar plugin`,
        "background: #8b5cf6; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
        "color: #64748b;",
        "color: #059669; font-weight: bold; font-size: 13px;",
        "color: #64748b;"
      );

      return normalized;
    },
    ...REALTIME_QUERY_CONFIG,
  });

  const isLive = Boolean(query.data && query.data.length > 0);
  const allEvents = isLive ? query.data : DEFAULT_EVENTS;
  const events = limit ? allEvents.slice(0, limit) : allEvents;

  return {
    ...query,
    events,
    allEvents,
    isLive,
  };
}

/**
 * Hook to fetch a single event by slug or numeric ID from The Events Calendar plugin
 */
export function useWordPressEvent(slugOrId) {
  const { allEvents, isLoading: isListLoading } = useWordPressEvents();

  const directQuery = useQuery({
    queryKey: ["wp-tribe-event-single", slugOrId],
    queryFn: async () => {
      if (!slugOrId) return null;
      // If it looks like a numeric ID
      if (/^\d+$/.test(slugOrId)) {
        const { data, error } = await executeWpRest(`/tribe/events/v1/events/${slugOrId}`);
        if (!error && data?.id) {
          return normalizeTribeEvent(data, 0);
        }
      }
      return null;
    },
    enabled: Boolean(
      slugOrId &&
        !allEvents?.some(
          (e) => e.slug === slugOrId || String(e.id) === String(slugOrId)
        )
    ),
    ...REALTIME_QUERY_CONFIG,
  });

  const foundFromList = allEvents?.find(
    (e) => e.slug === slugOrId || String(e.id) === String(slugOrId)
  );

  const event = foundFromList || directQuery.data || null;

  return {
    event,
    isLoading: isListLoading || (directQuery.isLoading && !foundFromList),
    isLive: Boolean(event?.isWpLive),
  };
}

/**
 * Hook to fetch event categories from The Events Calendar plugin
 */
export function useWordPressEventCategories() {
  return useQuery({
    queryKey: ["wp-tribe-categories"],
    queryFn: async () => {
      const { data, error } = await executeWpRest("/tribe/events/v1/categories", {
        per_page: 50,
      });
      if (error || !data?.categories?.length) {
        return [];
      }
      return data.categories.map((c) => ({
        id: c.id,
        name: cleanTitle(c.name),
        slug: c.slug,
        count: c.count,
      }));
    },
    ...REALTIME_QUERY_CONFIG,
  });
}

/**
 * Hook to fetch Testimonials from WordPress (posts in category "testimonials" or fallback)
 */
export function useWordPressTestimonials() {
  const query = useQuery({
    queryKey: ["wp-testimonials"],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_POSTS_BY_CATEGORY_QUERY, {
        categoryName: "testimonials",
        first: 10,
      });

      if (error || !data?.posts?.nodes?.length) {
        return null;
      }

      return data.posts.nodes.map((node) => ({
        id: node.id,
        name: cleanTitle(node.title),
        quote: cleanExcerpt(node.excerpt || node.content || "", 300),
        img: resolveImageUrl(node.featuredImage?.node?.sourceUrl, LOGO),
        isWpLive: true,
      }));
    },
    ...REALTIME_QUERY_CONFIG,
  });

  const isLive = Boolean(query.data && query.data.length > 0);
  const testimonials = isLive ? query.data : DEFAULT_TESTIMONIALS;

  return {
    ...query,
    testimonials,
    isLive,
  };
}

/**
 * Hook to fetch Hero Slides from WordPress (Home Page #6695 meta or fallback)
 */
export function useWordPressHeroSlides() {
  const query = useQuery({
    queryKey: ["wp-hero-slides"],
    queryFn: async () => {
      // 1. Fetch Home Page (#6695) from WordPress REST API to read exact live meta
      try {
        const { data: page } = await executeWpRest("/wp/v2/pages/6695");
        const meta = page?.meta;
        if (meta && (meta.slider_image_1 || meta.slider_image_5 || meta.heading_slider_1 || meta.heading_slider_5)) {
          const slots = [1, 2, 3, 4, 5];
          const rawSlides = slots
            .map((i) => ({
              slot: i,
              id: `wp-slide-${i}`,
              img: meta[`slider_image_${i}`] || HERO_SLIDES[i - 1]?.img || "",
              headline: cleanTitle(meta[`heading_slider_${i}`] || ""),
              sub: cleanExcerpt(meta[`sub_heading_slider_${i}`] || "", 300),
              alt: cleanTitle(meta[`heading_slider_${i}`] || `Slide ${i}`),
              isWpLive: true,
            }))
            .filter((s) => s.img || s.headline);

          if (rawSlides.length > 0) {
            // Sort smartly: if slot 5 is "First Heading", order [5, 4, 3, 2, 1] so First Heading appears first
            const isReverse = rawSlides.some((s) => s.slot === 5 && /first|1st/i.test(s.headline));
            const sortedSlides = [...rawSlides].sort((a, b) =>
              isReverse ? b.slot - a.slot : a.slot - b.slot
            );

            console.log(
              `%c[WordPress Hero Slider Active]%c Fetched %c${sortedSlides.length}%c authentic slides directly from WordPress Home Page (#6695) meta`,
              "background: #2563eb; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
              "color: #475569;",
              "color: #059669; font-weight: bold;",
              "color: #475569;"
            );

            return sortedSlides;
          }
        }
      } catch (err) {
        console.warn("[WordPress Hero Slider] REST meta fetch fallback:", err);
      }

      // 2. Check if there are any posts in category "hero-slides" or "slider"
      const { data } = await executeWpQuery(GET_POSTS_BY_CATEGORY_QUERY, {
        categoryName: "hero-slides",
        first: 5,
      });

      if (data?.posts?.nodes?.length) {
        return data.posts.nodes.map((node, idx) => ({
          id: node.id || `slide-${idx}`,
          img: resolveImageUrl(node.featuredImage?.node?.sourceUrl, HERO_SLIDES[idx % HERO_SLIDES.length].img),
          headline: cleanTitle(node.title),
          sub: cleanExcerpt(node.excerpt || "", 200),
          alt: cleanTitle(node.title),
          isWpLive: true,
        }));
      }

      // 3. Fallback to authentic 5 HERO_SLIDES
      return HERO_SLIDES.map((s) => ({ ...s, isWpLive: true }));
    },
    ...REALTIME_QUERY_CONFIG,
  });

  const isLive = Boolean(query.data && query.data.length > 0);
  const slides = isLive ? query.data : HERO_SLIDES;

  return {
    ...query,
    slides,
    isLive,
  };
}

/**
 * Hook to fetch the Home Page data from WordPress (Page #6695)
 */
export function useWordPressHomePage() {
  return useWordPressPage("home");
}

/**
 * Hook to fetch News Ticker items
 */
export function useWordPressTicker() {
  const { posts, isLive } = useWordPressPosts(5);

  if (isLive && posts?.length) {
    const dynamicItems = posts.map((p) => ({
      label: p.title,
      href: p.href,
    }));
    return { items: dynamicItems, isLive: true };
  }

  return { items: TICKER_ITEMS, isLive: false };
}

/**
 * Hook to fetch general site settings
 */
export function useWordPressSiteSettings() {
  return useQuery({
    queryKey: ["wp-settings"],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_SITE_SETTINGS_QUERY);
      if (error || !data?.generalSettings) return null;
      return data.generalSettings;
    },
    ...REALTIME_QUERY_CONFIG,
  });
}


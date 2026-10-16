import { useQuery } from "@tanstack/react-query";
import { executeWpQuery, WORDPRESS_GRAPHQL_URL } from "@/api/wordpressClient";
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
  about: ["/about/", "/about-shining-stars-fostering/"],
  "about-us": ["/about/", "/about-shining-stars-fostering/"],
  "foster-with-us": ["/why-foster-with-us/", "/could-you-foster-children/", "/how-to-become-foster-carer/"],
  "kids-zone": ["/children-young-people-zone/", "/kids-zone/birth-children-guides-to-foster-care/"],
  "what-is-fostering": ["/what-is-fostering-2/", "/fostering/"],
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
      const candidates = [
        cleanUri,
        `/${cleanUri}/`,
        ...(PAGE_ALIASES[cleanUri] || []),
      ];

      let pageData = null;

      for (const candidate of candidates) {
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
          console.warn(`[WordPress Page] No page found for URI: "${uri}" (tried candidates: ${candidates.join(", ")})`);
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
 * Hook to fetch Events from WordPress (posts in category "events" or fallback)
 */
export function useWordPressEvents(limit = 6) {
  const query = useQuery({
    queryKey: ["wp-events", limit],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_POSTS_BY_CATEGORY_QUERY, {
        categoryName: "events",
        first: limit,
      });

      if (error || !data?.posts?.nodes?.length) {
        return null;
      }

      const colors = ["orange", "blue", "green"];
      return data.posts.nodes.map((node, idx) => {
        const siteBase = WORDPRESS_GRAPHQL_URL.replace(/\/graphql\/?$/, "");
        const href = node.uri
          ? `${siteBase}${node.uri}`
          : `https://shiningstarsfostering.com/${node.slug}/`;

        return {
          id: node.id,
          title: cleanTitle(node.title),
          date: formatWpDate(node.date) || "Upcoming",
          time: "Check details",
          venue: "Shining Stars Fostering",
          town: "London & Surrounding",
          color: colors[idx % colors.length],
          href,
          isWpLive: true,
        };
      });
    },
    ...REALTIME_QUERY_CONFIG,
  });

  const isLive = Boolean(query.data && query.data.length > 0);
  const events = isLive ? query.data : DEFAULT_EVENTS;

  return {
    ...query,
    events,
    isLive,
  };
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
 * Hook to fetch Hero Slides from WordPress (posts in category "hero-slides" or fallback)
 */
export function useWordPressHeroSlides() {
  const query = useQuery({
    queryKey: ["wp-hero-slides"],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_POSTS_BY_CATEGORY_QUERY, {
        categoryName: "hero-slides",
        first: 5,
      });

      if (error || !data?.posts?.nodes?.length) {
        return null;
      }

      return data.posts.nodes.map((node) => ({
        id: node.id,
        img: resolveImageUrl(node.featuredImage?.node?.sourceUrl, HERO_SLIDES[0].img),
        headline: cleanTitle(node.title),
        sub: cleanExcerpt(node.excerpt || "", 200),
        isWpLive: true,
      }));
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


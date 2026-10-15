import { useQuery } from "@tanstack/react-query";
import { executeWpQuery, WORDPRESS_GRAPHQL_URL } from "@/api/wordpressClient";
import {
  GET_POSTS_QUERY,
  GET_POSTS_BY_CATEGORY_QUERY,
  GET_PAGE_BY_URI_QUERY,
  GET_SITE_SETTINGS_QUERY,
} from "@/api/wordpressQueries";
import {
  cleanTitle,
  cleanExcerpt,
  resolveImageUrl,
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

// Real-time polling options: fresh for 5s, background re-query every 15s
const REALTIME_QUERY_CONFIG = {
  staleTime: 1000 * 5,
  refetchInterval: 1000 * 15,
  refetchOnWindowFocus: true,
};

/**
 * Hook to fetch latest WordPress Posts / News with automatic fallback and real-time updates
 */
export function useWordPressPosts(limit = 6) {
  const query = useQuery({
    queryKey: ["wp-posts", limit],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_POSTS_QUERY, { first: limit });
      if (error || !data?.posts?.nodes?.length) {
        return null;
      }
      return data.posts.nodes.map((node) => {
        const catName = node.categories?.nodes?.[0]?.name || "News & Updates";
        const image =
          node.featuredImage?.node?.sourceUrl ||
          DEFAULT_NEWS[0]?.img ||
          LOGO;

        const siteBase = WORDPRESS_GRAPHQL_URL.replace(/\/graphql\/?$/, "");
        const href = node.uri ? `${siteBase}${node.uri}` : `https://shiningstarsfostering.com/${node.slug}/`;

        return {
          id: node.id,
          title: cleanTitle(node.title),
          excerpt: cleanExcerpt(node.excerpt || "", 170),
          img: resolveImageUrl(image),
          tag: catName,
          href,
          slug: node.slug,
          date: node.date,
          isWpLive: true,
        };
      });
    },
    ...REALTIME_QUERY_CONFIG,
  });

  const isLive = Boolean(query.data && query.data.length > 0);
  
  // If fewer than 3 posts exist in WordPress, pad with defaults so the layout grid stays full
  let posts = DEFAULT_NEWS;
  if (isLive) {
    if (query.data.length < 3) {
      posts = [...query.data, ...DEFAULT_NEWS.slice(query.data.length)];
    } else {
      posts = query.data;
    }
  }

  return {
    ...query,
    posts,
    isLive,
    rawError: query.error,
  };
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
        const href = node.uri ? `${siteBase}${node.uri}` : `https://shiningstarsfostering.com/${node.slug}/`;

        return {
          id: node.id,
          title: cleanTitle(node.title),
          date: node.date
            ? new Date(node.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
            : "Upcoming",
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
 * Hook to fetch Team members from WordPress (posts in category "team" or fallback)
 */
export function useWordPressTeam() {
  const query = useQuery({
    queryKey: ["wp-team"],
    queryFn: async () => {
      const { data, error } = await executeWpQuery(GET_POSTS_BY_CATEGORY_QUERY, {
        categoryName: "team",
        first: 30,
      });

      if (error || !data?.posts?.nodes?.length) {
        return null;
      }

      return data.posts.nodes.map((node) => ({
        id: node.id,
        name: cleanTitle(node.title),
        title: cleanExcerpt(node.excerpt || "", 60) || "Team Member",
        img: node.featuredImage?.node?.sourceUrl || LOGO,
        isWpLive: true,
      }));
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
        img: node.featuredImage?.node?.sourceUrl || LOGO,
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
        img: node.featuredImage?.node?.sourceUrl || HERO_SLIDES[0].img,
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

/**
 * Hook to fetch a WordPress page by URI or slug with real-time updates
 */
export function useWordPressPage(uri) {
  return useQuery({
    queryKey: ["wp-page", uri],
    queryFn: async () => {
      if (!uri) return null;
      // Strip leading/trailing slashes for clean URI resolution
      const cleanUri = uri.replace(/^\/+|\/+$/g, "");
      const { data, error } = await executeWpQuery(GET_PAGE_BY_URI_QUERY, { uri: cleanUri });
      if (error || !data?.page) return null;
      return {
        ...data.page,
        title: cleanTitle(data.page.title),
        image: data.page.featuredImage?.node?.sourceUrl || null,
      };
    },
    enabled: Boolean(uri),
    ...REALTIME_QUERY_CONFIG,
  });
}

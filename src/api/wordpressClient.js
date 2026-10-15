import { GraphQLClient } from "graphql-request";

/**
 * The WordPress GraphQL endpoint.
 * Configurable via .env.local:
 *   VITE_WORDPRESS_GRAPHQL_URL=https://your-wordpress-site.com/graphql
 */
export const WORDPRESS_GRAPHQL_URL =
  import.meta.env.VITE_WORDPRESS_GRAPHQL_URL ||
  "https://teal-penguin-283093.hostingersite.com/graphql";

export const WORDPRESS_AUTH_TOKEN =
  import.meta.env.VITE_WORDPRESS_AUTH_TOKEN || "";

/**
 * Headers sent with every GraphQL request.
 */
const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (WORDPRESS_AUTH_TOKEN) {
    headers["Authorization"] = `Bearer ${WORDPRESS_AUTH_TOKEN}`;
  }
  return headers;
};

/**
 * Singleton GraphQLClient instance configured for WordPress WPGraphQL.
 */
export const wpClient = new GraphQLClient(WORDPRESS_GRAPHQL_URL, {
  headers: getHeaders(),
  errorPolicy: "all",
});

/**
 * Safe fetch wrapper that executes a GraphQL query and returns a standardized result.
 * Catches network errors or CORS failures gracefully so the app never crashes.
 */
export async function executeWpQuery(query, variables = {}) {
  try {
    const data = await wpClient.request(query, variables);
    return { data, error: null };
  } catch (error) {
    // Log helpful diagnostic in dev mode
    if (import.meta.env.DEV) {
      console.warn(
        `[WordPress GraphQL Error] Failed to fetch from "${WORDPRESS_GRAPHQL_URL}". Falling back to local data. Reason:`,
        error?.message || error
      );
    }
    return { data: null, error };
  }
}

/**
 * Health check function to test if the WordPress GraphQL endpoint is reachable.
 */
export async function testWordPressConnection() {
  const query = `
    query PingWP {
      generalSettings {
        title
        description
        url
      }
    }
  `;
  try {
    const res = await wpClient.request(query);
    return {
      connected: true,
      url: WORDPRESS_GRAPHQL_URL,
      siteTitle: res?.generalSettings?.title || "",
      siteUrl: res?.generalSettings?.url || "",
    };
  } catch (err) {
    return {
      connected: false,
      url: WORDPRESS_GRAPHQL_URL,
      error: err?.message || String(err),
    };
  }
}

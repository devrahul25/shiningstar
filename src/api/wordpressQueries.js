import { gql } from "graphql-request";

/**
  * Query general site settings (Title, Description, URL)
  */
export const GET_SITE_SETTINGS_QUERY = gql`
  query GetSiteSettings {
    generalSettings {
      title
      description
      url
    }
  }
`;

/**
 * Query recent posts / news articles with cursor pagination, featured images, and categories
 */
export const GET_POSTS_QUERY = gql`
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        databaseId
        title
        slug
        uri
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

/**
 * Query posts filtered by category (e.g. for events or news filtering)
 */
export const GET_POSTS_BY_CATEGORY_QUERY = gql`
  query GetPostsByCategory($categoryName: String!, $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        title
        slug
        uri
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

/**
 * Query single post by slug (idType: SLUG)
 */
export const GET_POST_BY_SLUG_QUERY = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      content
      excerpt
      date
      slug
      uri
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

/**
 * Query single post by URI (idType: URI)
 */
export const GET_POST_BY_URI_QUERY = gql`
  query GetPostByUri($uri: ID!) {
    post(id: $uri, idType: URI) {
      id
      databaseId
      title
      content
      excerpt
      date
      slug
      uri
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

/**
 * Query a single page by URI (e.g. "what-is-fostering", "contact")
 * Note: $uri must be typed as ID! in WPGraphQL
 */
export const GET_PAGE_BY_URI_QUERY = gql`
  query GetPageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

/**
 * Query all pages with cursor-based pagination
 */
export const GET_ALL_PAGES_QUERY = gql`
  query GetAllPages($first: Int = 50, $after: String) {
    pages(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/**
 * Query Team Members (JetEngine CPT team-members -> teamMembers query)
 * Verified against teal-penguin-283093.hostingersite.com/graphql
 */
export const GET_TEAM_MEMBERS_QUERY = gql`
  query GetTeamMembers($first: Int = 50, $after: String) {
    teamMembers(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/**
 * Query a single team member by URI (e.g. "/team-members/sajid-mir/")
 */
export const GET_TEAM_MEMBER_BY_URI_QUERY = gql`
  query GetTeamMemberByUri($uri: ID!) {
    teamMember(id: $uri, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      date
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

/**
 * Query a single team member by slug name
 */
export const GET_TEAM_MEMBER_BY_SLUG_QUERY = gql`
  query GetTeamMemberBySlug($slug: String!) {
    teamMembers(where: { name: $slug }, first: 1) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/**
 * Query all post categories
 */
export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories(first: 50, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        name
        slug
        count
      }
    }
  }
`;

/**
 * Query images from the WordPress Media Library
 */
export const GET_MEDIA_LIBRARY_QUERY = gql`
  query GetMediaLibrary($first: Int = 20) {
    mediaItems(first: $first, where: { mimeType: IMAGE_JPEG }) {
      nodes {
        id
        title
        sourceUrl
        altText
        caption
        mediaDetails {
          width
          height
        }
      }
    }
  }
`;


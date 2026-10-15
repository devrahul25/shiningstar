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
 * Query recent posts / news articles with featured images and categories
 */
export const GET_POSTS_QUERY = gql`
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
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
      }
    }
  }
`;

/**
 * Query posts filtered by category (useful for 'events', 'team', 'testimonials', or 'news')
 */
export const GET_POSTS_BY_CATEGORY_QUERY = gql`
  query GetPostsByCategory($categoryName: String!, $first: Int = 10) {
    posts(first: $first, where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }) {
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
 * Query single post by slug
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
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;

/**
 * Query a page by URI (e.g. "about", "foster-with-us")
 */
export const GET_PAGE_BY_URI_QUERY = gql`
  query GetPageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      databaseId
      title
      slug
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

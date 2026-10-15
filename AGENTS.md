# AGENTS.md

## Project Context

This is an independent React application (Vite + Tailwind CSS + TanStack Query) integrated directly with WordPress via WPGraphQL. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

## Key Files

- `src/`: frontend application source.
- `src/api/wordpressClient.js`: frontend WordPress GraphQL client (`graphql-request`).
- `src/api/wordpressQueries.js`: WPGraphQL queries for posts, pages, events, team, and testimonials.
- `src/hooks/useWordPressData.js`: React Query hooks for fetching live WordPress data.
- `vite.config.js`: Vite configuration with path aliases (`@/`).
- `.env.local`: local environment variables (`VITE_WORDPRESS_GRAPHQL_URL`).

## Working Notes

- Use `npm run dev` to start the frontend development server.
- Run `npm run lint` and `npm run build` to validate changes before finishing.

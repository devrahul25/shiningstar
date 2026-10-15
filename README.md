# Shining Stars Fostering Agency - Web Application

A modern, high-performance React application built with Vite, Tailwind CSS, Lucide Icons, and TanStack Query, connected directly to a headless WordPress backend via WPGraphQL.

## Features

- **Blazing Fast**: Pure React 18 SPA powered by standard Vite 6.
- **Headless WordPress Integration**: Connects dynamically to WordPress via WPGraphQL (`graphql-request` + `@tanstack/react-query`).
- **Real-Time Data Sync**: Automatic window-focus revalidation and background sync for news, events, team members, testimonials, hero slides, and pages.
- **Fail-Safe Fallbacks**: Gracefully serves fallback content if the WordPress endpoint is unreachable or offline.
- **Responsive & Accessible**: Clean design system built with Tailwind CSS.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create or edit `.env.local` in the project root:

```env
# WordPress WPGraphQL Endpoint URL
VITE_WORDPRESS_GRAPHQL_URL=https://teal-penguin-283093.hostingersite.com/graphql

# Optional: Bearer token for draft previews or private queries
VITE_WORDPRESS_AUTH_TOKEN=
```

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

The production output is generated in `./dist`.

### 5. Lint & Typecheck

```bash
npm run lint
npm run typecheck
```

import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import WordPressStatusBadge from "./components/WordPressStatusBadge";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import FosterWithUs from "@/pages/FosterWithUs";
import KidsZone from "@/pages/KidsZone";
import BlogList from "@/pages/BlogList";
import SinglePost from "@/pages/SinglePost";
import EventsPage from "@/pages/EventsPage";
import SingleEvent from "@/pages/SingleEvent";
import TeamDirectory from "@/pages/TeamDirectory";
import TeamMemberProfile from "@/pages/TeamMemberProfile";
import DynamicWordPressPage from "@/pages/DynamicWordPressPage";
import SiteLayout from "@/components/site/SiteLayout";

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            {/* Primary Core Application Routes - Powered 100% by live WordPress content */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<DynamicWordPressPage uriOverride="about" />} />
            <Route path="/about-shining-stars-fostering" element={<DynamicWordPressPage uriOverride="about" />} />
            <Route path="/about-shining-stars-fostering/*" element={<DynamicWordPressPage uriOverride="about" />} />
            <Route path="/foster-with-us" element={<DynamicWordPressPage uriOverride="why-foster-with-us" />} />
            <Route path="/kids-zone" element={<DynamicWordPressPage uriOverride="children-young-people-zone" />} />

            {/* Team Members Routes (JetEngine CPT) */}
            <Route path="/team" element={<TeamDirectory />} />
            <Route path="/about/our-team" element={<TeamDirectory />} />
            <Route path="/team-members" element={<TeamDirectory />} />
            <Route path="/team-members/:slug" element={<TeamMemberProfile />} />
            <Route path="/team/:slug" element={<TeamMemberProfile />} />

            {/* News & Blog Routes */}
            <Route path="/news" element={<BlogList />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/news/:slug" element={<SinglePost />} />
            <Route path="/blog/:slug" element={<SinglePost />} />

            {/* Events & Community Calendar Routes (The Events Calendar Plugin) */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<SingleEvent />} />
            <Route path="/event/:slug" element={<SingleEvent />} />

            {/* Specific Known WordPress Landing Pages */}
            <Route
              path="/what-is-fostering"
              element={<DynamicWordPressPage uriOverride="what-is-fostering" />}
            />
            <Route path="/page/:slug" element={<DynamicWordPressPage />} />

            {/* Catch-all Dynamic WordPress Route (supports nested URIs like /services/care/) */}
            <Route path="/*" element={<DynamicWordPressPage />} />
          </Route>

          {/* Standalone 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <WordPressStatusBadge />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
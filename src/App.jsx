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
import DynamicWordPressPage from "@/pages/DynamicWordPressPage";
import SiteLayout from "@/components/site/SiteLayout";

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/foster-with-us" element={<FosterWithUs />} />
            <Route path="/kids-zone" element={<KidsZone />} />
            <Route
              path="/what-is-fostering"
              element={<DynamicWordPressPage uriOverride="what-is-fostering" />}
            />
            <Route path="/page/:slug" element={<DynamicWordPressPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <WordPressStatusBadge />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
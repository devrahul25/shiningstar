import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { useWordPressEvents, useWordPressEventCategories } from "@/hooks/useWordPressData";
import { HERO_IMGS } from "@/lib/pagesContent";
import {
  CalendarDays,
  Clock,
  MapPin,
  Search,
  Tag,
  ArrowRight,
  Rss,
  Loader2,
  Calendar,
} from "lucide-react";

export default function EventsPage() {
  const { allEvents, isLoading, isLive } = useWordPressEvents();
  const { data: categories = [] } = useWordPressEventCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterType, setFilterType] = useState("all"); // 'all' | 'featured'

  // Filtered and sorted events
  const filteredEvents = useMemo(() => {
    if (!allEvents || !Array.isArray(allEvents)) return [];

    return allEvents.filter((event) => {
      // 1. Category filter
      if (selectedCategory !== "all") {
        const matchesCategory =
          event.categories?.some((c) => c.slug === selectedCategory || c.name === selectedCategory) ||
          event.categoryNames?.some((name) => name.toLowerCase() === selectedCategory.toLowerCase());
        if (!matchesCategory) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = event.title?.toLowerCase().includes(q);
        const matchesExcerpt = event.excerpt?.toLowerCase().includes(q);
        const matchesVenue = event.venue?.toLowerCase().includes(q);
        const matchesTown = event.town?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt && !matchesVenue && !matchesTown) {
          return false;
        }
      }

      // 3. Filter type (e.g. events with images or special highlights)
      if (filterType === "featured" && !event.image) {
        return false;
      }

      return true;
    });
  }, [allEvents, selectedCategory, searchQuery, filterType]);

  const activeCategories = useMemo(() => {
    if (!categories.length) {
      // Derive categories from allEvents if API categories list is not ready
      const catMap = new Map();
      allEvents?.forEach((e) => {
        e.categories?.forEach((c) => {
          if (!catMap.has(c.slug)) {
            catMap.set(c.slug, { slug: c.slug, name: c.name, count: 1 });
          } else {
            catMap.get(c.slug).count++;
          }
        });
      });
      return Array.from(catMap.values());
    }
    return categories;
  }, [categories, allEvents]);

  return (
    <main>
      <SEO
        title="Events & Training Calendar — Shining Stars Fostering"
        description="Explore upcoming community events, family fun days, carer training workshops, and support groups from Shining Stars Fostering Agency."
        image={HERO_IMGS.about}
      />

      <PageHero
        eyebrow="Community & Training"
        title="Events & Community Calendar"
        intro="From annual family fun days and foster carer award ceremonies to essential safeguarding workshops, explore all events hosted and supported by Shining Stars."
        img="https://teal-penguin-283093.hostingersite.com/wp-content/uploads/2026/07/SSFA_FFM_27July26.png"
        imgAlt="Shining Stars Family Fun Mela celebration"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/foster-with-us#enquire"
            className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-8 py-3.5 rounded-full min-h-[48px] hover:bg-orange/90 transition-all shadow-md text-base"
          >
            Register for an event
          </Link>
          {isLive && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 text-white px-3.5 py-2 rounded-full backdrop-blur border border-white/20">
              <Rss size={13} className="text-emerald-300" /> Powered by The Events Calendar Plugin
            </span>
          )}
        </div>
      </PageHero>

      {/* Main Events Directory Section */}
      <section className="bg-slate-50/60 py-12 md:py-20">
        <div className="container-ss">
          {/* Filter Bar & Controls */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-sm mb-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Input */}
              <div className="md:col-span-8 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="text"
                  placeholder="Search events by title, keyword, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-full text-charcoal text-sm outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                />
              </div>

              {/* Quick Tab / View Type */}
              <div className="md:col-span-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                    filterType === "all"
                      ? "bg-blue text-white shadow-sm"
                      : "bg-slate-100 text-charcoal/70 hover:bg-slate-200"
                  }`}
                >
                  All Events ({allEvents?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType("featured")}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                    filterType === "featured"
                      ? "bg-blue text-white shadow-sm"
                      : "bg-slate-100 text-charcoal/70 hover:bg-slate-200"
                  }`}
                >
                  With Photos
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                  <Tag size={12} /> Topics:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    selectedCategory === "all"
                      ? "bg-charcoal text-white"
                      : "bg-slate-100 text-charcoal/70 hover:bg-slate-200"
                  }`}
                >
                  All Topics
                </button>
                {activeCategories.map((cat) => (
                  <button
                    key={cat.id || cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                      selectedCategory === cat.slug
                        ? "bg-blue text-white"
                        : "bg-slate-100 text-charcoal/70 hover:bg-slate-200"
                    }`}
                  >
                    {cat.name} {cat.count ? `(${cat.count})` : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
              <p className="text-charcoal/70 font-semibold text-lg">
                Loading events from WordPress The Events Calendar plugin...
              </p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto shadow-sm">
              <Calendar className="w-12 h-12 text-charcoal/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold font-display text-charcoal mb-2">No matching events found</h3>
              <p className="text-charcoal/70 text-sm mb-6">
                Try adjusting your search query or selecting a different category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFilterType("all");
                }}
                className="bg-blue text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-blue/90 transition-all"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((e, idx) => (
                <article
                  key={e.id || idx}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  {/* Event Top Visual */}
                  {e.image ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={e.image}
                        alt={e.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60" />
                      {e.categories?.[0] && (
                        <span className="absolute top-3 left-3 text-[11px] font-bold bg-white/95 backdrop-blur text-charcoal px-3 py-1 rounded-full shadow-sm">
                          {e.categories[0].name}
                        </span>
                      )}
                      {e.cost && e.cost !== "Free" && (
                        <span className="absolute top-3 right-3 text-[11px] font-bold bg-amber-500 text-white px-2.5 py-1 rounded-full shadow-sm">
                          {e.cost}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="h-3 bg-gradient-to-r from-blue via-sky to-orange" />
                  )}

                  {/* Event Content */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    {/* Date Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue/10 text-blue border border-blue/20">
                        <CalendarDays size={13} />
                        {e.date}
                      </span>
                      {!e.image && e.categories?.[0] && (
                        <span className="text-[11px] font-bold text-charcoal/60 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {e.categories[0].name}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-charcoal group-hover:text-blue transition-colors line-clamp-2 mt-1">
                      <Link to={`/events/${e.slug}`}>{e.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    {e.excerpt && (
                      <p className="mt-2.5 text-sm text-charcoal/70 line-clamp-2 leading-relaxed">
                        {e.excerpt}
                      </p>
                    )}

                    {/* Metadata Footer */}
                    <div className="mt-auto pt-5 border-t border-slate-100 space-y-2 text-sm text-charcoal/75">
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-blue shrink-0" />
                        <span className="font-medium">{e.time}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin size={14} className="text-orange mt-0.5 shrink-0" />
                        <span className="line-clamp-1 font-medium">{e.venue}, {e.town}</span>
                      </p>
                    </div>

                    {/* Button */}
                    <div className="mt-6 pt-2">
                      <Link
                        to={`/events/${e.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 px-5 rounded-full text-sm group-hover:bg-blue transition-all duration-300 shadow-sm"
                      >
                        <span>View Event Details</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <ClosingCta
        title="Want to host or suggest an event?"
        text="Our community team is always excited to collaborate with carers, local authorities, and children."
      />
      <EnquirySection />
    </main>
  );
}

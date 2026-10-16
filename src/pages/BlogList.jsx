import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWordPressPosts, useWordPressCategories } from "@/hooks/useWordPressData";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { ArrowRight, Calendar, User, Rss, Filter } from "lucide-react";
import { HERO_IMGS } from "@/lib/pagesContent";

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { posts, isLive, isLoading, isError, pageInfo } = useWordPressPosts(18);
  const { data: categories = [] } = useWordPressCategories();

  // Filter posts by category if selected
  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((p) => {
        const catNames = p.categories?.map((c) => c.slug.toLowerCase()) || [];
        return catNames.includes(selectedCategory.toLowerCase()) || p.tag?.toLowerCase() === selectedCategory.toLowerCase();
      });

  return (
    <main>
      <SEO
        title="News & Updates"
        description="Latest news, announcements, fostering stories, and event updates from Shining Stars Fostering Agency."
      />

      <PageHero
        eyebrow="Stay Informed"
        title="News & Insights"
        intro="Stories, advice, and updates from the Shining Stars Fostering community across London and the UK."
        img={HERO_IMGS.about}
        imgAlt="Shining Stars Fostering News"
      >
        <div className="flex items-center gap-3">
          {isLive && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-green/20 text-emerald-300 px-3 py-1.5 rounded-full backdrop-blur">
              <Rss size={13} /> Connected to WordPress
            </span>
          )}
          <span className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur">
            {posts.length} {posts.length === 1 ? "Article" : "Articles"} Available
          </span>
        </div>
      </PageHero>

      {/* Main Listing Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-ss">
          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
              <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider inline-flex items-center gap-1 mr-2">
                <Filter size={13} /> Filter:
              </span>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-blue text-white shadow-sm"
                    : "bg-slate-100 text-charcoal/70 hover:bg-slate-200"
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat.slug
                      ? "bg-blue text-white shadow-sm"
                      : "bg-slate-100 text-charcoal/70 hover:bg-slate-200"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          )}

          {/* Loading Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-slate-100 rounded-3xl h-96" />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center max-w-xl mx-auto">
              <p className="text-amber-800 font-bold mb-2">Notice: Currently displaying offline preview</p>
              <p className="text-amber-700/80 text-sm">
                WordPress updates are currently syncing in the background. Showing verified recent stories.
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl">
              <p className="text-lg font-bold text-charcoal mb-2">No articles found in this category.</p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-blue font-bold text-sm hover:underline"
              >
                Clear filter to view all articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id || post.slug}
                  className="group bg-white rounded-3xl overflow-hidden ring-1 ring-border hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  <Link
                    to={`/news/${post.slug}`}
                    className="block aspect-[16/10] overflow-hidden bg-sky relative"
                  >
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {post.tag && (
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {post.tag}
                      </span>
                    )}
                  </Link>

                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-charcoal/60 mb-3">
                      {post.formattedDate && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} /> {post.formattedDate}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <User size={13} /> {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold font-display text-charcoal leading-snug group-hover:text-blue transition-colors">
                      <Link to={`/news/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="mt-3 text-sm text-charcoal/70 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <Link
                        to={`/news/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue group-hover:text-orange transition-colors"
                      >
                        Read full story <ArrowRight size={15} />
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
        title="Want to learn more about becoming a foster carer?"
        text="Contact our friendly local team for an informal, no-pressure chat today."
      />
      <EnquirySection />
    </main>
  );
}

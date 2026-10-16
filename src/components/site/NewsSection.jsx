import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rss } from "lucide-react";
import { useWordPressPosts } from "@/hooks/useWordPressData";

export default function NewsSection() {
  const { posts, isLive, isLoading } = useWordPressPosts(6);

  return (
    <section id="news" className="bg-white py-20 md:py-28">
      <div className="container-ss">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-purple font-bold text-sm uppercase tracking-[0.2em]">
                Latest News & Updates
              </p>
              {isLive && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-green/10 text-green px-2.5 py-0.5 rounded-full">
                  <Rss size={11} /> Live WP
                </span>
              )}
            </div>
            <h2 className="display-section text-charcoal text-balance">
              What's happening at Shining Stars.
            </h2>
          </div>
          <Link
            to="/news"
            className="text-blue font-bold hover:text-orange transition-colors inline-flex items-center gap-1.5"
          >
            All news & updates <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-slate-100 rounded-3xl h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((n, idx) => {
              const targetRoute = `/news/${n.slug}`;
              return (
                <article
                  key={n.id || n.slug || idx}
                  className="group bg-white rounded-3xl overflow-hidden ring-1 ring-border hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <Link
                    to={targetRoute}
                    className="block aspect-[16/10] overflow-hidden bg-sky relative"
                  >
                    <img
                      src={n.img}
                      alt={n.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-flex self-start text-xs font-bold text-blue bg-blue/10 px-3 py-1 rounded-full">
                      {n.tag}
                    </span>
                    <h3 className="text-lg font-bold font-display text-charcoal mt-3 leading-snug group-hover:text-blue transition-colors">
                      <Link to={targetRoute}>{n.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm text-charcoal/65 leading-relaxed flex-1">
                      {n.excerpt}
                    </p>
                    <Link
                      to={targetRoute}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-orange hover:text-blue transition-colors"
                    >
                      Read more <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
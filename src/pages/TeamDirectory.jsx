import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWordPressTeam } from "@/hooks/useWordPressData";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { ArrowRight, Rss, Search, Users } from "lucide-react";
import { HERO_IMGS } from "@/lib/pagesContent";

export default function TeamDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const { team, isLive, isLoading } = useWordPressTeam(50);

  const filteredTeam = team.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      (m.title && m.title.toLowerCase().includes(term))
    );
  });

  return (
    <main>
      <SEO
        title="Our Team"
        description="Meet the dedicated team behind Shining Stars Fostering Agency — social workers, therapists, and staff supporting foster families across London."
      />

      <PageHero
        eyebrow="Meet the Family"
        title="Our Dedicated Team"
        intro="Passionate social workers, support staff, and specialists working together with our foster carers to transform children's lives."
        img={HERO_IMGS.about}
        imgAlt="Shining Stars Fostering Team"
      >
        <div className="flex items-center gap-3">
          {isLive && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-green/20 text-emerald-300 px-3 py-1.5 rounded-full backdrop-blur">
              <Rss size={13} /> Live JetEngine CPT
            </span>
          )}
          <span className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur inline-flex items-center gap-1">
            <Users size={13} /> {team.length} Team Members
          </span>
        </div>
      </PageHero>

      {/* Team Directory Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-ss">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-14 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or role (e.g. Social Worker)..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/30 text-sm font-medium text-charcoal placeholder:text-charcoal/40 shadow-sm transition-all"
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse bg-slate-100 rounded-3xl h-72" />
              ))}
            </div>
          ) : filteredTeam.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl max-w-lg mx-auto">
              <p className="text-lg font-bold text-charcoal mb-2">No team members found</p>
              <p className="text-sm text-charcoal/60 mb-4">No staff matched your search for "{searchTerm}".</p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue font-bold text-sm hover:underline"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredTeam.map((m) => {
                const profileSlug = m.slug || m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <article
                    key={m.id || m.slug || m.name}
                    className="group bg-mint/30 rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 soft-shadow flex flex-col border border-mint/60 hover:shadow-lg"
                  >
                    <Link
                      to={`/team-members/${profileSlug}`}
                      className="aspect-square overflow-hidden bg-sky block relative"
                    >
                      <img
                        src={m.img}
                        alt={`${m.name}, ${m.title} at Shining Stars Fostering`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-5 text-center flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-charcoal group-hover:text-blue transition-colors">
                          <Link to={`/team-members/${profileSlug}`}>{m.name}</Link>
                        </h3>
                        <p className="text-xs md:text-[13px] text-blue font-semibold mt-1 leading-snug">
                          {m.title}
                        </p>
                      </div>
                      <Link
                        to={`/team-members/${profileSlug}`}
                        className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-bold text-charcoal/60 group-hover:text-orange transition-colors"
                      >
                        View profile <ArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ClosingCta
        title="Looking to join our outstanding team?"
        text="We are always looking for passionate professionals to help make a positive difference."
      />
      <EnquirySection />
    </main>
  );
}

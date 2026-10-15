import React, { useState } from "react";
import { ChevronDown, Rss } from "lucide-react";
import { useWordPressTeam } from "@/hooks/useWordPressData";

export default function TeamSection() {
  const [expanded, setExpanded] = useState(false);
  const { team, isLive, isLoading } = useWordPressTeam();
  const visible = expanded ? team : team.slice(0, 12);

  return (
    <section id="team" className="bg-white py-20 md:py-28">
      <div className="container-ss">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="text-orange font-bold text-sm uppercase tracking-[0.2em]">
              Meet the SSFA Team
            </p>
            {isLive && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-green/10 text-green px-2.5 py-0.5 rounded-full">
                <Rss size={11} /> Live WP
              </span>
            )}
          </div>
          <h2 className="display-section text-charcoal text-balance">
            A family-feel work environment.
          </h2>
          <p className="mt-4 text-lg text-charcoal/70">
            At Shining Stars we are like a family working together towards our
            goals — supporting each other to combine individual strengths and
            create a positive working atmosphere.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-slate-100 rounded-3xl h-64" />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {visible.map((m, idx) => (
              <article
                key={m.id || m.name || idx}
                className="group bg-mint/40 rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 soft-shadow"
              >
                <div className="aspect-square overflow-hidden bg-sky">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.title} at Shining Stars Fostering`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-5 text-center">
                  <h3 className="text-lg text-charcoal">{m.name}</h3>
                  <p className="text-xs md:text-[13px] text-blue font-semibold mt-1 leading-snug">
                    {m.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {team.length > 12 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 bg-blue/10 text-blue font-bold px-6 py-3 rounded-full hover:bg-blue hover:text-white transition-colors"
              aria-expanded={expanded}
            >
              {expanded ? "Show Less" : `View All ${team.length} Team Members`}
              <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
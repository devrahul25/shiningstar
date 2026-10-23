import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin, ArrowRight, Rss } from "lucide-react";
import { useWordPressEvents } from "@/hooks/useWordPressData";

const STYLES = {
  orange: { bar: "bg-orange", chip: "bg-orange/10 text-orange border-orange/20", btn: "bg-orange hover:bg-orange/90" },
  blue: { bar: "bg-blue", chip: "bg-blue/10 text-blue border-blue/20", btn: "bg-blue hover:bg-blue/90" },
  green: { bar: "bg-green", chip: "bg-green/10 text-emerald-800 border-green/20", btn: "bg-green hover:bg-green/90" },
};

export default function EventsSection() {
  const { events, isLive, isLoading } = useWordPressEvents(6);

  return (
    <section className="bg-sky/60 py-20 md:py-28">
      <div className="container-ss">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-blue font-bold text-sm uppercase tracking-[0.2em]">
                Upcoming Events & Community
              </p>
              {isLive && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-green/10 text-emerald-800 px-2.5 py-0.5 rounded-full border border-green/20">
                  <Rss size={11} /> Live WP Events
                </span>
              )}
            </div>
            <h2 className="display-section text-charcoal text-balance">
              Join us at our next event.
            </h2>
          </div>
          <Link
            to="/events"
            className="text-blue font-bold hover:text-orange transition-colors inline-flex items-center gap-1.5 self-start md:self-auto"
          >
            All events & calendar <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white/70 rounded-3xl h-72" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {events.map((e, idx) => {
              const s = STYLES[e.color] || STYLES.blue;
              return (
                <article
                  key={e.id || e.title || idx}
                  className="group bg-white rounded-3xl overflow-hidden soft-shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col border border-slate-200/80"
                >
                  <div className={`h-2.5 ${s.bar}`} />

                  {e.image ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={e.image}
                        alt={e.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {e.categories?.[0] && (
                        <span className="absolute top-3 left-3 text-[11px] font-bold bg-white/95 backdrop-blur text-charcoal px-2.5 py-0.5 rounded-full shadow-sm">
                          {e.categories[0].name}
                        </span>
                      )}
                    </div>
                  ) : null}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${s.chip}`}>
                        <CalendarDays size={13} />
                        {e.date}
                      </span>
                      {e.cost && e.cost !== "Free" && (
                        <span className="text-xs font-bold text-charcoal/60 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {e.cost}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-display font-bold text-charcoal mt-1 line-clamp-2 group-hover:text-blue transition-colors">
                      <Link to={e.href || `/events/${e.slug}`}>{e.title}</Link>
                    </h3>

                    {e.excerpt && (
                      <p className="mt-2.5 text-sm text-charcoal/70 line-clamp-2">
                        {e.excerpt}
                      </p>
                    )}

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm text-charcoal/70">
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-charcoal/40 shrink-0" />
                        <span>{e.time}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin size={14} className="text-charcoal/40 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{e.venue}, {e.town}</span>
                      </p>
                    </div>

                    <div className="mt-6 pt-2 flex items-center gap-3">
                      <Link
                        to={e.href || `/events/${e.slug}`}
                        className={`flex-1 ${s.btn} text-white font-bold text-center px-4 py-2.5 rounded-full text-sm transition-all shadow-sm`}
                      >
                        View Details
                      </Link>
                    </div>
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
import React from "react";
import { CalendarDays, Clock, MapPin, ArrowRight, Rss } from "lucide-react";
import { useWordPressEvents } from "@/hooks/useWordPressData";

const STYLES = {
  orange: { bar: "bg-orange", chip: "bg-orange/10 text-orange", btn: "bg-orange" },
  blue: { bar: "bg-blue", chip: "bg-blue/10 text-blue", btn: "bg-blue" },
  green: { bar: "bg-green", chip: "bg-green/10 text-green", btn: "bg-green" },
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
                Upcoming Events
              </p>
              {isLive && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-green/10 text-green px-2.5 py-0.5 rounded-full">
                  <Rss size={11} /> Live WP
                </span>
              )}
            </div>
            <h2 className="display-section text-charcoal text-balance">
              Join us at our next event.
            </h2>
          </div>
          <a
            href="https://www.shiningstarsfostering.com/events/"
            className="text-blue font-bold hover:text-orange transition-colors inline-flex items-center gap-1.5"
          >
            More events <ArrowRight size={16} />
          </a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white/70 rounded-3xl h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {events.map((e, idx) => {
              const s = STYLES[e.color] || STYLES.blue;
              return (
                <article
                  key={e.id || e.title || idx}
                  className="bg-white rounded-3xl overflow-hidden soft-shadow hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                >
                  <div className={`h-2 ${s.bar}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`inline-flex self-start items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${s.chip}`}>
                      <CalendarDays size={13} />
                      {e.date}
                    </span>
                    <h3 className="text-xl text-charcoal mt-4">{e.title}</h3>
                    <div className="mt-3 space-y-2 text-sm text-charcoal/70">
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-charcoal/40" />
                        {e.time}
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin size={14} className="text-charcoal/40 mt-0.5 shrink-0" />
                        <span>{e.venue}, {e.town}</span>
                      </p>
                    </div>
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 ${s.btn} text-white font-bold text-center px-5 py-3 rounded-full hover:opacity-90 transition-opacity`}
                      aria-label={`Register for ${e.title}`}
                    >
                      Register
                    </a>
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
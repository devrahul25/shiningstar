import React from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageNotFound from "@/lib/PageNotFound";
import { useWordPressEvent, useWordPressEvents } from "@/hooks/useWordPressData";
import {
  CalendarDays,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  Loader2,
  Sparkles,
} from "lucide-react";
import EnquirySection from "@/components/site/EnquirySection";
import ClosingCta from "@/components/site/ClosingCta";

export default function SingleEvent() {
  const { slug } = useParams();
  const { event, isLoading } = useWordPressEvent(slug);
  const { allEvents } = useWordPressEvents(4);

  // Other upcoming events
  const otherEvents = allEvents?.filter((e) => e.slug !== slug).slice(0, 3) || [];

  if (isLoading) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12">
        <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
        <p className="text-charcoal/70 font-semibold text-lg">Loading event details from WordPress...</p>
      </main>
    );
  }

  if (!event) {
    return <PageNotFound />;
  }

  return (
    <main className="bg-slate-50/50">
      <SEO
        title={`${event.title} — Shining Stars Events`}
        description={event.excerpt || `Join Shining Stars Fostering Agency for ${event.title}.`}
        image={event.image || undefined}
      />

      {/* Top Breadcrumb & Header Section */}
      <section className="bg-sky/50 py-10 md:py-14 border-b border-sky/30">
        <div className="container-ss max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-6">
            <Link to="/" className="hover:text-blue transition-colors">Home</Link>
            <span>/</span>
            <Link to="/events" className="hover:text-blue transition-colors">Events & Training</Link>
            <span>/</span>
            <span className="text-charcoal truncate max-w-xs">{event.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue text-white shadow-sm">
              <CalendarDays size={13} />
              {event.date}
            </span>
            {event.categories?.[0] && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-white text-charcoal border border-slate-200">
                <Tag size={12} className="text-blue" />
                {event.categories[0].name}
              </span>
            )}
            {event.cost && event.cost !== "Free" && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-charcoal">
                Cost: {event.cost}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-charcoal tracking-tight leading-[1.15] text-balance">
            {event.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-charcoal/80 font-medium">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-orange shrink-0" />
              <span>{event.venue}, {event.town}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 md:py-16">
        <div className="container-ss max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Event Featured Image */}
              {event.image && (
                <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-white ring-4 ring-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto object-cover max-h-[460px]"
                  />
                </div>
              )}

              {/* Event Body Description */}
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-display font-bold text-charcoal">
                  About This Event
                </h2>

                {event.description ? (
                  <div
                    className="prose-clean text-charcoal/85 text-base leading-relaxed space-y-4
                      [&_p]:leading-relaxed
                      [&_strong]:text-charcoal [&_strong]:font-bold
                      [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-charcoal [&_h3]:mt-6 [&_h3]:mb-3
                      [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-charcoal [&_h4]:mt-4 [&_h4]:mb-2
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2
                      [&_li]:text-charcoal/80
                      [&_pre]:bg-slate-50 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-slate-200 [&_pre]:whitespace-normal [&_pre]:font-sans
                      [&_a]:text-blue [&_a]:font-bold hover:[&_a]:text-orange [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                ) : event.excerpt ? (
                  <p className="text-charcoal/80 text-base leading-relaxed">{event.excerpt}</p>
                ) : (
                  <p className="text-charcoal/70 text-base leading-relaxed">
                    Details for this event will be shared with registered foster carers and attendees shortly.
                  </p>
                )}

                {/* Categories Footer */}
                {event.categories?.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider mr-2">Categories:</span>
                    {event.categories.map((c) => (
                      <span
                        key={c.id || c.slug}
                        className="text-xs font-semibold bg-sky/30 text-blue px-3 py-1 rounded-full border border-sky/40"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Back Link */}
              <div>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue hover:text-orange transition-colors"
                >
                  <ArrowLeft size={16} /> Back to all events & training calendar
                </Link>
              </div>
            </div>

            {/* Right Details Sidebar */}
            <aside className="lg:col-span-5 space-y-6">
              {/* Event Metadata Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-28">
                <h3 className="text-xl font-display font-bold text-charcoal pb-4 border-b border-slate-100">
                  Event Details
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Date */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-blue/10 text-blue flex items-center justify-center shrink-0 mt-0.5">
                      <CalendarDays size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 font-bold uppercase tracking-wider">Date</p>
                      <p className="font-bold text-charcoal text-base">{event.date}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 font-bold uppercase tracking-wider">Time</p>
                      <p className="font-semibold text-charcoal">{event.time}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 font-bold uppercase tracking-wider">Location / Venue</p>
                      <p className="font-semibold text-charcoal">{event.venue}</p>
                      <p className="text-charcoal/70 text-xs mt-0.5">{event.town}</p>
                      {event.address && (
                        <p className="text-charcoal/60 text-xs mt-0.5">{event.address} {event.postcode}</p>
                      )}
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 font-bold uppercase tracking-wider">Organised By</p>
                      <p className="font-semibold text-charcoal">{event.organizer}</p>
                      {event.organizerPhone && (
                        <a
                          href={`tel:${event.organizerPhone.replace(/\s+/g, "")}`}
                          className="text-xs text-blue font-medium hover:underline block mt-0.5"
                        >
                          {event.organizerPhone}
                        </a>
                      )}
                      {event.organizerEmail && (
                        <a
                          href={`mailto:${event.organizerEmail}`}
                          className="text-xs text-blue font-medium hover:underline block"
                        >
                          {event.organizerEmail}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={`/foster-with-us#enquire`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-bold py-3.5 px-6 rounded-full text-base hover:bg-orange/90 transition-all shadow-md"
                  >
                    <span>Register / Enquire</span>
                  </Link>
                  <p className="text-center text-xs text-charcoal/60 mt-2.5">
                    Free attendance for all approved foster carers and staff.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other Events Suggestion */}
      {otherEvents.length > 0 && (
        <section className="bg-white py-16 border-t border-slate-200/80">
          <div className="container-ss max-w-5xl">
            <h3 className="text-2xl font-display font-bold text-charcoal mb-8">
              More Upcoming Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherEvents.map((oe) => (
                <div
                  key={oe.id}
                  className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-blue bg-blue/10 px-2.5 py-0.5 rounded-full">
                      {oe.date}
                    </span>
                    <h4 className="font-display font-bold text-charcoal mt-3 line-clamp-2">
                      <Link to={`/events/${oe.slug}`} className="hover:text-blue transition-colors">
                        {oe.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    to={`/events/${oe.slug}`}
                    className="mt-4 text-xs font-bold text-blue hover:text-orange inline-flex items-center gap-1"
                  >
                    View details &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta
        title="Have questions about this event?"
        text="Get in touch with our events coordinator or speak with your Supervising Social Worker."
      />
      <EnquirySection />
    </main>
  );
}

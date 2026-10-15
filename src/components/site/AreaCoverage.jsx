import React from "react";
import { MapPin, Phone } from "lucide-react";
import { LONDON_MAP, CONTACT } from "@/lib/ssfaData";

const AREAS = [
  "Croydon", "Bromley", "Sutton", "Lambeth", "Lewisham",
  "Southwark", "Greenwich", "Bexley", "Merton", "Wandsworth",
  "Kingston", "Surrey", "Kent", "Essex", "Medway",
];

export default function AreaCoverage({ onEnquire }) {
  return (
    <section className="bg-mint/50 py-20 md:py-28">
      <div className="container-ss">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-green font-bold text-sm uppercase tracking-[0.2em] mb-3">
              Area Coverage
            </p>
            <h2 className="display-section text-charcoal text-balance">
              Recruiting across London & the surrounding counties.
            </h2>
            <p className="mt-5 text-lg text-charcoal/70 leading-relaxed">
              We are currently recruiting foster carers across all the London
              boroughs and the surrounding counties. Wherever you are, our local
              team will get to know you, your family and the young people you
              look after.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1.5 bg-white text-charcoal/80 text-sm font-semibold px-3.5 py-1.5 rounded-full ring-1 ring-border"
                >
                  <MapPin size={12} className="text-blue" />
                  {a}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onEnquire}
                className="bg-orange text-white font-bold px-7 py-3.5 rounded-full hover:scale-[1.03] transition-transform shadow-lg"
                aria-label="Register your interest to foster in your area"
              >
                Foster in Your Area
              </button>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 bg-white text-charcoal font-bold px-7 py-3.5 rounded-full ring-1 ring-border hover:bg-sky transition-colors"
              >
                <Phone size={16} className="text-blue" />
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-white p-6 soft-shadow">
              <img
                src={LONDON_MAP}
                alt="Map of London boroughs and surrounding counties covered by Shining Stars Fostering"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 md:right-4 bg-blue text-white rounded-2xl px-5 py-3 soft-shadow">
              <p className="font-display font-bold text-lg leading-none">{CONTACT.shortAddress}</p>
              <p className="text-xs text-white/80 mt-1">Head Office</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
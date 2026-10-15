import React from "react";
import {
  Clock,
  GraduationCap,
  HeartHandshake,
  PoundSterling,
  Users,
  Sparkles,
} from "lucide-react";
import { WHY_CHOOSE } from "@/lib/ssfaData";

const ICONS = { Clock, GraduationCap, HeartHandshake, PoundSterling, Users, Sparkles };

const STYLES = {
  blue: { bg: "bg-blue/10", text: "text-blue", ring: "group-hover:ring-blue/30" },
  green: { bg: "bg-green/10", text: "text-green", ring: "group-hover:ring-green/30" },
  orange: { bg: "bg-orange/10", text: "text-orange", ring: "group-hover:ring-orange/30" },
  purple: { bg: "bg-purple/10", text: "text-purple", ring: "group-hover:ring-purple/30" },
};

export default function WhyChooseUs({ onEnquire }) {
  return (
    <section id="why" className="bg-mint/50 py-20 md:py-28">
      <div className="container-ss">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-green font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Why Shining Stars
          </p>
          <h2 className="display-section text-charcoal text-balance">
            Support from the minute you make contact.
          </h2>
          <p className="mt-4 text-lg text-charcoal/70">
            We give our foster carers extensive support, generous allowances and
            everything they need to help children find emotional stability and
            security.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE.map((f) => {
            const Icon = ICONS[f.icon];
            const s = STYLES[f.color];
            return (
              <article
                key={f.title}
                className={`group bg-white rounded-3xl p-7 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 soft-shadow ${s.ring}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                  <Icon size={26} className={s.text} />
                </div>
                <h3 className="text-xl text-charcoal">{f.title}</h3>
                <p className="mt-2 text-charcoal/70 leading-relaxed">{f.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onEnquire}
            className="inline-flex items-center gap-2 bg-orange text-white font-bold px-8 py-4 rounded-full hover:scale-[1.03] transition-transform shadow-lg"
            aria-label="Register your interest in fostering with Shining Stars"
          >
            Register Your Interest
          </button>
        </div>
      </div>
    </section>
  );
}
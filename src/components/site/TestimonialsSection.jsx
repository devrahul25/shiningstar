import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star, Rss } from "lucide-react";
import { useWordPressTestimonials } from "@/hooks/useWordPressData";

export default function TestimonialsSection() {
  const { testimonials, isLive } = useWordPressTestimonials();
  const [i, setI] = useState(0);
  const n = testimonials.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 7000);
    return () => clearInterval(t);
  }, [n]);

  const go = (d) => setI((p) => (p + d + n) % n);
  const t = testimonials[i] || testimonials[0];

  if (!t) return null;

  return (
    <section className="bg-gradient-to-br from-blue to-purple/80 py-20 md:py-28">
      <div className="container-ss">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="text-yellow font-bold text-sm uppercase tracking-[0.2em]">
              What Our Foster Carers Say
            </p>
            {isLive && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                <Rss size={11} /> Live WP
              </span>
            )}
          </div>
          <h2 className="display-section text-white text-balance">
            Real carers. Real stories.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 soft-shadow relative">
          <Quote size={48} className="text-yellow/40 absolute top-6 left-6" />
          <div className="relative">
            <div className="flex justify-center gap-1 mb-5">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} size={18} className="fill-yellow text-yellow" />
              ))}
            </div>
            <blockquote key={i} className="fade-up text-center text-charcoal text-lg md:text-xl italic leading-relaxed">
              {t.quote}
            </blockquote>
            <div className="mt-7 flex flex-col items-center gap-3">
              <img
                src={t.img}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-blue/15"
                loading="lazy"
              />
              <p className="font-bold text-charcoal">{t.name}</p>
              <p className="text-xs text-charcoal/50 font-semibold">Shining Stars Foster Carer</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full bg-blue/10 text-blue flex items-center justify-center hover:bg-blue hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-2.5 rounded-full transition-all ${idx === i ? "w-7 bg-blue" : "w-2.5 bg-charcoal/20"}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full bg-blue/10 text-blue flex items-center justify-center hover:bg-blue hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
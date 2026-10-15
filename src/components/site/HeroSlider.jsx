import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useWordPressHeroSlides } from "@/hooks/useWordPressData";

export default function HeroSlider({ onEnquire }) {
  const { slides } = useWordPressHeroSlides();
  const [i, setI] = useState(0);
  const n = slides.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);

  const go = (d) => setI((p) => (p + d + n) % n);
  const currentSlide = slides[i] || slides[0];

  if (!currentSlide) return null;

  return (
    <section id="top" className="relative h-[88vh] min-h-[560px] max-h-[820px] w-full overflow-hidden bg-charcoal">
      {slides.map((s, idx) => (
        <div
          key={s.id || idx}
          className={`absolute inset-0 transition-opacity ease-out ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: "1200ms" }}
          aria-hidden={idx !== i}
        >
          <img
            src={s.img}
            alt=""
            className="w-full h-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-blue/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        </div>
      ))}

      <div className="relative h-full container-ss flex items-center">
        <div className="max-w-2xl text-white">
          <span className="inline-flex items-center gap-2 bg-yellow/95 text-charcoal font-bold text-xs px-4 py-1.5 rounded-full mb-5">
            <Star size={13} className="fill-charcoal" />
            Rated Outstanding by Ofsted
          </span>
          <h1 key={i} className="display-hero fade-up text-white">
            {currentSlide.headline}
          </h1>
          <p key={`s${i}`} className="fade-up mt-5 text-lg md:text-xl text-white/90 max-w-xl">
            {currentSlide.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onEnquire}
              className="bg-orange text-white font-bold px-7 py-3.5 rounded-full hover:scale-[1.03] transition-transform shadow-lg"
              aria-label="Register your interest to become a foster carer"
            >
              Become a Foster Carer
            </button>
            <a
              href="https://www.shiningstarsfostering.com/could-you-foster-children/"
              className="bg-white/15 backdrop-blur border-2 border-white/70 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-charcoal transition-colors"
            >
              Could You Foster?
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-3">
        <button
          onClick={() => go(-1)}
          className="w-11 h-11 rounded-full bg-white/20 backdrop-blur border border-white/40 text-white flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(1)}
          className="w-11 h-11 rounded-full bg-white/20 backdrop-blur border border-white/40 text-white flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-yellow" : "w-2.5 bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
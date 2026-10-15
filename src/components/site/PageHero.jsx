import React from "react";
import { Star } from "lucide-react";

// Shorter page hero: text beside a naturally proportioned photo.
export default function PageHero({ eyebrow, title, intro, img, imgAlt, focus = "center", children }) {
  return (
    <section className="bg-sky py-12 md:py-16">
      <div className="container-ss grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 bg-yellow text-charcoal font-bold text-xs px-4 py-1.5 rounded-full mb-5">
              <Star size={13} className="fill-charcoal" />
              {eyebrow}
            </span>
          )}
          <h1 className="font-display font-black text-charcoal text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.08] tracking-tight">
            {title}
          </h1>
          {intro && <p className="mt-5 text-lg md:text-xl text-charcoal/75 max-w-xl">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        <div className="rounded-[2rem] overflow-hidden soft-shadow ring-8 ring-white aspect-[4/3] bg-white">
          <img src={img} alt={imgAlt} className="w-full h-full object-cover" style={{ objectPosition: focus }} />
        </div>
      </div>
    </section>
  );
}
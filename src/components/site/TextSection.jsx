import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import TbcNote from "@/components/site/TbcNote";

// Simple editable block: heading, paragraphs, optional image and note.
export default function TextSection({ id, bg = "bg-white", eyebrow, color, title, paragraphs = [], note, img, imgAlt, children }) {
  return (
    <section id={id} className={`${bg} py-16 md:py-24 scroll-mt-24`}>
      <div className={`container-ss grid grid-cols-1 gap-10 items-center ${img ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} color={color} />
          <div className="mt-5 space-y-4 text-lg text-charcoal/75 leading-relaxed max-w-3xl">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {children}
          {note && <TbcNote>{note}</TbcNote>}
        </div>
        {img && (
          <div className="rounded-3xl overflow-hidden soft-shadow bg-white">
            <img src={img} alt={imgAlt} className="w-full h-auto" loading="lazy" />
          </div>
        )}
      </div>
    </section>
  );
}
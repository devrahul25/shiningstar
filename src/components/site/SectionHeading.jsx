import React from "react";

const EYE = { blue: "text-blue", green: "text-green", orange: "text-orange", purple: "text-purple" };

export default function SectionHeading({ eyebrow, title, intro, color = "blue", center = false }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}>
      {eyebrow && <p className={`${EYE[color]} font-bold text-sm uppercase tracking-[0.2em] mb-3`}>{eyebrow}</p>}
      <h2 className="display-section text-charcoal text-balance">{title}</h2>
      {intro && <p className="mt-4 text-lg text-charcoal/75 leading-relaxed">{intro}</p>}
    </div>
  );
}
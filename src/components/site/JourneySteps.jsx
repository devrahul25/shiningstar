import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import TbcNote from "@/components/site/TbcNote";

const DOT = ["bg-blue", "bg-green", "bg-orange", "bg-purple", "bg-blue"];

export default function JourneySteps({ id, steps }) {
  return (
    <section id={id} className="bg-sky/60 py-16 md:py-24 scroll-mt-24">
      <div className="container-ss">
        <SectionHeading center eyebrow="Your fostering journey" color="blue" title="Five steps, with support at every one."
          intro="Every application is carefully assessed. Suitability and approval are decided through the assessment and the independent fostering panel." />
        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-white rounded-3xl p-6 soft-shadow">
              <span className={`w-11 h-11 rounded-full ${DOT[i]} text-white font-display font-black text-lg flex items-center justify-center`}>{i + 1}</span>
              <h3 className="text-lg text-charcoal mt-4">{s.title}</h3>
              <p className="mt-2 text-sm text-charcoal/75 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="text-center"><TbcNote>Typical timescales for each stage.</TbcNote></div>
      </div>
    </section>
  );
}
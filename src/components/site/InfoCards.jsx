import React from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import TbcNote from "@/components/site/TbcNote";

const TONE = {
  blue: "bg-blue/10 text-blue",
  green: "bg-green/15 text-green",
  orange: "bg-orange/10 text-orange",
  purple: "bg-purple/15 text-purple",
};
const COLS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

export default function InfoCards({ id, bg = "bg-white", eyebrow, color, title, intro, items, cols = 3, note, center = true }) {
  return (
    <section id={id} className={`${bg} py-16 md:py-24 scroll-mt-24`}>
      <div className="container-ss">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} color={color} center={center} />
        <div className={`mt-12 grid grid-cols-1 ${COLS[cols]} gap-6`}>
          {items.map(({ icon: Icon, title: t, body, color: c = "blue", href, linkLabel }) => (
            <article key={t} className="bg-white rounded-3xl p-7 soft-shadow ring-1 ring-border/60 flex flex-col">
              {Icon && (
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${TONE[c]}`}>
                  <Icon size={26} />
                </div>
              )}
              <h3 className="text-xl text-charcoal">{t}</h3>
              <p className="mt-2 text-charcoal/75 leading-relaxed flex-1">{body}</p>
              {href && (
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-bold text-orange hover:text-blue py-1">
                  {linkLabel || "Find out more"} <ArrowRight size={15} />
                </a>
              )}
            </article>
          ))}
        </div>
        {note && <div className={center ? "text-center" : ""}><TbcNote>{note}</TbcNote></div>}
      </div>
    </section>
  );
}
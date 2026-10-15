import React from "react";
import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import TbcNote from "@/components/site/TbcNote";

const BAR = { blue: "bg-blue", green: "bg-green", orange: "bg-orange", purple: "bg-purple" };

export default function ResourceGroups({ groups }) {
  return (
    <section id="resources" className="bg-sky/60 py-16 md:py-24 scroll-mt-24">
      <div className="container-ss">
        <SectionHeading center eyebrow="Helpful resources" color="purple" title="Things to read, watch and use." />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div key={g.title} className="bg-white rounded-3xl overflow-hidden soft-shadow">
              <div className={`h-2 ${BAR[g.color]}`} />
              <div className="p-6">
                <h3 className="text-xl text-charcoal">{g.title}</h3>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="block rounded-xl p-3 -mx-3 hover:bg-sky">
                        <span className="inline-flex items-center gap-1.5 font-bold text-blue">{l.label} <ExternalLink size={13} /></span>
                        <span className="block text-sm text-charcoal/70 mt-0.5">{l.desc}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center"><TbcNote>The agency should check and approve each external link before launch.</TbcNote></div>
      </div>
    </section>
  );
}
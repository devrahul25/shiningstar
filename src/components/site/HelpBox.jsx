import React from "react";
import { LifeBuoy, Phone } from "lucide-react";
import { CONTACT } from "@/lib/ssfaData";
import TbcNote from "@/components/site/TbcNote";

const LINES = [
  { label: "In danger right now? Call 999", href: "tel:999", strong: true },
  { label: "Childline (free, 24 hours): 0800 1111", href: "tel:08001111" },
  { label: "Coram Voice advocacy: 0808 800 5792", href: "tel:08088005792" },
  { label: `Shining Stars office: ${CONTACT.phone}`, href: CONTACT.phoneHref },
  { label: `Shining Stars mobile: ${CONTACT.mobile}`, href: CONTACT.mobileHref },
];

export default function HelpBox() {
  return (
    <section id="help" className="bg-white py-16 md:py-24 scroll-mt-24">
      <div className="container-ss">
        <div className="rounded-[2rem] border-4 border-orange bg-orange/10 p-7 md:p-12">
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-orange text-white flex items-center justify-center shrink-0"><LifeBuoy size={28} /></span>
            <h2 className="display-section text-charcoal">I need help</h2>
          </div>
          <p className="mt-4 text-lg text-charcoal/85 max-w-2xl">
            If you feel unsafe, scared or worried, you do not have to deal with it on your own. Tell an adult you trust, or use one of these numbers.
          </p>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {LINES.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-bold min-h-[56px] ${l.strong ? "bg-charcoal text-white text-lg" : "bg-white text-charcoal hover:bg-sky"}`}>
                  <Phone size={18} className="shrink-0" /> {l.label}
                </a>
              </li>
            ))}
          </ul>
          <TbcNote>Agency out-of-hours number for children and young people.</TbcNote>
        </div>
      </div>
    </section>
  );
}
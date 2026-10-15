import React from "react";
import { FileText } from "lucide-react";
import { OFSTED_BADGE } from "@/lib/ssfaData";
import SectionHeading from "@/components/site/SectionHeading";
import TbcNote from "@/components/site/TbcNote";

const IMG = "https://shiningstarsfostering.com/wp-content/uploads";
const LINKS = [
  { label: "Ofsted inspection report (2023)", href: `${IMG}/2023/09/Ofsted-Report-2023.pdf` },
  { label: "Previous Ofsted inspection report", href: "https://www.shiningstarsfostering.com/wp-content/uploads/2020/01/Shining-Stars-Fostering-Outstanding-Agency-Ofsted.pdf" },
  { label: "Investors in People accreditation", href: `${IMG}/2025/07/SSFA-IIP.pdf` },
  { label: "Statement of Purpose 2025–26", href: `${IMG}/2026/05/SSFA-SOP-25-26.pdf` },
];

export default function RecognitionSection() {
  return (
    <section id="recognition" className="bg-white py-16 md:py-24 scroll-mt-24">
      <div className="container-ss grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-center">
        <img src={OFSTED_BADGE} alt="Ofsted Outstanding provider badge" className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto" loading="lazy" />
        <div>
          <SectionHeading eyebrow="Recognition & inspection" color="green" title="Rated Outstanding by Ofsted."
            intro="Ofsted inspects independent fostering agencies. You can read our inspection reports and other key documents below." />
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-sky/70 rounded-2xl px-5 py-4 font-semibold text-charcoal hover:bg-blue hover:text-white transition-colors">
                  <FileText size={18} className="shrink-0" /> {l.label} <span className="sr-only">(PDF, opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <TbcNote>Confirm the latest inspection date and judgement wording against the published Ofsted report.</TbcNote>
        </div>
      </div>
    </section>
  );
}
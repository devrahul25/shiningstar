import React from "react";
import { Award, FileText, Star } from "lucide-react";
import { OFSTED_BADGE, OFSTED_QUOTE } from "@/lib/ssfaData";
import TbcNote from "@/components/site/TbcNote";

const OFSTED_REPORT = "https://shiningstarsfostering.com/wp-content/uploads/2023/09/Ofsted-Report-2023.pdf";

export default function OfstedHighlight() {
  return (
    <section className="bg-gradient-to-b from-sky to-white py-20 md:py-28">
      <div className="container-ss">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-center">
          <div className="flex justify-center lg:justify-start">
            <img
              src={OFSTED_BADGE}
              alt="Ofsted Outstanding provider badge"
              className="w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-lg"
              loading="lazy"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 bg-green/15 text-green font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wide">
              <Award size={14} />
              Ofsted inspection
            </span>
            <h2 className="display-section text-charcoal mt-5 text-balance">
              Rated <span className="text-blue">Outstanding</span> by Ofsted.
            </h2>
            <blockquote className="mt-6 border-l-4 border-orange pl-5 text-charcoal/80 italic text-lg leading-relaxed max-w-3xl">
              {OFSTED_QUOTE}
            </blockquote>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={OFSTED_REPORT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue text-white font-bold px-6 py-3 rounded-full hover:bg-blue/90 transition-colors"
                aria-label="Read the full Ofsted report (PDF)"
              >
                <FileText size={16} />
                Read Full Ofsted Report
              </a>
              <a
                href="https://www.shiningstarsfostering.com/wp-content/uploads/2020/01/Shining-Stars-Fostering-Outstanding-Agency-Ofsted.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue font-bold hover:text-orange"
              >
                <Star size={16} className="fill-yellow text-yellow" />
                Previous Ofsted report
              </a>
            </div>
            <TbcNote>Check the quote and its report year against the published Ofsted report.</TbcNote>
          </div>
        </div>
      </div>
    </section>
  );
}
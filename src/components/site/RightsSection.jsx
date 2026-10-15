import React from "react";
import { Check, FileText } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import { OUTCOMES } from "@/lib/pagesContent";

const GUIDE = "https://shiningstarsfostering.com/wp-content/uploads/2025/08/Childrens-Guide-Shining-Stars-Fostering-Agency2025.pdf";

export default function RightsSection() {
  return (
    <section id="rights" className="bg-mint/50 py-16 md:py-24 scroll-mt-24">
      <div className="container-ss grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHeading eyebrow="Your voice & rights" color="green" title="You have the right to be heard."
            intro="What you think and feel matters. You have the right to be listened to, to be safe, and to have a say in decisions about your life. We want every young person we support to:" />
          <a href={GUIDE} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-orange text-white font-bold px-6 py-3.5 rounded-full hover:bg-orange/90">
            <FileText size={18} /> Read our Children’s Guide
          </a>
        </div>
        <ul className="grid gap-3">
          {OUTCOMES.map((o) => (
            <li key={o} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 soft-shadow font-display font-bold text-lg text-charcoal">
              <span className="w-9 h-9 rounded-full bg-green text-white flex items-center justify-center shrink-0"><Check size={18} /></span>
              {o}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
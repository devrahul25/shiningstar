import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/site/SectionHeading";

export default function FaqSection({ id, faqs }) {
  return (
    <section id={id} className="bg-white py-16 md:py-24 scroll-mt-24">
      <div className="container-ss max-w-3xl">
        <SectionHeading center eyebrow="FAQs" color="purple" title="Starting the conversation." />
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`} className="bg-mint/40 rounded-2xl px-5 border-none">
              <AccordionTrigger className="text-left font-display font-bold text-lg text-charcoal hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-charcoal/75 leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
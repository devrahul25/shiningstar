import React from "react";
import { Megaphone } from "lucide-react";
import { useWordPressTicker } from "@/hooks/useWordPressData";

export default function NewsTicker() {
  const { items: tickerSource } = useWordPressTicker();
  const items = [...tickerSource, ...tickerSource];

  return (
    <div className="bg-blue text-white overflow-hidden">
      <div className="container-ss flex items-center gap-4">
        <span className="hidden sm:inline-flex items-center gap-2 bg-orange text-white font-bold text-xs px-3 py-1.5 rounded-full shrink-0 my-2">
          <Megaphone size={13} />
          Latest
        </span>
        <div className="relative flex-1 overflow-hidden py-2">
          <div className="marquee-track">
            {items.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold text-white/95 hover:text-yellow px-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow shrink-0" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
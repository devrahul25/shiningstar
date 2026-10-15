import React from "react";
import { Info } from "lucide-react";

// Editor note for Rahul / agency staff: marks content still to be approved.
export default function TbcNote({ children }) {
  return (
    <p className="mt-4 inline-flex items-start gap-2 text-xs font-semibold text-charcoal bg-yellow/40 border border-dashed border-orange/60 rounded-lg px-3 py-2">
      <Info size={14} className="shrink-0 mt-0.5" />
      <span><strong>Content to be confirmed:</strong> {children}</span>
    </p>
  );
}
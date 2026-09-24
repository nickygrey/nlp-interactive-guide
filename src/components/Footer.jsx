import React from 'react';
import { Download, BookOpen } from 'lucide-react';

export default function Footer({ onOpenDeck }) {
  return (
    <footer className="border-t border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#141618] py-12 px-4 sm:px-8 text-xs text-[#646059] dark:text-[#a6a197] transition-colors duration-200">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea]">
            <span className="text-[#b85d38] dark:text-[#d97753]">✦</span>
            <span>Natural Language Processing — An Interactive Visual Guide</span>
          </div>
          <p className="text-[11px] font-mono text-[#8c887b] dark:text-[#78716c]">
            A hands-on, 15-question journey from foundational text processing to modern large language models.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="/NLP_The_Immersive_Journey.pptx"
            download
            className="px-3.5 py-1.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8] dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
            <span>Slides (.pptx)</span>
          </a>
          <button
            onClick={onOpenDeck}
            className="px-3.5 py-1.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8] dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs flex items-center gap-1.5 transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2d4a3e] dark:text-[#4d7a66]" />
            <span>Interactive Deck</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

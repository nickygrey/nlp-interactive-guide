import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { CURRICULUM_DATA } from '../data/curriculumData';

export default function PresentationDeckModal({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentIdx(prev => (prev < CURRICULUM_DATA.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIdx(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const topic = CURRICULUM_DATA[currentIdx];

  return (
    <div className="fixed inset-0 z-50 bg-[#141618]/80 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-fadeIn">
      {/* Top Deck Nav */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2e3238] text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#e5e2da] bg-[#24272c] px-2.5 py-1 rounded border border-[#2e3238]">
            Slide {currentIdx + 1} of {CURRICULUM_DATA.length}
          </span>
          <span className="text-[#a6a197] font-mono uppercase text-[11px] hidden sm:inline">{topic.act}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/NLP_The_Immersive_Journey.pptx"
            download
            className="px-3 py-1.5 rounded-lg border border-[#2e3238] bg-[#1c1e21] text-[#f5f2ea] font-mono text-xs flex items-center gap-1.5 transition hover:bg-[#24272c]"
          >
            <Download className="w-3.5 h-3.5 text-[#d97753]" />
            <span className="hidden sm:inline">Download Keynote (.pptx)</span>
          </a>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1c1e21] border border-[#2e3238] text-[#a6a197] hover:text-[#f5f2ea] transition"
            title="Close Slide Deck (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full py-4">
        <div className="p-8 sm:p-12 bg-[#fbfaf8] dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-2xl space-y-6 text-[#1c1917] dark:text-[#f5f2ea]">
          <div className="space-y-1.5 border-b border-[#eeebe3] dark:border-[#2b2e34] pb-4">
            <span className="text-[11px] uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197] font-mono">
              Question {topic.qNum} • {topic.act}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight leading-snug">
              {topic.title}
            </h2>
            <p className="font-serif italic text-sm text-[#b85d38] dark:text-[#d97753]">
              {topic.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {/* Plain English Metaphor Card */}
            <div className="p-5 bg-white dark:bg-[#141618] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#b85d38] dark:text-[#d97753] block">
                The Simple Analogy
              </span>
              <h3 className="font-serif text-base font-medium">
                {topic.plainEnglish.metaphorName}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#44403c] dark:text-[#d6d3d1] leading-relaxed">
                {topic.plainEnglish.story.slice(0, 320)}...
              </p>
            </div>

            {/* Technical Engineering Reality Card */}
            <div className="p-5 bg-white dark:bg-[#141618] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#2d4a3e] dark:text-[#4d7a66] block">
                How It Works Under the Hood
              </span>
              <h3 className="font-serif text-base font-medium">
                {topic.technical.headline}
              </h3>
              <p className="font-sans text-xs text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
                {topic.technical.overview.slice(0, 240)}...
              </p>
              <div className="p-2.5 bg-[#f6f4ee] dark:bg-[#24272c] rounded-lg border border-[#ebe7de] dark:border-[#2e3238] font-mono text-[11px] text-[#2d4a3e] dark:text-[#76a992] break-all">
                {topic.technical.mathFormula}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Deck Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-[#2e3238] text-xs">
        <span className="text-[#a6a197] font-mono text-[11px] hidden sm:inline">Use ← and → keyboard arrows to navigate</span>
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="px-4 py-2 rounded-lg bg-[#1c1e21] border border-[#2e3238] text-[#f5f2ea] font-mono text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#24272c] transition flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
          <button
            disabled={currentIdx === CURRICULUM_DATA.length - 1}
            onClick={() => setCurrentIdx(prev => prev + 1)}
            className="px-4 py-2 rounded-lg bg-[#f5f2ea] text-[#1c1917] font-mono text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Presentation, Download, Sun, Moon, Award } from 'lucide-react';

export default function Header({ 
  personaMode, 
  setPersonaMode, 
  completedCount, 
  totalCount, 
  onOpenDeck, 
  onOpenCert,
  theme, 
  toggleTheme 
}) {
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8]/95 dark:bg-[#141618]/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] flex items-center justify-center font-serif text-sm text-[#b85d38] dark:text-[#d97753] shadow-sm select-none">
          ✦
        </div>
        <div className="flex items-center gap-3">
          <span className="font-serif text-base sm:text-lg font-medium tracking-tight text-[#1c1917] dark:text-[#f5f2ea]">
            Natural Language Processing
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197] hidden lg:inline-block border-l border-[#e5e2da] dark:border-[#2e3238] pl-3">
            An Interactive Guide
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dual-Audience Perspective Toggle */}
        <div className="flex items-center bg-[#f0ede6] dark:bg-[#202327] rounded-full p-0.5 border border-[#e5e2da] dark:border-[#2e3238] text-xs">
          <button
            onClick={() => setPersonaMode('story')}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 ${
              personaMode === 'story'
                ? 'bg-white dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                : 'text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
            }`}
            title="Focus on plain-English analogies and real-world intuition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d4a3e] dark:bg-[#4d7a66]"></span>
            <span>Plain English</span>
          </button>
          <button
            onClick={() => setPersonaMode('tech')}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 ${
              personaMode === 'tech'
                ? 'bg-white dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                : 'text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
            }`}
            title="Focus on mathematical equations and Python code"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b85d38] dark:bg-[#d97753]"></span>
            <span>Deep Tech</span>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] text-xs text-[#646059] dark:text-[#a6a197]">
          <span className="font-mono text-[11px]">Completed: {completedCount}/{totalCount}</span>
          <div className="w-10 bg-[#e5e2da] dark:bg-[#2e3238] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#2d4a3e] dark:bg-[#4d7a66] h-full transition-all duration-300" 
              style={{ width: `${pct}%` }}
            ></div>
          </div>
        </div>

        {/* PowerPoint Keynote Download */}
        <a
          href="/NLP_The_Immersive_Journey.pptx"
          download
          className="px-3 py-1.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] text-xs font-medium flex items-center gap-1.5 transition shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          title="Download the full 18-slide PowerPoint Keynote (.pptx)"
        >
          <Download className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
          <span className="hidden sm:inline">Slides (.pptx)</span>
        </a>

        {/* Slide Deck Modal */}
        <button
          onClick={onOpenDeck}
          className="px-3 py-1.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] text-xs font-medium flex items-center gap-1.5 transition shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          title="Open Presentation Mode"
        >
          <Presentation className="w-3.5 h-3.5 text-[#2d4a3e] dark:text-[#4d7a66]" />
          <span className="hidden sm:inline">Deck</span>
        </button>

        {/* Certificate & Cheat Sheet */}
        <button
          onClick={onOpenCert}
          className="px-3 py-1.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] text-xs font-medium flex items-center gap-1.5 transition shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          title="View Certificate of Completion & 1-Page Cheat Sheet"
        >
          <Award className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
          <span className="hidden sm:inline">Certificate</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea] transition"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-[#d4a759]" /> : <Moon className="w-4 h-4 text-[#646059]" />}
        </button>
      </div>
    </header>
  );
}

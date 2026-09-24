import React from 'react';
import { Check, Sparkles, FlaskConical } from 'lucide-react';

const ACTS = [
  { num: "I", title: "Foundations", range: "Q1–Q4", questions: [1, 2, 3, 4] },
  { num: "II", title: "Words & Tokens", range: "Q5–Q6", questions: [5, 6] },
  { num: "III", title: "Vector Space", range: "Q7–Q10", questions: [7, 8, 9, 10] },
  { num: "IV", title: "Meaning", range: "Q11–Q14", questions: [11, 12, 13, 14] },
  { num: "V", title: "Modern LLMs", range: "Q15", questions: [15] }
];

export default function ActRoadmap({ completedQuestions, onSelectAct, onSelectLab }) {
  return (
    <nav className="sticky top-16 z-30 bg-[#fbfaf8]/95 dark:bg-[#141618]/95 backdrop-blur-md border-b border-[#e5e2da] dark:border-[#2e3238] px-4 sm:px-6 py-2 transition-colors">
      <div className="max-w-4xl mx-auto overflow-x-auto scrollbar-none">
        <div className="min-w-[680px] bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] rounded-xl p-1 flex items-center gap-1 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {ACTS.map((act) => {
            const completedInAct = act.questions.filter((q) => completedQuestions.includes(q)).length;
            const isAllDone = completedInAct === act.questions.length;
            const pct = Math.round((completedInAct / act.questions.length) * 100);

            return (
              <button
                key={act.num}
                onClick={() => onSelectAct(act.questions[0])}
                className="flex-1 min-w-[105px] px-2.5 py-1.5 rounded-lg text-left transition hover:bg-[#f6f4ee] dark:hover:bg-[#25282d] group flex flex-col justify-between"
                title={`Jump to Part ${act.num}: ${act.title} (${act.range})`}
              >
                {/* Top line: Part & count */}
                <div className="flex items-center justify-between gap-1 w-full font-mono text-[10px] whitespace-nowrap select-none">
                  <span className="uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] group-hover:text-[#1c1917] dark:group-hover:text-[#f5f2ea] transition-colors">
                    Part {act.num}
                  </span>
                  <span className="text-[#646059] dark:text-[#a6a197]">
                    {isAllDone ? (
                      <span className="text-[#2d4a3e] dark:text-[#76a992] font-semibold flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                    ) : (
                      <span>{completedInAct}/{act.questions.length}</span>
                    )}
                  </span>
                </div>

                {/* Title */}
                <div className="font-serif text-xs font-medium text-[#1c1917] dark:text-[#f5f2ea] truncate whitespace-nowrap mt-0.5 select-none">
                  {act.title}
                </div>

                {/* Micro progress indicator */}
                <div className="w-full bg-[#eeebe3] dark:bg-[#2b2e34] h-[2px] rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#2d4a3e] dark:bg-[#4d7a66] h-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}

          {/* Hairline Divider */}
          <div className="h-7 w-[1px] bg-[#e5e2da] dark:border-[#2e3238] mx-0.5 shrink-0" />

          {/* Applied Labs Quick Jump */}
          <button
            onClick={onSelectLab}
            className="px-3 py-1.5 rounded-lg text-left transition hover:bg-[#faece6] dark:hover:bg-[#2a1e1b] group flex flex-col justify-between shrink-0"
            title="Jump directly to Applied Laboratory Suite (5 Interactive Tools)"
          >
            <div className="flex items-center justify-between gap-2 w-full font-mono text-[10px] whitespace-nowrap select-none">
              <span className="uppercase tracking-wider text-[#b85d38] dark:text-[#d97753] font-medium">
                Applied
              </span>
              <Sparkles className="w-2.5 h-2.5 text-[#b85d38] dark:text-[#d97753]" />
            </div>

            <div className="font-serif text-xs font-medium text-[#1c1917] dark:text-[#f5f2ea] whitespace-nowrap mt-0.5 select-none">
              Lab Suite
            </div>

            <div className="w-full bg-[#faece6] dark:bg-[#382723] h-[2px] rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#b85d38] dark:bg-[#d97753] h-full w-full" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

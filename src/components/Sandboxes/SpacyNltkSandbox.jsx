import React, { useState } from 'react';

export default function SpacyNltkSandbox() {
  const [activeTab, setActiveTab] = useState('spacy');

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('spacy')}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition ${
            activeTab === 'spacy'
              ? 'bg-[#1c1917] text-[#fbfaf8] dark:bg-[#f5f2ea] dark:text-[#1c1917] font-medium'
              : 'bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e]'
          }`}
        >
          spaCy (Integrated C-Pipeline)
        </button>
        <button
          onClick={() => setActiveTab('nltk')}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition ${
            activeTab === 'nltk'
              ? 'bg-[#1c1917] text-[#fbfaf8] dark:bg-[#f5f2ea] dark:text-[#1c1917] font-medium'
              : 'bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e]'
          }`}
        >
          NLTK (Academic Functional Toolchain)
        </button>
      </div>

      <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3">
        {activeTab === 'spacy' ? (
          <>
            <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
              spaCy Linear Memory Architecture:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              <span className="px-2.5 py-1 bg-[#f6f4ee] dark:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] rounded border border-[#ebe7de] dark:border-[#2e3238] font-mono text-xs">Tokenizer</span> →
              <span className="px-2.5 py-1 bg-[#f6f4ee] dark:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] rounded border border-[#ebe7de] dark:border-[#2e3238] font-mono text-xs">POS Tagger</span> →
              <span className="px-2.5 py-1 bg-[#f6f4ee] dark:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] rounded border border-[#ebe7de] dark:border-[#2e3238] font-mono text-xs">Dependency Parser</span> →
              <span className="px-2.5 py-1 bg-[#f6f4ee] dark:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] rounded border border-[#ebe7de] dark:border-[#2e3238] font-mono text-xs">Entity Recognizer</span> →
              <span className="px-2.5 py-1 bg-[#e8efe9] dark:bg-[#22352c] text-[#2d4a3e] dark:text-[#76a992] rounded border border-[#2d4a3e]/30 font-mono text-xs">Doc Pointer</span>
            </div>
            <p className="text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
              Every token in the compiled <code>Doc</code> object points to a contiguous C-struct memory address. Word strings are resolved against a global string hash table (<code>vocab.strings</code>), preventing duplicate heap allocation.
            </p>
          </>
        ) : (
          <>
            <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
              NLTK Composable Research Functions:
            </span>
            <div className="font-mono text-[11px] p-3 bg-[#fbfaf8] dark:bg-[#141618] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e] space-y-1">
              <div>tokens = word_tokenize(text)        # Step 1: list[str] in Python memory</div>
              <div>tagged = pos_tag(tokens)             # Step 2: list[tuple[str, str]]</div>
              <div>tree   = ne_chunk(tagged)            # Step 3: recursive nltk.Tree object</div>
            </div>
            <p className="text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
              NLTK operates as a collection of decoupled Python functions. You manually pass lists and tuples between standalone algorithms. Highly pedagogical and transparent, but carries Python interpreter overhead on high-throughput workloads.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

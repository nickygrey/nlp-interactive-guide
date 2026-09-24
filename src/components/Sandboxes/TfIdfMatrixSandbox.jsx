import React, { useState } from 'react';

export default function TfIdfMatrixSandbox() {
  const [doc1, setDoc1] = useState("the cat sat on the mat");
  const [doc2, setDoc2] = useState("the dog sat on the rug");
  const [doc3, setDoc3] = useState("the cat and the dog played");

  const docs = [doc1.toLowerCase(), doc2.toLowerCase(), doc3.toLowerCase()];
  const docTokens = docs.map(d => d.match(/\b[a-z]+\b/g) || []);
  const vocab = Array.from(new Set(docTokens.flat())).sort();
  const N = docs.length;

  const df = {};
  vocab.forEach(term => {
    df[term] = docTokens.filter(tokens => tokens.includes(term)).length;
  });

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="font-mono text-[11px] text-[#8c887b] dark:text-[#a6a197] uppercase tracking-wider block mb-1">
            Doc A:
          </label>
          <input
            type="text"
            value={doc1}
            onChange={(e) => setDoc1(e.target.value)}
            className="w-full p-2 bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] rounded-lg font-mono text-[#1c1917] dark:text-[#f5f2ea] text-xs focus:outline-none focus:border-[#b85d38]"
          />
        </div>
        <div>
          <label className="font-mono text-[11px] text-[#8c887b] dark:text-[#a6a197] uppercase tracking-wider block mb-1">
            Doc B:
          </label>
          <input
            type="text"
            value={doc2}
            onChange={(e) => setDoc2(e.target.value)}
            className="w-full p-2 bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] rounded-lg font-mono text-[#1c1917] dark:text-[#f5f2ea] text-xs focus:outline-none focus:border-[#b85d38]"
          />
        </div>
        <div>
          <label className="font-mono text-[11px] text-[#8c887b] dark:text-[#a6a197] uppercase tracking-wider block mb-1">
            Doc C:
          </label>
          <input
            type="text"
            value={doc3}
            onChange={(e) => setDoc3(e.target.value)}
            className="w-full p-2 bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] rounded-lg font-mono text-[#1c1917] dark:text-[#f5f2ea] text-xs focus:outline-none focus:border-[#b85d38]"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21]">
        <table className="w-full text-left">
          <thead className="bg-[#fbfaf8] dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] border-b border-[#e5e2da] dark:border-[#2e3238] font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-3">Vocabulary Term</th>
              <th className="p-3">Doc Freq (DF)</th>
              <th className="p-3 text-[#b85d38] dark:text-[#d97753]">IDF Weight</th>
              <th className="p-3 font-mono">Doc A Weight</th>
              <th className="p-3 font-mono">Doc B Weight</th>
              <th className="p-3 font-mono">Doc C Weight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eeebe3] dark:divide-[#2b2e34] text-[#44403c] dark:text-[#d6d3d1]">
            {vocab.map(term => {
              const docFreq = df[term];
              const idfVal = Math.log((N + 1) / (docFreq + 1)) + 1;

              const scores = docTokens.map(tokens => {
                const count = tokens.filter(w => w === term).length;
                const tf = tokens.length > 0 ? count / tokens.length : 0;
                return (tf * idfVal).toFixed(3);
              });

              return (
                <tr key={term} className="hover:bg-[#fbfaf8] dark:hover:bg-[#181a1d] transition">
                  <td className="p-3 font-mono font-medium text-[#1c1917] dark:text-[#f5f2ea]">"{term}"</td>
                  <td className="p-3 text-[#8c887b] dark:text-[#a6a197] font-mono text-[11px]">{docFreq} of 3 docs</td>
                  <td className="p-3 font-mono text-[#b85d38] dark:text-[#d97753] font-medium">{idfVal.toFixed(3)}</td>
                  <td className={`p-3 font-mono ${parseFloat(scores[0]) > 0 ? 'text-[#2d4a3e] dark:text-[#76a992] font-semibold' : 'text-[#a8a29e] dark:text-[#57534e]'}`}>{scores[0]}</td>
                  <td className={`p-3 font-mono ${parseFloat(scores[1]) > 0 ? 'text-[#2d4a3e] dark:text-[#76a992] font-semibold' : 'text-[#a8a29e] dark:text-[#57534e]'}`}>{scores[1]}</td>
                  <td className={`p-3 font-mono ${parseFloat(scores[2]) > 0 ? 'text-[#2d4a3e] dark:text-[#76a992] font-semibold' : 'text-[#a8a29e] dark:text-[#57534e]'}`}>{scores[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

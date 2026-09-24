import React from 'react';

const WORDS_DATA = [
  { word: "wolves", pos: "Noun (Plural)", stem: "wolv", lemma: "wolf", reason: "Stemmer chops to non-word 'wolv'. Lemmatizer resolves dictionary canonical form." },
  { word: "better", pos: "Adjective (Comparative)", stem: "better", lemma: "good", reason: "Irregular comparative form mapped to positive lemma 'good'." },
  { word: "meeting", pos: "Noun ('annual meeting')", stem: "meet", lemma: "meeting", reason: "Stemmer strips '-ing' blindly. Lemma respects nominal part of speech." },
  { word: "corpora", pos: "Noun (Plural)", stem: "corpora", lemma: "corpus", reason: "Latin irregular plural resolved through morphological vocabulary database." },
  { word: "was", pos: "Verb (Past tense)", stem: "wa", lemma: "be", reason: "Stemmer mutilates token to 'wa'. Lemmatizer links to copula infinitive 'be'." },
  { word: "flying", pos: "Verb ('birds are flying')", stem: "fli", lemma: "fly", reason: "Stemmer truncates to 'fli'. Lemmatizer maps to infinitive 'fly'." }
];

export default function MorphologySandbox() {
  return (
    <div className="space-y-4 text-xs font-sans">
      <p className="text-[#57534e] dark:text-[#a8a29e]">
        Examine how a mechanical suffix-stripping heuristic (<strong>Porter Stemmer</strong>) contrasts with a vocabulary-aware <strong>Lemmatizer</strong>:
      </p>

      <div className="overflow-x-auto rounded-xl border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21]">
        <table className="w-full text-left">
          <thead className="bg-[#fbfaf8] dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] border-b border-[#e5e2da] dark:border-[#2e3238] font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-3">Specimen</th>
              <th className="p-3">Grammatical Role</th>
              <th className="p-3 text-[#b85d38] dark:text-[#d97753]">Porter Stem</th>
              <th className="p-3 text-[#2d4a3e] dark:text-[#4d7a66]">True Lemma</th>
              <th className="p-3">Linguistic Distinction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eeebe3] dark:divide-[#2b2e34] text-[#44403c] dark:text-[#d6d3d1]">
            {WORDS_DATA.map((row, i) => (
              <tr key={i} className="hover:bg-[#fbfaf8] dark:hover:bg-[#181a1d] transition">
                <td className="p-3 font-mono font-medium text-[#1c1917] dark:text-[#f5f2ea]">{row.word}</td>
                <td className="p-3 text-[#8c887b] dark:text-[#a6a197] font-mono text-[11px]">{row.pos}</td>
                <td className="p-3 font-mono text-[#b85d38] dark:text-[#d97753]">{row.stem}</td>
                <td className="p-3 font-mono text-[#2d4a3e] dark:text-[#76a992] font-semibold">{row.lemma}</td>
                <td className="p-3 text-[11px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed">{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

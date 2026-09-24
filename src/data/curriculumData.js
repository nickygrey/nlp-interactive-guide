export const CURRICULUM_DATA = [
  {
    id: "what-is-nlp",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 1,
    chapter: "Chapter 01",
    title: "What is NLP?",
    subtitle: "Why human conversation confuses computers",
    tagline: "How machines learn to make sense of human slang, context, and messy grammar.",
    plainEnglish: {
      metaphorName: "The Conversational Maze",
      metaphorIcon: "✦",
      headline: "Computers love clean rules. Human speech is full of shortcuts and double meanings.",
      story: `Computers love predictable rules. In Python or Excel, every comma and formula has an exact, unambiguous job. If you miss a bracket, the program halts.
Human speech is completely different. It's full of humor, slang, sarcasm, and context:
If someone texts you "I saw her duck", did they watch her pet bird, or did they watch her quickly crouch down to avoid being hit?
If you say "Time flies like an arrow, but fruit flies like a banana", the word "flies" flips from an action verb to a tiny fruit insect mid-sentence!
Natural Language Processing (NLP) is the branch of AI that teaches computers to make sense of this messiness—not by writing millions of brittle if-else rules, but with smart math that understands context and probability.`,
      takeaways: [
        "Context is king: A word's meaning changes depending on who says it and what sentence it's in.",
        "Ambiguity everywhere: The exact same sentence can have two completely different meanings.",
        "Beyond spellcheck: Understanding tone, intent, and subtext is much harder than matching letters."
      ]
    },
    technical: {
      headline: "The Four Core Layers of Computational Linguistics",
      overview: "Computational linguistics breaks raw text down into four structured layers, moving from individual word parts all the way up to high-level conversational context.",
      layers: [
        { name: "1. Morphology", desc: "How words are built from smaller parts (prefixes, roots, suffixes): un-break-able." },
        { name: "2. Syntax", desc: "The grammatical structure connecting words together (Subject, Verb, Object)." },
        { name: "3. Semantics", desc: "The actual meaning of words and how combining them creates true or false statements." },
        { name: "4. Pragmatics", desc: "Real-world context. 'Can you pass the salt?' is a request to hand over the shaker, not a medical test of your arm." }
      ],
      mathFormula: "P(W) = \\prod_{i=1}^n P(w_i \\mid w_1, w_2, \\dots, w_{i-1})"
    },
    codeSnippet: `import spacy

# Load spaCy's standard English model
nlp = spacy.load("en_core_web_sm")
doc = nlp("Language carries meaning that depends entirely on context.")

# Print each word, its part of speech, and its grammatical role
for token in doc:
    print(f"{token.text:12} POS: {token.pos_:6} Role: {token.dep_:8} Links to: {token.head.text}")`,
    quiz: {
      question: "Why can't we just program a computer to understand language using simple 'if-else' rules?",
      options: [
        "Computers don't have enough memory to store an English dictionary.",
        "Human language is too ambiguous, full of idioms, and constantly changing with new slang.",
        "Human speech doesn't have any grammar at all.",
        "Programming languages can only read numbers, not words."
      ],
      correctIndex: 1,
      explanation: "Language is full of double meanings and context shifts. Writing hand-crafted if-else rules for every possible combination is practically impossible."
    },
    interactiveType: "ambiguity"
  },
  {
    id: "explore-text-data",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 2,
    chapter: "Chapter 02",
    title: "How to explore text data?",
    subtitle: "Taking inventory before you build",
    tagline: "Checking word counts, vocabulary diversity, and the strange rule of Zipf's Law.",
    plainEnglish: {
      metaphorName: "Taking Inventory",
      metaphorIcon: "✦",
      headline: "A tiny handful of common words dominate almost half of everything we write.",
      story: `Before you train any AI model, you need to know what's actually in your data: How long are your documents? Are people writing one-line tweets or ten-page legal briefs? How many unique words appear?
When you count words across any large collection of text, you'll immediately bump into a strange rule discovered by linguist George Zipf:
In almost every human language, the most common word appears roughly twice as often as the second most common, and ten times as often as the tenth!
A tiny handful of filler words (like "the", "and", "is", and "of") make up almost 50% of all the words you'll ever read.
Meanwhile, the words that actually matter (like "aspirin", "refund", or "battery") appear only a few times. Knowing this helps you filter out the noise and focus on words that carry real information.`,
      takeaways: [
        "Zipf's Law is everywhere: A few filler words take up most of the space in any dataset.",
        "Vocabulary Diversity (TTR): Measures how repetitive or diverse a text is (unique words divided by total words).",
        "Document Lengths: Knowing sentence length helps you set limits so your models don't run out of memory."
      ]
    },
    technical: {
      headline: "Exploratory Text Analysis & Statistical Distributions",
      overview: "Profiling a text dataset establishes baselines for vocabulary pruning, memory limits, and text normalization.",
      layers: [
        { name: "Type-Token Ratio (TTR)", desc: "TTR = |V| / N. The ratio of unique words (|V|) to total word count (N). High ratio = rich vocabulary." },
        { name: "Zipf's Power Law", desc: "Word frequency drops off sharply: Frequency ∝ 1 / Rank. A few words dominate; most words are rare." },
        { name: "Length Distributions", desc: "Plotting word counts per document reveals extreme outliers that could crash GPU memory." }
      ],
      mathFormula: "f(r) = \\frac{C}{r^s}, \\quad \\sum_{r=1}^{|V|} f(r) = 1, \\quad s \\approx 1.0"
    },
    codeSnippet: `import collections
import re

text = "Natural language processing helps computers read text. Machine learning models learn from text datasets."
tokens = re.findall(r"\\b[a-zA-Z]+\\b", text.lower())

counts = collections.Counter(tokens)
print("Total words:", len(tokens))
print("Unique words:", len(counts))
print("Vocabulary diversity (TTR):", f"{len(counts) / len(tokens):.2f}")
print("Top 3 most common words:", counts.most_common(3))`,
    quiz: {
      question: "What does a high Type-Token Ratio (TTR) tell you about a document?",
      options: [
        "The text is repetitive and uses the same words over and over.",
        "The text uses a rich, varied vocabulary with few repeated words.",
        "The document has many spelling mistakes.",
        "The document is written by a machine."
      ],
      correctIndex: 1,
      explanation: "A high TTR means a large percentage of the words in the document are unique, showing rich vocabulary diversity."
    },
    interactiveType: "corpus"
  },
  {
    id: "clean-normalize-text",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 3,
    chapter: "Chapter 03",
    title: "Why clean and normalize text?",
    subtitle: "Teaching computers that 'Dog' and 'dog!' are the same thing",
    tagline: "Removing HTML, stripping punctuation, and standardizing casing.",
    plainEnglish: {
      metaphorName: "Standardizing the Mess",
      metaphorIcon: "✦",
      headline: "To a computer, 'Dog', 'dog!', and 'DOG' look like three completely different words.",
      story: `Real-world text scraped from the internet is messy. It's packed with typos, random capitalization, emojis, website links, and HTML tags like <b>.
To a computer, the word "Coffee", the word "coffee.", and the word "COFFEE" have completely different binary codes. Unless you clean them, the machine treats them as three unrelated things.
Cleaning and normalizing text simply means leveling the playing field:
1. Converting everything to lowercase so capitalization doesn't cause duplicates.
2. Stripping out HTML tags, website links, and stray punctuation.
3. Removing filler words (like "the", "a", "an") if they don't add useful meaning.
This keeps your vocabulary compact and helps the model focus on what the words actually mean.`,
      takeaways: [
        "Lowercase everything: Merges words like 'Book' and 'book' so they count as the same thing.",
        "Strip the junk: Removes HTML tags and broken links that confuse models.",
        "Modern AI note: If you are using modern LLMs (like ChatGPT), don't strip punctuation! Punctuation helps modern models understand tone and sentence rhythm."
      ]
    },
    technical: {
      headline: "Text Preprocessing & Unicode Normalization",
      overview: "Preprocessing standardizes messy raw text into canonical forms, shrinking vocabulary size and eliminating noise.",
      layers: [
        { name: "Unicode Normalization", desc: "Standardizes accents and character variations (e.g., turning 'café' into standard 'cafe')." },
        { name: "Case Folding", desc: "Converting everything to lowercase, except when case matters (like distinguishing 'Apple' the company from 'apple' the fruit)." },
        { name: "Regex Cleaning", desc: "Using regular expressions to strip HTML tags (<[^>]+>), URLs, and duplicate spaces." }
      ],
      mathFormula: "\\hat{S} = \\text{RegexFilter}(\\text{NFKD}(\\text{lower}(S)))"
    },
    codeSnippet: `import re
import unicodedata

def clean_text(text: str) -> str:
    # 1. Normalize accents (café -> cafe)
    text = unicodedata.normalize('NFKD', text)
    # 2. Lowercase and remove punctuation/special characters
    text = re.sub(r"[^a-zA-Z0-9\\s]", " ", text.lower())
    # 3. Collapse multiple spaces into one
    return re.sub(r"\\s+", " ", text).strip()

raw = "<h1>Special Offer!</h1> Visit https://example.com for 50% off! :)"
print("Cleaned:", clean_text(raw))  # -> "special offer visit for 50 off"`,
    quiz: {
      question: "When should you KEEP capitalization instead of lowercasing everything?",
      options: [
        "When doing Named Entity Recognition, where you need to tell 'Apple' (the company) apart from 'apple' (the fruit).",
        "When you want to make your code run faster.",
        "When the text is in Spanish.",
        "When you have a very small dataset."
      ],
      correctIndex: 0,
      explanation: "Capital letters are a crucial clue for identifying proper nouns like people, companies, and cities."
    },
    interactiveType: "cleaning"
  },
  {
    id: "spacy-vs-nltk",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 4,
    chapter: "Chapter 04",
    title: "How to use spaCy vs. NLTK?",
    subtitle: "The research lab vs. the production factory",
    tagline: "When to use an academic toolkit (NLTK) and when to use a high-speed production engine (spaCy).",
    plainEnglish: {
      metaphorName: "The Workshop vs. The Assembly Line",
      metaphorIcon: "✦",
      headline: "One is built for studying how algorithms work; the other is built to process millions of real user requests.",
      story: `If you want to understand how linguistics works under the hood, use NLTK (Natural Language Toolkit). Created at a university, it's packed with dozens of educational tools and alternate algorithms. It's great for classrooms, but because it runs in pure Python, it's slow when processing large amounts of data.
If you need to build a real product—like parsing incoming customer support emails for an app—use spaCy.
spaCy was built for software engineers. Instead of giving you ten different ways to split a sentence, it gives you one battle-tested, lightning-fast method written in optimized C. You pass a sentence in, and in one single step, it tags parts of speech, finds names, and extracts grammar.`,
      takeaways: [
        "spaCy: Fast, memory-efficient, and opinionated. The industry standard for building real apps.",
        "NLTK: Great for learning, research, and experimenting with classic linguistics algorithms.",
        "Simple advice: Use NLTK to learn the concepts; use spaCy to build real-world software."
      ]
    },
    technical: {
      headline: "Pipeline Architecture & Performance Comparison",
      overview: "spaCy uses an integrated C-level pipeline returning a single Doc object; NLTK chains independent Python functions together.",
      layers: [
        { name: "spaCy (Cython Pipeline)", desc: "Tokens are pointers into a shared global vocabulary table. Runs at C-speed with minimal Python memory overhead." },
        { name: "NLTK (Modular Toolchain)", desc: "Passes Python lists and tuples between standalone functions: tokenize() -> pos_tag() -> ne_chunk(). Very flexible, but slower." }
      ],
      mathFormula: "\\text{Memory Overhead}(\\text{spaCy}) \\ll \\text{Memory Overhead}(\\text{NLTK})"
    },
    codeSnippet: `# --- Fast Production NLP with spaCy ---
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Ada Lovelace wrote the first computer algorithm in 1843.")

# All tags and entities are computed in a single fast pass:
for ent in doc.ents:
    print(f"Found: {ent.text:15} Type: {ent.label_}")`,
    quiz: {
      question: "Why is spaCy preferred over NLTK for high-traffic production websites?",
      options: [
        "spaCy skips grammar analysis completely.",
        "spaCy is written in Cython (C-speed) and processes text in a single memory-optimized pipeline.",
        "NLTK only supports ancient dead languages.",
        "spaCy only runs on supercomputers."
      ],
      correctIndex: 1,
      explanation: "spaCy compiles down to C through Cython, making it significantly faster and more memory-efficient than NLTK for real apps."
    },
    interactiveType: "spacy_nltk"
  },
  {
    id: "what-is-tokenization",
    act: "Act II · Linguistic Units",
    actNum: 2,
    qNum: 5,
    chapter: "Chapter 05",
    title: "What is tokenization?",
    subtitle: "Chopping sentences into bite-sized puzzle pieces",
    tagline: "Why modern AI models break text into subwords instead of whole words.",
    plainEnglish: {
      metaphorName: "Cutting Text into Lego Bricks",
      metaphorIcon: "✦",
      headline: "Computers can't read sentences as a whole—they need them sliced into manageable pieces.",
      story: `Before a computer can analyze a sentence, it has to chop it into discrete pieces called "tokens".
You might think the easiest way is to split words by spaces: one word = one token. But what happens when someone writes a typo, or uses modern slang like "unfriendable"? A word-based system crashes because it has never seen that exact combination before.
Modern AI uses a clever middle ground called Subword Tokenization (like Byte-Pair Encoding).
Common words like "the" or "cat" stay whole. But rare or long words get broken into familiar building blocks: "unbelievable" becomes "un" + "believ" + "able".
This means the computer can understand any new word or typo by assembling familiar syllables—just like snapping Lego bricks together.`,
      takeaways: [
        "Tokens are the currency of AI: Words, syllables, or punctuation marks sliced into addressable pieces.",
        "Splitting by spaces fails: New words, slang, and typos break systems that rely on whole words.",
        "Subwords solve it: Breaking rare words into common chunks (like 'un' + 'break' + 'able') means the model never gets stuck."
      ]
    },
    technical: {
      headline: "Byte-Pair Encoding (BPE) & Vocabulary Compression",
      overview: "Subword algorithms build an optimal vocabulary by starting with basic characters and repeatedly merging the most common adjacent pairs.",
      layers: [
        { name: "Character Base", desc: "Starts with single characters (or 256 byte values), ensuring no word is ever truly unknown." },
        { name: "Frequency Count", desc: "Scans the entire training corpus to find which character pairs appear next to each other most often." },
        { name: "Iterative Merge", desc: "Merges the top pairs into new tokens (e.g., 't' + 'h' -> 'th') until the vocabulary reaches its target size (e.g. 50,000 tokens)." }
      ],
      mathFormula: "\\text{Pair}^* = \\arg\\max_{(u, v)} \\text{Freq}(u, v)"
    },
    codeSnippet: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")
phrase = "Tokenization slices long words into reusable pieces."

tokens = tokenizer.tokenize(phrase)
ids = tokenizer.encode(phrase)

print("Subword tokens:", tokens)
print("Numeric IDs:", ids)`,
    quiz: {
      question: "How does a subword tokenizer (like BPE) handle a brand-new word it has never seen before?",
      options: [
        "It crashes with an error.",
        "It deletes the word from the sentence.",
        "It breaks the unfamiliar word down into smaller syllables or individual letters it already knows.",
        "It replaces the word with a random synonym."
      ],
      correctIndex: 2,
      explanation: "Because subword tokenizers know all basic letters and syllables, they can gracefully break down any new word into familiar parts."
    },
    interactiveType: "tokenizer"
  },
  {
    id: "stemming-vs-lemmatization",
    act: "Act II · Linguistic Units",
    actNum: 2,
    qNum: 6,
    chapter: "Chapter 06",
    title: "Stemming vs. Lemmatization?",
    subtitle: "The chainsaw vs. the dictionary",
    tagline: "Chopping word endings with simple rules versus looking up true grammatical roots.",
    plainEnglish: {
      metaphorName: "The Chainsaw vs. The Dictionary",
      metaphorIcon: "✦",
      headline: "Stemming chops off endings with crude rules; lemmatization checks a real dictionary.",
      story: `When someone searches for "running shoes", they also want to see results for "runner" and "runs". How do we connect these variations?
Stemming uses a crude set of rules to chop off word endings: it hacks off "-ing", "-ed", and "-s". It's super fast, but it often leaves behind butchered non-words. For example, it turns "studies" into "studi" and chops "flying" into "fli".
Lemmatization is much smarter. It looks at the sentence, figures out whether the word is a noun or a verb, and checks a real dictionary to find the true root word:
It knows that "wolves" comes from "wolf", and that "better" comes from "good".`,
      takeaways: [
        "Stemming: Quick and dirty rule-chopping. Very fast for simple search bars, but produces ugly non-words.",
        "Lemmatization: Smart dictionary lookup. Takes grammar into account to find the true root word.",
        "When to use: Use stemming when speed is all you care about; use lemmatization when real grammar and meaning matter."
      ]
    },
    technical: {
      headline: "Rule-Based Suffix Truncation vs. Morphological Lookup",
      overview: "Stemmers apply pattern-matching rules without grammatical awareness; lemmatizers use Part-of-Speech tags and vocabulary dictionaries.",
      layers: [
        { name: "Porter Stemmer", desc: "A series of sequential heuristic rules (e.g., replace 'sses' with 'ss'). Fast, but blind to word meaning." },
        { name: "Lemmatization Engine", desc: "Looks up (word, POS tag) in a morphological database (like WordNet) to find the canonical base form ('was' -> 'be')." }
      ],
      mathFormula: "\\text{Lemma}(w, \\text{POS}) = \\arg\\min_{r \\in \\mathcal{D}} \\text{MorphologicalDistance}(w, r, \\text{POS})"
    },
    codeSnippet: `from nltk.stem import PorterStemmer
import spacy

# 1. Stemming: Rough rule-based chopping
stemmer = PorterStemmer()
print("Stemming 'wolves':", stemmer.stem("wolves"))  # -> "wolv"
print("Stemming 'better':", stemmer.stem("better"))  # -> "better"

# 2. Lemmatization: Dictionary lookup with grammar context
nlp = spacy.load("en_core_web_sm")
doc = nlp("The wolves are eating better food.")
for token in doc:
    print(f"{token.text:8} -> Root: {token.lemma_:8} ({token.pos_})")`,
    quiz: {
      question: "Why does a stemmer fail to connect the word 'better' to its root word 'good'?",
      options: [
        "Because 'better' is a stopword.",
        "Because stemmers only chop off common suffixes like '-ing' and don't know irregular grammar rules.",
        "Because 'better' can't be turned into numbers.",
        "Because stemmers only work on nouns."
      ],
      correctIndex: 1,
      explanation: "Stemmers only remove suffixes. Since 'better' is an irregular form rather than an added suffix, only a dictionary-aware lemmatizer can link it to 'good'."
    },
    interactiveType: "morphology"
  },
  {
    id: "vectorize-text",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 7,
    chapter: "Chapter 07",
    title: "How to vectorize text?",
    subtitle: "Giving words GPS coordinates so math can measure distance",
    tagline: "Why we turn words into lists of numbers, and how dense coordinates work.",
    plainEnglish: {
      metaphorName: "Giving Words a GPS Coordinate",
      metaphorIcon: "✦",
      headline: "Computers can't do math on letters—they need coordinates.",
      story: `Computers are essentially glorified calculators. They can multiply millions of numbers in a millisecond, but they have no idea what the letters "h-o-p-e" mean.
To make text computable, we have to turn words into lists of numbers—called vectors.
Think of a vector like a GPS coordinate on a map. If you plot cities on a grid, you can calculate the exact distance between Stockholm and Rome.
In the exact same way, once you turn sentences into lists of numbers, you can use basic math to measure how close two sentences are in meaning.`,
      takeaways: [
        "Vectors = Lists of numbers: The only way machine learning models can process words.",
        "One-Hot encoding is wasteful: Giant lists of 50,000 zeros with a single '1' at the word's position.",
        "Dense vectors are efficient: Compact lists of numbers (like 384 numbers) where similar ideas sit close to each other."
      ]
    },
    technical: {
      headline: "Representational Approaches in Vector Space Modeling",
      overview: "Vectorization converts discrete words into real-valued vectors in multidimensional space so machine learning algorithms can compute distances.",
      layers: [
        { name: "1. One-Hot Encoding", desc: "A vector as long as the entire dictionary. All zeros except for one single '1'. High memory usage, zero semantic overlap." },
        { name: "2. Bag-of-Words Counts", desc: "Counts how many times each word appears in a document. Captures word frequency, but ignores word order." },
        { name: "3. Dense Embeddings", desc: "Compact vectors (128 to 768 dimensions) where every number represents a learned feature, and geometric distance equals similarity." }
      ],
      mathFormula: "\\mathbf{x} \\in \\mathbb{R}^d, \\quad \\text{Sparsity} = 1 - \\frac{\\|\\mathbf{x}\\|_0}{d}"
    },
    codeSnippet: `from sklearn.feature_extraction.text import CountVectorizer

corpus = [
    "Machine learning models process text.",
    "Text is converted into numerical vectors."
]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)

print("Vocabulary:", vectorizer.get_feature_names_out())
print("Vector Shape:", X.shape)
print("Doc 0 as numbers:", X.toarray()[0])`,
    quiz: {
      question: "What is the biggest problem with using One-Hot vectors to represent words?",
      options: [
        "All word vectors point in the exact same direction.",
        "Every word vector is completely perpendicular to every other word, so 'cat' and 'kitten' have zero mathematical similarity.",
        "They can only store numbers between 0 and 10.",
        "They cannot be saved on modern computers."
      ],
      correctIndex: 1,
      explanation: "One-Hot vectors treat every word as completely independent. The mathematical similarity between any two distinct words is always 0.0, hiding all semantic connections."
    },
    interactiveType: "vector_matrix"
  },
  {
    id: "bow-vs-tfidf",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 8,
    chapter: "Chapter 08",
    title: "Bag-of-Words vs. TF-IDF?",
    subtitle: "Why rare words shout and common words whisper",
    tagline: "Weighting words by how informative they are across your documents.",
    plainEnglish: {
      metaphorName: "The Highlighter Effect",
      metaphorIcon: "✦",
      headline: "Common words appear everywhere; signature words only appear when it matters.",
      story: `Bag-of-Words is the simplest way to count text: you dump all the words into a basket and tally them up. But if you analyze an article about asthma, it will tell you the top words are "the" (400 times), "and" (300 times), and "is" (200 times). That tells you nothing about the actual topic!
TF-IDF solves this with a smart two-part formula:
1. Term Frequency (TF): Counts how often a word appears in this specific article.
2. Inverse Document Frequency (IDF): Checks how common the word is across all articles in your library.
If a word appears in every single article (like "the"), its score gets knocked down to zero. But if a word appears multiple times in just one article (like "inhaler" or "bronchitis"), it gets highlighted as the signature topic.`,
      takeaways: [
        "Bag-of-Words just counts: Blind to whether a word is informative or just grammatical filler.",
        "TF-IDF adds perspective: Gives high scores to rare, important words and lowers the volume on words that appear everywhere.",
        "Great for search engines: Helps rank which articles are actually about your specific search query."
      ]
    },
    technical: {
      headline: "The Information-Theoretic Balance of TF-IDF",
      overview: "TF-IDF calculates word importance by multiplying local term frequency by the logarithmic inverse of how often the word appears across the entire dataset.",
      layers: [
        { name: "Term Frequency (TF)", desc: "TF(t, d) = Count of word t in doc d / Total words in doc d. Measures local prominence." },
        { name: "Inverse Document Frequency (IDF)", desc: "IDF(t, D) = log( Total docs / Docs containing word t ). Penalizes universally common words." }
      ],
      mathFormula: "\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\log\\left(\\frac{1 + |D|}{1 + \\text{DF}(t, D)}\\right) + 1"
    },
    codeSnippet: `from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

docs = [
    "The patient has acute asthma symptoms.",
    "The solar panel generates clean electricity.",
    "Asthma inhalers relieve breathing difficulty."
]

tfidf = TfidfVectorizer()
matrix = tfidf.fit_transform(docs)

df = pd.DataFrame(matrix.toarray(), columns=tfidf.get_feature_names_out())
print(df[["asthma", "the", "electricity"]])`,
    quiz: {
      question: "If a word appears in every single document in a 10,000-document database, what happens to its IDF score?",
      options: [
        "It explodes to infinity.",
        "It drops down to near zero, so the word doesn't dominate search results.",
        "It becomes a negative number.",
        "It doubles in value."
      ],
      correctIndex: 1,
      explanation: "Because log(10,000 / 10,000) = log(1) = 0, words that appear everywhere receive an IDF score near zero."
    },
    interactiveType: "tfidf_matrix"
  },
  {
    id: "word-embeddings",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 9,
    chapter: "Chapter 09",
    title: "What are word embeddings?",
    subtitle: "Putting words on a map where meaning equals distance",
    tagline: "Dense vector coordinates where spatial directions encode human concepts.",
    plainEnglish: {
      metaphorName: "The Neighborhood Map",
      metaphorIcon: "✦",
      headline: "Words with similar meanings live on the same street.",
      story: `Old-fashioned computer systems treated every word as an isolated island. To a basic search engine, "doctor" and "physician" had nothing in common because they don't share letters.
Word embeddings changed everything by placing words onto a shared coordinate map.
Words that are used similarly get placed close together. "Coffee", "espresso", and "tea" live in the café district; "truck", "van", and "sedan" live in the garage district.
Because these coordinates capture real concepts, you can even do math with meaning:
Vector("King") - Vector("Man") + Vector("Woman") = Vector("Queen")!
The geometry automatically preserves human relationships like gender, geography, and verb tense.`,
      takeaways: [
        "Meaning = Location: Words that mean similar things have coordinates that sit right next to each other.",
        "Vector arithmetic: The system learns concepts like gender and nationality as geometric directions.",
        "Cosine similarity: Measures the angle between two word vectors to tell how closely they are related."
      ]
    },
    technical: {
      headline: "Continuous Semantic Spaces & Angular Similarity",
      overview: "Dense embeddings map a vocabulary into continuous vector space (typically 100 to 768 dimensions), capturing semantic relationships as spatial angles.",
      layers: [
        { name: "Cosine Similarity", desc: "Measures the cosine of the angle between two vectors. Ranges from -1.0 to +1.0, independent of vector length." },
        { name: "Linear Vector Offsets", desc: "Directional offsets capture analogies: Vector(King) - Vector(Man) + Vector(Woman) ≈ Vector(Queen)." }
      ],
      mathFormula: "\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2} = \\frac{\\sum_{i=1}^d u_i v_i}{\\sqrt{\\sum_{i=1}^d u_i^2} \\sqrt{\\sum_{i=1}^d v_i^2}}"
    },
    codeSnippet: `import numpy as np

def cosine_similarity(u, v):
    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))

# Sample 3D coordinates: [Royalty, Masculine, Feminine]
v_king  = np.array([0.95,  0.88, -0.10])
v_man   = np.array([0.05,  0.92, -0.05])
v_woman = np.array([0.04, -0.08,  0.95])
v_queen = np.array([0.96, -0.12,  0.91])

# Vector math: King - Man + Woman
analogy = v_king - v_man + v_woman
print("Similarity to Queen:", f"{cosine_similarity(analogy, v_queen):.3f}")`,
    quiz: {
      question: "If two word vectors have a Cosine Similarity score of +1.0, what does that mean geometrically?",
      options: [
        "They point in the exact same direction in vector space.",
        "They are completely unrelated and perpendicular.",
        "They have opposite meanings.",
        "They have different word lengths."
      ],
      correctIndex: 0,
      explanation: "A cosine similarity of +1.0 means the angle between the two vectors is 0 degrees—they point in the exact same semantic direction."
    },
    interactiveType: "vector_universe"
  },
  {
    id: "word2vec-and-glove",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 10,
    chapter: "Chapter 10",
    title: "How to use Word2Vec/GloVe?",
    subtitle: "Learning meaning by looking at neighbors",
    tagline: "You shall know a word by the company it keeps.",
    plainEnglish: {
      metaphorName: "Guessed by Your Friends",
      metaphorIcon: "✦",
      headline: "You can understand almost any word just by looking at the words around it.",
      story: `If you read the sentence: "I drank a hot mug of ___ to wake up this morning", you don't need anyone to tell you the missing word is probably "coffee" or "tea". It's definitely not "sand" or "motor oil".
In 1957, linguist John Rupert Firth summed this up: "You shall know a word by the company it keeps."
Word2Vec learns word meanings using this exact fill-in-the-blank game across billions of sentences from Wikipedia and the web.
By constantly guessing missing words, the model nudges coordinates around until words that appear in similar situations end up right next to each other.
No human needs to label anything—the text trains itself.`,
      takeaways: [
        "Context teaches meaning: Words that share similar neighbors end up with similar coordinates.",
        "Zero human labeling: The algorithm trains itself just by reading raw text and playing fill-in-the-blank.",
        "CBOW vs. Skip-Gram: CBOW guesses the center word from its neighbors; Skip-Gram guesses the neighbors from the center word."
      ]
    },
    technical: {
      headline: "Sliding Window Architectures & Negative Sampling",
      overview: "Word2Vec trains a lightweight neural network on sliding context windows, updating vector representations via gradient descent.",
      layers: [
        { name: "Continuous Bag-of-Words (CBOW)", desc: "Takes surrounding context words as input and predicts the center word. Trains fast, great for common words." },
        { name: "Skip-Gram Architecture", desc: "Takes the center word as input and predicts its surrounding context words. Better at capturing rare words." },
        { name: "Negative Sampling", desc: "Turns a massive, slow 100,000-word probability calculation into a fast binary decision against a few random noise words." }
      ],
      mathFormula: "\\mathcal{L}_{\\text{NEG}} = \\log \\sigma(\\mathbf{v}_{w_O}'^\\top \\mathbf{v}_{w_I}) + \\sum_{i=1}^k \\mathbb{E}_{w_i \\sim P_n(w)} [\\log \\sigma(-\\mathbf{v}_{w_i}'^\\top \\mathbf{v}_{w_I})]"
    },
    codeSnippet: `import gensim.downloader as api

# Load pretrained GloVe word vectors
glove = api.load("glove-wiki-gigaword-100")

# Check similarity between words
print("Similarity(coffee, tea):", f"{glove.similarity('coffee', 'tea'):.3f}")

# Solve analogy: Paris is to France as Tokyo is to ?
analogy = glove.most_similar(positive=["france", "tokyo"], negative=["paris"], topn=1)
print("Analogy result:", analogy[0])  # -> ('japan', 0.812)`,
    quiz: {
      question: "Why was 'Negative Sampling' such an important trick for training Word2Vec?",
      options: [
        "It removes negative sentiment words from the training text.",
        "It replaces a slow calculation across 100,000 words with a fast check against a handful of random noise words.",
        "It fixes spelling mistakes automatically.",
        "It allows the model to run without a GPU."
      ],
      correctIndex: 1,
      explanation: "Calculating probabilities over a 100,000-word vocabulary at every step is too slow. Negative sampling turns it into a fast binary classification against a few random words."
    },
    interactiveType: "word2vec_window"
  },
  {
    id: "named-entity-recognition",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 11,
    chapter: "Chapter 11",
    title: "What is Named Entity Recognition? (NER)",
    subtitle: "Spotting people, companies, places, and numbers",
    tagline: "Turning unstructured paragraphs into clean database records.",
    plainEnglish: {
      metaphorName: "The Auto-Highlighter",
      metaphorIcon: "✦",
      headline: "Instantly spotting the 'who', 'what', 'where', and 'how much' in any message.",
      story: `Imagine reading an email that says:
"Satya Nadella announced that Microsoft will acquire Nuance in Seattle next Monday for $19 billion."
Your brain immediately categorizes the key facts:
- Who: Satya Nadella (Person)
- Company: Microsoft, Nuance (Organizations)
- Where: Seattle (Location)
- When: Next Monday (Date)
- How much: $19 billion (Money)
Named Entity Recognition (NER) is an automated highlighter that does this for millions of documents in seconds.
It turns messy paragraphs into neat spreadsheet columns, making it easy to search, filter, and organize information.`,
      takeaways: [
        "Extracts key facts: Pulls out people, companies, cities, dates, and currency automatically.",
        "Handles multi-word names: Knows that 'New York City' is one single location, not three separate words.",
        "Everyday applications: Powers search filters, news aggregators, resume screeners, and support bots."
      ]
    },
    technical: {
      headline: "Token Classification & The IOB2 Boundary Scheme",
      overview: "NER treats text as a sequence labeling task, assigning each token a tag that marks the beginning, continuation, or absence of an entity.",
      layers: [
        { name: "B- (Beginning)", desc: "Marks the first word of an entity (e.g. 'Satya' -> B-PERSON)." },
        { name: "I- (Inside)", desc: "Marks continuation words belonging to the same entity ('Nadella' -> I-PERSON)." },
        { name: "O (Outside)", desc: "Marks ordinary words that are not part of any named entity." }
      ],
      mathFormula: "\\hat{\\mathbf{y}} = \\arg\\max_{\\mathbf{y}} \\sum_{i=1}^n \\log P(y_i \\mid \\mathbf{x}, y_{i-1})"
    },
    codeSnippet: `import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Satya Nadella announced Microsoft acquired Nuance in Seattle for $19 billion.")

# Extract detected entities
for ent in doc.ents:
    print(f"{ent.text:20} -> {ent.label_:8} ({spacy.explain(ent.label_)})")`,
    quiz: {
      question: "In the IOB tagging system, why do we need both 'B-' (Beginning) and 'I-' (Inside) tags?",
      options: [
        "To tell British English from American English.",
        "To tell where one entity ends and another entity of the same type immediately begins (like 'John Paul').",
        "To indicate whether words are uppercase or lowercase.",
        "It is only used for backward compatibility."
      ],
      correctIndex: 1,
      explanation: "If two people are mentioned side by side (e.g., 'John Paul'), IOB tags clarify whether it's one person (B-PER, I-PER) or two separate people (B-PER, B-PER)."
    },
    interactiveType: "ner_highlighter"
  },
  {
    id: "analyze-sentiment",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 12,
    chapter: "Chapter 12",
    title: "How to analyze sentiment?",
    subtitle: "Measuring whether a customer is happy, frustrated, or neutral",
    tagline: "Scoring emotional tone and catching tricky negations like 'not bad'.",
    plainEnglish: {
      metaphorName: "The Customer Mood Meter",
      metaphorIcon: "✦",
      headline: "Detecting whether feedback is positive, negative, or neutral.",
      story: `Companies get thousands of reviews and customer support tickets every day. No human has time to read them all one by one.
Sentiment analysis scores text on a scale from negative to positive.
The tricky part is handling everyday human language. A basic program might see the word "good" and think a review is positive. But what if the customer wrote:
"The battery life is not good at all."
The single word "not" flips the whole meaning. Good sentiment models look at the entire sentence structure, catching negations, sarcasm, and mixed reviews ("great screen, terrible battery").`,
      takeaways: [
        "Beyond word counts: A single word like 'not' or 'barely' can completely flip the meaning of nearby adjectives.",
        "Tone scale: Measures feelings on a scale from -1.0 (angry or disappointed) to +1.0 (thrilled).",
        "Real-world use: Helps companies automatically route angry emails to customer support managers first."
      ]
    },
    technical: {
      headline: "Rule-Based Valence Lexicons vs. Transformer Encoders",
      overview: "Sentiment analysis spans from lightweight lexicon rules with negation detection (like VADER) to fine-tuned contextual Transformer models.",
      layers: [
        { name: "Lexicon Rules (VADER)", desc: "Uses a dictionary of pre-scored words with rules that amplify exclamation marks and flip scores after words like 'not'." },
        { name: "Machine Learning Classifiers", desc: "TF-IDF n-grams combined with Logistic Regression trained on labeled review datasets." },
        { name: "Transformer Models", desc: "Pretrained models (like RoBERTa) that read full sentence context to catch subtle irony and mixed feelings." }
      ],
      mathFormula: "\\text{Valence} = \\frac{x}{\\sqrt{x^2 + \\alpha}}, \\quad x = \\sum_{i} v_i \\cdot w_{\\text{neg}}"
    },
    codeSnippet: `from transformers import pipeline

# Load a pretrained sentiment analysis pipeline
classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

reviews = [
    "The battery longevity is exceptional and the display is gorgeous.",
    "Customer service was rude and completely unhelpful.",
    "The product was not bad, but distinctly overpriced."
]

for res, text in zip(classifier(reviews), reviews):
    print(f"[{res['label']:8}] ({res['score']:.1%}): {text}")`,
    quiz: {
      question: "Why does simple keyword counting fail on the sentence: 'The food was not at all bad'?",
      options: [
        "Because 'food' is a noun.",
        "Because it sees the word 'bad' and marks it negative, missing the fact that 'not at all' turns it into a positive comment.",
        "Because sentiment analysis only works on tweets.",
        "Because the sentence is too short."
      ],
      correctIndex: 1,
      explanation: "Without looking at context, keyword counters evaluate words in isolation and misinterpret negated negatives as negative reviews."
    },
    interactiveType: "sentiment_gauge"
  },
  {
    id: "topic-modeling",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 13,
    chapter: "Chapter 13",
    title: "What is topic modeling?",
    subtitle: "Discovering main themes in 10,000 articles without reading them",
    tagline: "Unsupervised thematic discovery across large document collections.",
    plainEnglish: {
      metaphorName: "The Automatic Filing Cabinet",
      metaphorIcon: "✦",
      headline: "Sorting fifty thousand articles into themes without any human labeling.",
      story: `Imagine you're handed 50,000 customer survey responses or news articles with no labels. How do you find out what people are talking about without reading them all?
Topic modeling scans all the text and automatically discovers the hidden themes.
It works by grouping words that frequently appear together:
- Group 1: "flight", "delay", "luggage", "ticket" -> Clearly about Airline Travel.
- Group 2: "hotel", "room", "clean", "breakfast" -> Clearly about Hotel Stays.
An article can belong to multiple themes at once—for example, 70% Travel and 30% Finance.`,
      takeaways: [
        "Zero human labeling: You don't have to define categories in advance; the math finds them for you.",
        "Mixture of themes: An article can be 60% technology and 40% business.",
        "Saves hundreds of hours: Gives you an instant high-level summary of giant document collections."
      ]
    },
    technical: {
      headline: "Latent Dirichlet Allocation (LDA) & Bayesian Topic Mixtures",
      overview: "LDA models each document as a probability distribution over hidden topics, where each topic is a probability distribution over words.",
      layers: [
        { name: "Document-Topic Distribution (θ)", desc: "How much each document talks about each topic (e.g. Doc 1 is 80% Tech, 20% Health)." },
        { name: "Topic-Word Distribution (φ)", desc: "Which words define each topic (e.g. 'doctor' and 'hospital' define Health)." },
        { name: "Gibbs Sampling", desc: "The algorithm iteratively guesses which topic generated each word until the overall patterns stabilize." }
      ],
      mathFormula: "P(\\mathbf{W}, \\mathbf{Z}, \\boldsymbol{\\theta}, \\boldsymbol{\\phi}) = \\prod_{d=1}^M P(\\theta_d \\mid \\alpha) \\prod_{n=1}^{N_d} P(z_{dn} \\mid \\theta_d) P(w_{dn} \\mid \\phi_{z_{dn}})"
    },
    codeSnippet: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

articles = [
    "Astronomers discovered a new planet orbiting a distant star.",
    "Central banks raised interest rates to combat inflation.",
    "Telescopes captured images of a supernova explosion.",
    "Stock markets rallied after positive earnings reports."
]

vectorizer = CountVectorizer(stop_words='english')
X = vectorizer.fit_transform(articles)

lda = LatentDirichletAllocation(n_components=2, random_state=42)
lda.fit(X)

words = vectorizer.get_feature_names_out()
for i, topic in enumerate(lda.components_):
    top_words = [words[idx] for idx in topic.argsort()[:-4:-1]]
    print(f"Topic {i+1}:", ", ".join(top_words))`,
    quiz: {
      question: "In Latent Dirichlet Allocation (LDA), can a single document discuss multiple topics?",
      options: [
        "No, LDA strictly forces every document into exactly one topic.",
        "Yes, every document is modeled as a mixture of multiple topics (e.g. 70% Space, 30% Finance).",
        "Only if the document has fewer than 100 words.",
        "No, topics are mutually exclusive."
      ],
      correctIndex: 1,
      explanation: "Yes! A core assumption of LDA is that documents are blends of several topics in different proportions."
    },
    interactiveType: "lda_topic"
  },
  {
    id: "build-text-classifier",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 14,
    chapter: "Chapter 14",
    title: "How to build a text classifier?",
    subtitle: "Sorting messages into buckets, and the danger of 99% accuracy",
    tagline: "Supervised categorization, training models, and balancing Precision vs. Recall.",
    plainEnglish: {
      metaphorName: "The Spam Filter Dilemma",
      metaphorIcon: "✦",
      headline: "Why an AI that brags about 99% accuracy might actually be broken.",
      story: `Text classification is the workhorse of NLP: it takes an incoming message and drops it into the right folder—like sorting emails into "Inbox" or "Spam".
When evaluating a classifier, there is a dangerous trap called the Accuracy Paradox:
Imagine 99% of your emails are normal messages, and only 1% is spam. A broken model that does literally nothing and marks EVERY email as normal will claim to be 99% accurate! But it completely failed its only real job.
That's why engineers look at two specific numbers:
1. Precision: When the model sounds the alarm ("SPAM!"), is it actually spam? (Avoids deleting your boss's email).
2. Recall: Out of all the real spam that came in, how much did it catch?`,
      takeaways: [
        "Accuracy is a trap: If one category is rare (like fraud or rare diseases), raw accuracy lies to you.",
        "Precision vs. Recall: The eternal trade-off between avoiding false alarms and catching every bad item.",
        "F1-Score: A single balanced score that ensures your model is good at both."
      ]
    },
    technical: {
      headline: "The Supervised Pipeline & Precision-Recall Dynamics",
      overview: "Supervised text classification maps text feature vectors into discrete categories, evaluated using harmonic precision and recall metrics.",
      layers: [
        { name: "Feature Extraction", desc: "Raw Text -> Cleaning -> Tokenization -> TF-IDF or Embedding Vectorization." },
        { name: "Model Training", desc: "Training a Logistic Regression, Support Vector Machine, or fine-tuned Transformer on labeled examples." },
        { name: "F1-Score", desc: "The harmonic mean of Precision and Recall. Prevents models from cheating on imbalanced data." }
      ],
      mathFormula: "F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\text{TP}}{2 \\text{TP} + \\text{FP} + \\text{FN}}"
    },
    codeSnippet: `from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# 1. Training data
messages = [
    "Claim your free $1,000 cash prize now! Call urgently.",
    "Hey Sarah, are we still meeting for lunch at 1pm?",
    "Winner! You have won a free gift card today.",
    "Can you review the attached budget spreadsheet before tomorrow?"
]
labels = ["spam", "ham", "spam", "ham"]

# 2. Build and train pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("clf", LogisticRegression())
])
model.fit(messages, labels)

# 3. Test on new incoming message
new_msg = ["Urgent: Claim your free gift now!"]
print("Prediction:", model.predict(new_msg)[0])`,
    quiz: {
      question: "When building an AI to detect a rare disease (occurring in 1 out of 1,000 patients), which metric is most important to make sure sick people are not missed?",
      options: [
        "Raw Accuracy",
        "Recall (Sensitivity)",
        "Document Length",
        "Vocabulary Size"
      ],
      correctIndex: 1,
      explanation: "High Recall ensures that real positive cases (sick patients) are caught by the model rather than being mistakenly told they are healthy."
    },
    interactiveType: "classifier"
  },
  {
    id: "whats-next-in-nlp",
    act: "Act V · The Frontier",
    actNum: 5,
    qNum: 15,
    chapter: "Chapter 15",
    title: "What's next in NLP?",
    subtitle: "From word counters to reasoning models and AI agents",
    tagline: "The Transformer revolution, multi-head self-attention, and autonomous reasoning agents.",
    plainEnglish: {
      metaphorName: "From Calculator to Thinking Partner",
      metaphorIcon: "✦",
      headline: "How Transformers and Self-Attention unlocked modern reasoning AI.",
      story: `For decades, NLP models read sentences like a human reading through a tiny straw: one word at a time, from left to right. By the end of a long paragraph, the model had already forgotten what happened at the start.
In 2017, the Transformer architecture introduced Self-Attention.
Instead of reading sequentially, a Transformer looks at every word in the sentence at the exact same time. It draws connecting threads between related ideas—instantly knowing which person a pronoun like "they" refers to.
This single breakthrough enabled models like ChatGPT, Claude, and Gemini.
Today, NLP has moved beyond simple text matching. Modern models can reason through complex logic puzzles, write code, use web browsers, and act as autonomous digital coworkers.`,
      takeaways: [
        "Self-Attention: Looks at all words at once to understand deep context and long-range connections.",
        "Reasoning and thinking: Modern models pause and check their own logic before giving an answer.",
        "Autonomous Agents: NLP models don't just generate text anymore—they can use tools, browse the web, and run code."
      ]
    },
    technical: {
      headline: "Scaled Dot-Product Attention & Frontier Horizons",
      overview: "The Transformer architecture (Vaswani et al. 2017) replaced sequential recurrent networks with parallelized multi-head self-attention.",
      layers: [
        { name: "1. Self-Attention Mechanics", desc: "Attention(Q, K, V) = softmax( (QK^T) / sqrt(d_k) ) V. Allows every token to weigh its relevance against every other token." },
        { name: "2. Test-Time Reasoning", desc: "Allocating extra compute at inference time to generate hidden chains of logic and verification before answering." },
        { name: "3. Tool Use & Agents", desc: "Grounding models in external tools: running Python scripts, querying databases, and executing browser tasks." },
        { name: "4. Multimodal Fusion", desc: "Unifying text, audio, images, and video into a shared continuous token stream." }
      ],
      mathFormula: "\\text{Attention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q} \\mathbf{K}^T}{\\sqrt{d_k}}\\right) \\mathbf{V}"
    },
    codeSnippet: `# Modern NLP: Zero-shot reasoning with modern models
from transformers import pipeline

generator = pipeline("text-generation", model="meta-llama/Llama-3.2-1B-Instruct")

prompt = """Explain why the word 'it' refers to 'animal' in:
'The animal didn't cross the street because it was too tired.'"""

output = generator(prompt, max_new_tokens=100)
print(output[0]['generated_text'])`,
    quiz: {
      question: "What major advantage did the Transformer architecture have over older Recurrent Neural Networks (RNNs)?",
      options: [
        "Transformers process words one-by-one in strict chronological order.",
        "Self-Attention processes all words in a sentence simultaneously in parallel, speeding up training on massive GPU clusters.",
        "Transformers do not use any numbers or vectors.",
        "Transformers don't need any training data."
      ],
      correctIndex: 1,
      explanation: "By eliminating sequential step-by-step reading, Transformers enabled massive parallel training across thousands of GPUs on trillions of words."
    },
    interactiveType: "transformer_attention"
  }
];

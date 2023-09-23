export const normalizedLanguage = [
  "C",
  "C++",
  "C#",
  "D",
  "Go",
  "Haskell",
  "Java",
  "Kotlin",
  "OCaml",
  "Delphi",
  "FPC",
  "PascalABC.NET",
  "Perl",
  "PHP",
  "Python",
  "PyPy",
  "Ruby",
  "Rust",
  "Scala",
  "JavaScript",
  "Node.js",
  "Tcl",
  "Io",
  "Pike",
  "Befungi",
  "Cobol",
  "Factor",
  "Roco",
  "Ada",
  "Picat",
  "Q#",
  "J",
  "Text",
  "Mysterious Language",
  "Other",
] as const;

export type NormalizedLanguage = (typeof normalizedLanguage)[number];
export type LanguageDetector = {
  [key in NormalizedLanguage]: (lang: string) => boolean;
};

const languageDetector: LanguageDetector = {
  C: (lang: string) => lang.includes("gnu c11"),
  "C++": (lang: string) => {
    const Cplusplus = ["clang++", "c++"] as const;
    return Cplusplus.some((elem) => lang.includes(elem));
  },
  "C#": (lang: string) => lang.includes("c#"),
  D: (lang: string) => lang === "D" && lang.length === 1,
  Go: (lang: string) => lang.includes("go"),
  Haskell: (lang: string) => lang.includes("haskell"),
  Java: (lang: string) => lang.includes("java") && !lang.includes("javascript"),
  Kotlin: (lang: string) => lang.includes("kotlin"),
  OCaml: (lang: string) => lang.includes("ocaml"),
  Delphi: (lang: string) => lang.includes("delphi"),
  FPC: (lang: string) => lang.includes("fpc"),
  "PascalABC.NET": (lang: string) => lang.includes("pascalabc.net"),
  Perl: (lang: string) => lang.includes("perl"),
  PHP: (lang: string) => lang.includes("php"),
  Python: (lang: string) => lang.includes("python"),
  PyPy: (lang: string) => lang.includes("pypy"),
  Ruby: (lang: string) => lang.includes("ruby"),
  Rust: (lang: string) => lang.includes("rust"),
  Scala: (lang: string) => lang.includes("scala"),
  JavaScript: (lang: string) => lang.includes("javascript"),
  "Node.js": (lang: string) => lang.includes("node.js"),
  Tcl: (lang: string) => lang.includes("tcl"),
  Io: (lang: string) => lang.includes("io") && lang.length === 2,
  Pike: (lang: string) => lang.includes("pike"),
  Befungi: (lang: string) => lang.includes("befunge"),
  Cobol: (lang: string) => lang.includes("cobol"),
  Factor: (lang: string) => lang.includes("factor"),
  Roco: (lang: string) => lang.includes("roco"),
  Ada: (lang: string) => lang.includes("ada"),
  Picat: (lang: string) => lang.includes("picat"),
  "Q#": (lang: string) => lang.includes("q#"),
  J: (lang: string) => lang.includes("j") && lang.length === 1,
  Text: (lang: string) => lang.includes("text"),
  "Mysterious Language": (lang: string) => lang.includes("mysterious"),
  Other: (_: string) => true, // eslint-disable-line @typescript-eslint/no-unused-vars
};

export const normalizeLanguage = (lang: string): NormalizedLanguage => {
  const lowerCasedLanguage = lang.toLowerCase();
  for (const normalized of normalizedLanguage) {
    if (languageDetector[normalized](lowerCasedLanguage)) {
      return normalized;
    }
  }
  return "Other";
};

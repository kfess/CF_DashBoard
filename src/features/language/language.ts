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

export type NormalizedLanguage = typeof normalizedLanguage[number];

export const normalizeLanguage = (language: string): NormalizedLanguage => {
  return isC(language)
    ? "C"
    : isCplusplus(language)
    ? "C++"
    : isCsharp(language)
    ? "C#"
    : isD(language)
    ? "D"
    : isGo(language)
    ? "Go"
    : isHaskell(language)
    ? "Haskell"
    : isJava(language)
    ? "Java"
    : isKotlin(language)
    ? "Kotlin"
    : isOCaml(language)
    ? "OCaml"
    : isDelphi(language)
    ? "Delphi"
    : isFPC(language)
    ? "FPC"
    : isPascalABCNet(language)
    ? "PascalABC.NET"
    : isPerl(language)
    ? "Perl"
    : isPHP(language)
    ? "PHP"
    : isPython(language)
    ? "Python"
    : isPyPy(language)
    ? "PyPy"
    : isRuby(language)
    ? "Ruby"
    : isRust(language)
    ? "Rust"
    : isScala(language)
    ? "Scala"
    : isJavascript(language)
    ? "JavaScript"
    : isNodejs(language)
    ? "Node.js"
    : isTcl(language)
    ? "Tcl"
    : isIo(language)
    ? "Io"
    : isPike(language)
    ? "Pike"
    : isBefunge(language)
    ? "Befungi"
    : isCobol(language)
    ? "Cobol"
    : isFactor(language)
    ? "Factor"
    : isRoco(language)
    ? "Roco"
    : isAda(language)
    ? "Ada"
    : isPicat(language)
    ? "Picat"
    : isQsharp(language)
    ? "Q#"
    : isJ(language)
    ? "J"
    : isText(language)
    ? "Text"
    : isMysterious(language)
    ? "Mysterious Language"
    : "Other";
};

const isC = (language: string) => {
  return language.toLowerCase().includes("gnu c11");
};

const isCplusplus = (language: string) => {
  const Cplusplus = ["clang++", "c++"] as const;
  return Cplusplus.some((elem) => language.toLowerCase().includes(elem));
};

const isCsharp = (language: string) => {
  return language.toLowerCase().includes("c#");
};

const isD = (language: string) => {
  return language.toLowerCase() === "d" && language.length === 1;
};

const isGo = (language: string) => {
  return language.toLowerCase().includes("go");
};

const isHaskell = (language: string) => {
  return language.toLowerCase().includes("haskell");
};

const isJava = (language: string) => {
  return (
    language.toLowerCase().includes("java") &&
    !language.toLowerCase().includes("javascript")
  );
};

const isKotlin = (language: string) => {
  return language.toLowerCase().includes("kotlin");
};

const isOCaml = (language: string) => {
  return language.toLowerCase().includes("ocaml");
};

const isDelphi = (language: string) => {
  return language.toLowerCase().includes("delphi");
};

/** Free Pascal Compiler */
const isFPC = (language: string) => {
  return language.toLowerCase().includes("fpc");
};

const isPascalABCNet = (language: string) => {
  return language.toLowerCase().includes("pascalabc.net");
};

const isPerl = (language: string) => {
  return language.toLowerCase().includes("perl");
};

const isPHP = (language: string) => {
  return language.toLowerCase().includes("php");
};

const isPython = (language: string) => {
  return language.toLowerCase().includes("python");
};

const isPyPy = (language: string) => {
  return language.toLowerCase().includes("pypy");
};

const isRuby = (language: string) => {
  return language.toLowerCase().includes("ruby");
};

const isRust = (language: string) => {
  return language.toLowerCase().includes("rust");
};

const isScala = (language: string) => {
  return language.toLowerCase().includes("scala");
};

const isJavascript = (language: string) => {
  return language.toLowerCase().includes("javascript");
};

const isNodejs = (language: string) => {
  return language.toLowerCase().includes("node.js");
};

const isTcl = (language: string) => {
  return language.toLowerCase().includes("tcl");
};

const isIo = (language: string) => {
  return language.toLowerCase().includes("io") && language.length === 2;
};

const isPike = (language: string) => {
  return language.toLowerCase().includes("pike");
};

const isBefunge = (language: string) => {
  return language.toLowerCase().includes("befunge");
};

const isCobol = (language: string) => {
  return language.toLowerCase().includes("cobol");
};

const isFactor = (language: string) => {
  return language.toLowerCase().includes("factor");
};

const isRoco = (language: string) => {
  return language.toLowerCase().includes("roco");
};

const isAda = (language: string) => {
  return language.toLowerCase().includes("ada");
};

const isPicat = (language: string) => {
  return language.toLowerCase().includes("picat");
};

const isJ = (language: string) => {
  return language.toLowerCase().includes("j") && language.length === 1;
};

const isQsharp = (language: string) => {
  return language.toLowerCase().includes("q#");
};

const isText = (language: string) => {
  return language.toLowerCase().includes("text");
};

const isMysterious = (language: string) => {
  return language.toLowerCase().includes("mysterious");
};

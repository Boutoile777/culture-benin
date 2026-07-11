export type Difficulty = "facile" | "intermediaire" | "expert";

export const DIFFICULTY_LEVELS: { value: Difficulty; label: string; short: string }[] = [
  { value: "facile", label: "Facile", short: "F" },
  { value: "intermediaire", label: "Intermédiaire", short: "I" },
  { value: "expert", label: "Difficile", short: "D" },
];

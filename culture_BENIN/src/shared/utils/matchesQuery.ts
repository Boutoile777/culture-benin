// Normalisation minuscules + suppression des accents, pour que « fete »
// trouve « Fête de la Gaani » et « porte » trouve « Porte du Non-Retour ».
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Vrai si l'un des champs contient la requête (insensible casse/accents). */
export function matchesQuery(
  query: string,
  ...fields: (string | undefined)[]
): boolean {
  const normalized = normalize(query.trim());
  if (!normalized) return true;
  return fields.some((field) => field && normalize(field).includes(normalized));
}

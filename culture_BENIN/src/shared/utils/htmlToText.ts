// Le back-office saisit body/origin/description en HTML riche ; le front
// affiche ces champs en texte brut (blocs `whitespace-pre-line`). On convertit
// donc le HTML en texte, en préservant les sauts de paragraphes.
export function htmlToText(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

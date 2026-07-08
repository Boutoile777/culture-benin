const WIKIMEDIA_FILE_PATH = "https://commons.wikimedia.org/wiki/Special:FilePath/";

export function wikimediaImage(fileName: string, width = 1200): string {
  return `${WIKIMEDIA_FILE_PATH}${encodeURIComponent(fileName)}?width=${width}`;
}

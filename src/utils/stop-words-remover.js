export function stopWordRemovers(text) {
  const regex = new RegExp("\\b(" + stopWords.join("|") + ")\\b\\s*", "gi");
  const filteredText = text.replace(regex, "");
 

  return filteredText;
}

const stopWords = [
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "for",
  "nor",
  "on",
  "at",
  "to",
  "from",
  "by",
  "so",
  "yet",
  "am",
  "are",
  "among",
  "as",
  "has",
  "had",
  "do",
  "did",
  "got"
];

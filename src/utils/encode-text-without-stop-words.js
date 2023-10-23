import { stopWordRemovers } from "./stop-words-remover";
import { tokenizer } from "./tokenizer";

export function encodeTextWithoutStopWords(text) {
  const filterText = stopWordRemovers(text);
  return tokenizer(filterText);
}

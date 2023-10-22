import { stopWordRemovers } from "./stop-words-remover";
import { tokenizer } from "./tokenizer";

export function encodeTextWithoutStopWords(text, selectedEncoding) {
  const filterText = stopWordRemovers(text);
  const encodeTokens = tokenizer(filterText, selectedEncoding);

  return encodeTokens;
}

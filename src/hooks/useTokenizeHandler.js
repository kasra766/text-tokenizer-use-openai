import { useState } from "react";
import {
  encodeTextWithoutStopWords,
  stopWordRemovers,
  tokenizer,
  spaceRemover,
} from "../utils";

export function useTokenizeHandler(ref) {
  const [textWithoutStopWords, setTextWithoutStopWords] = useState("");
  const [encodeTokens, setEncodedTokens] = useState({
    encode: null,
    encodeModel: "",
  });
  const [encodeWithoutStopWords, setEncodeTextWithoutStopWords] = useState({
    encodeFilterText: null,
    encodedModelsFilterText: "",
  });

  function onsubmitHandler(e) {
    e.preventDefault();
    const text = ref.current.value;
    const filterText = spaceRemover(text);
    tokenizeHandler(filterText);
  }

  function tokenizeHandler(text) {
    //bpe

    const { encode, encodeModel } = tokenizer(text);
    setEncodedTokens({ encode, encodeModel });
    setTextWithoutStopWords(stopWordRemovers(text));
    const { encode: encodeFilterText, encodeModel: encodedModelsFilterText } =
      encodeTextWithoutStopWords(text);
    setEncodeTextWithoutStopWords({
      encodeFilterText,
      encodedModelsFilterText,
    });
  }
  return {
    onsubmitHandler,
    textWithoutStopWords,
    encodeWithoutStopWords,
    ...encodeTokens,
    ...encodeWithoutStopWords,
  };
}

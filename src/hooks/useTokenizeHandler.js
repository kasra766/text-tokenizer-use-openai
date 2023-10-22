import { useState } from "react";
import {
  encodeTextWithoutStopWords,
  stopWordRemovers,
  tokenizer,
} from "../util";

export function useTokenizeHandler(ref) {
  const [textWithoutStopWords, setTextWithoutStopWords] = useState("");
  const [encodeTokens, setEncodedTokens] = useState(null);
  const [encodeWithoutStopWords, setEncodeTextWithoutStopWords] =
    useState(null);
  const [selectedEncoding, setSelectEncoding] = useState("cl100k_base");

  // handle select encode
  const handleChange = (e) => {
    setSelectEncoding(e.target.value);
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const text = ref.current.value;

    //bpe
    const encodeTokensBpe = tokenizer(text, selectedEncoding);

    setEncodedTokens(encodeTokensBpe);

    setTextWithoutStopWords(stopWordRemovers(text));

    const encodeAfterRemoveStopWords = encodeTextWithoutStopWords(
      text,
      selectedEncoding
    );
    setEncodeTextWithoutStopWords(encodeAfterRemoveStopWords);
  };

  return {
    handleChange,
    onsubmitHandler,
    textWithoutStopWords,
    encodeTokens,
    encodeWithoutStopWords,
    setSelectEncoding,
    selectedEncoding,
  };
}

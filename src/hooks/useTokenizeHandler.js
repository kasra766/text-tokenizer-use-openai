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

  // handle select encode type
  const handleChange = (e) => {
    const text = ref.current.value;
    setSelectEncoding(e.target.value);
    tokenizeHandler(text, e.target.value);
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const text = ref.current.value;
    tokenizeHandler(text, selectedEncoding);
  };

  const tokenizeHandler = (text, encodingType) => {
    //bpe
    const encodeTokensBpe = tokenizer(text, encodingType);
    setEncodedTokens(encodeTokensBpe);
    setTextWithoutStopWords(stopWordRemovers(text));
    const encodeAfterRemoveStopWords = encodeTextWithoutStopWords(
      text,
      encodingType
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

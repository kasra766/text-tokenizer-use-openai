import { useState } from "react";
import {
  encodeTextWithoutStopWords,
  stopWordRemovers,
  tokenizer,
  spaceRemover,
} from "../util";

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
  // const [selectedEncoding, setSelectEncoding] = useState("cl100k_base");

  // handle select encode type
  // const handleChange = (e) => {
  //   const text = ref.current.value;
  //   setSelectEncoding(e.target.value);
  //   tokenizeHandler(text, e.target.value);
  // };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const text = ref.current.value;
    const filterText = spaceRemover(text);
    tokenizeHandler(filterText);
  };

  const tokenizeHandler = (text) => {
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
  };
  return {
    // handleChange,
    onsubmitHandler,
    textWithoutStopWords,
    encodeWithoutStopWords,
    // selectedEncoding,
    ...encodeTokens,
    ...encodeWithoutStopWords,
  };
}

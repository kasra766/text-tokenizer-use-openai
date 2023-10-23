import { forwardRef } from "react";
import { useTokenizeHandler } from "../hooks/useTokenizeHandler";

export const TokenizeInput = forwardRef(function (props, ref) {
  const {
    onsubmitHandler,
    textWithoutStopWords,
    encode: encodeTokensBpe,
    encodeModel,
    encodeFilterText,
    encodedModelsFilterText,
  } = useTokenizeHandler(ref);

  return (
    <form onSubmit={onsubmitHandler}>
      <textarea
        cols={50}
        rows={10}
        placeholder="write your text"
        type="text"
        ref={ref}
      />
      {encodeTokensBpe && (
        <>
          <p>encodedTokens BPE: {JSON.stringify(encodeTokensBpe)}</p>
          <p>Number of tokens: "{encodeTokensBpe.length}"</p>
          <p>encodeModel: {encodeModel}</p>
        </>
      )}

      {encodeFilterText && (
        <>
          <p>text without stop words: "{textWithoutStopWords}"</p>
          <p>
            encodedTokens without stop words BPE:{" "}
            {JSON.stringify(encodeFilterText)}
          </p>

          <p>Number of tokens: "{encodeFilterText.length}"</p>
          <p>encodeModel: {encodedModelsFilterText}</p>
        </>
      )}
      <button type="submit" style={{ display: "block", margin: "10px auto" }}>
        tokenize
      </button>
    </form>
  );
});

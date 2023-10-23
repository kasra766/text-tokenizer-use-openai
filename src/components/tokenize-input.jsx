import { forwardRef } from "react";
import { useTokenizeHandler } from "../hooks/useTokenizeHandler";

export const TokenizeInput = forwardRef(function (props, ref) {
  const {
    // handleChange,
    onsubmitHandler,
    textWithoutStopWords,
    // selectedEncoding,
    encode: encodeTokensBpe,
    encodeModel,
    encodeFilterText,
    encodedModelsFilterText,
  } = useTokenizeHandler(ref);

  // const selectEncoding = (
  //   <div>
  //     <label htmlFor="encoding-select">Encoding:</label>&nbsp;
  //     <select
  //       id="encoding-select"
  //       value={selectedEncoding}
  //       onChange={handleChange}
  //     >
  //       <option value="cl100k_base">
  //         cl100k_base (GPT-3.5-turbo and GPT-4)
  //       </option>
  //       <option value="p50k_base">p50k_base</option>
  //       <option value="p50k_edit">p50k_edit</option>
  //       <option value="r50k_base">r50k_base</option>
  //     </select>
  //   </div>
  // );

  return (
    <form onSubmit={onsubmitHandler}>
      {/* {selectEncoding} */}
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

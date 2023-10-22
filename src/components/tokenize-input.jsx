import { forwardRef } from "react";
import { useHandlers } from "../hooks/useHandlers";

export const TokenizeInput = forwardRef(function (props, ref) {
  const {
    handleChange,
    onsubmitHandler,
    textWithoutStopWords,
    encodeTokens: encodeTokensBpe,
    encodeWithoutStopWords,
    selectedEncoding,
  } = useHandlers(ref);

  const selectEncoding = (
    <div>
      <label htmlFor="encoding-select">Encoding:</label>&nbsp;
      <select
        id="encoding-select"
        value={selectedEncoding}
        onChange={handleChange}
      >
        <option value="cl100k_base">
          cl100k_base (GPT-3.5-turbo and GPT-4)
        </option>
        <option value="p50k_base">p50k_base</option>
        <option value="p50k_edit">p50k_edit</option>
        <option value="r50k_base">r50k_base</option>
      </select>
    </div>
  );

  return (
    <form onSubmit={onsubmitHandler}>
      {selectEncoding}
      <textarea cols={50} rows={10} placeholder="write you text" type="text" ref={ref} />
      {encodeTokensBpe && (
        <>
          <p>encodedTokens BPE: {JSON.stringify(encodeTokensBpe)}</p>
          <p>Number of tokens: "{encodeTokensBpe.length}"</p>
        </>
      )}

      {encodeWithoutStopWords && (
        <>
          <p>text without stop words: "{textWithoutStopWords}"</p>
          <p>
            encodedTokens without stop words BPE:{" "}
            {JSON.stringify(encodeWithoutStopWords)}
          </p>

          <p>Number of tokens: "{encodeWithoutStopWords.length}"</p>
        </>
      )}
      <button type="submit" style={{ display: "block", margin: "10px auto" }}>
        submit
      </button>
    </form>
  );
});

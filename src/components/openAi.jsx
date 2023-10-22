import { forwardRef } from "react";
import { useOpenAiHandler } from "../hooks/useOpenAIHandler";

export const OpenAi = forwardRef(function (props, ref) {
  const { data, loading, handleSubmit, handleSubmitStream } =
    useOpenAiHandler(ref);

  return (
    <div>
      <button type="button" onClick={handleSubmit} disabled={loading}>
        fetch response form openAi
      </button>
      <button type="button" onClick={handleSubmitStream} disabled={loading}>
        fetch stream response form openAi
      </button>
      {loading ? <p>loading...</p> : <p>{data}</p>}
    </div>
  );
});

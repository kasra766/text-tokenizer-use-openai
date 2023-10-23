import { forwardRef } from "react";
import { useOpenAiHandler } from "../hooks/useOpenAIHandler";

export const OpenAi = forwardRef(function (props, ref) {
  const { data, loading, handleSubmit, abortRequest } = useOpenAiHandler(ref);

  return (
    <div>
      <button type="button" onClick={handleSubmit} disabled={loading}>
        fetch response form openAi
      </button>

      {loading ? (
        <>
          <p>loading...</p>
          <button onClick={abortRequest}>cancel</button>
        </>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
});

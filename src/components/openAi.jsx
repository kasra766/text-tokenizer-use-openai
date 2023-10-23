import { forwardRef } from "react";
import { useOpenAiHandler } from "../hooks/useOpenAIHandler";

export const OpenAi = forwardRef(function (props, ref) {
  const { data, loading, error, handleSubmit, abortRequest } =
    useOpenAiHandler(ref);

  if (error)
    return (
      <div>
        <p>somethings wrong</p>
        <button onClick={handleSubmit}>refetch</button>
      </div>
    );

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

import { forwardRef } from "react";
import { useOpenAiHandler } from "../hooks/useOpenAIHandler";


export const OpenAi = forwardRef(function (props, ref) {
  const [data, handleSubmit] = useOpenAiHandler(ref);

  return (
    <div>
      <h3>chatGpt answer:</h3>
      <button type="button" onClick={handleSubmit}>send to chatGpt</button>
      <p>{data}</p>
    </div>
  );
});

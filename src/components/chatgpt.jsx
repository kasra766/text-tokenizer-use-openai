import { forwardRef } from "react";
import { useChatGptHandler } from "../hooks/useChatGptHandler";


export const ChatGpt = forwardRef(function (props, ref) {
  const [data, handleSubmit] = useChatGptHandler(ref);

  return (
    <div>
      <h3>chatGpt answer:</h3>
      <button type="button" onClick={handleSubmit}>send to chatGpt</button>
      <p>{data}</p>
    </div>
  );
});

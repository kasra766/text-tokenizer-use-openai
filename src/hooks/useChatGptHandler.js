import OpenAI from "openai";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const openAi = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});
export function useChatGptHandler(ref) {
  const [data, setData] = useState(null);

  async function handleSubmit() {
    const prompt = ref.current.value;
    if (ref.current.value === "") return;

    console.log(API_KEY);
    try {
      const response = await openAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        messages: [{ role: "user", content: prompt }],
      });

      console.log(response.choices);
      ref.current.value = "";
    } catch (err) {
      console.error(err);
    }
  }

  return [data, handleSubmit];
}

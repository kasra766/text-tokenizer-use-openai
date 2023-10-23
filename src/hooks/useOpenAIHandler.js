import OpenAI from "openai";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const openAi = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});
export function useOpenAiHandler(ref) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit() {
    const prompt = ref.current.value;
    if (ref.current.value === "") {
      ref.current.focus();
      return;
    }

    try {
      setLoading(true);
      const response = await openAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        messages: [{ role: "user", content: prompt }],
        n: 2,
        stop: "\n",
      });
      console.log(response);
      setData(response.choices[0].message.content);
      ref.current.value = "";
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitStream() {
    const prompt = ref.current.value;
    if (ref.current.value === "") {
      ref.current.focus();
      return;
    }
    setData("");
    try {
      setLoading(true);
      const response = await openAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        messages: [{ role: "user", content: prompt }],
        n: 1,
        stop: "\n",
        stream: true,
      });
      setLoading(false);
      for await (const part of response) {
        console.log(part);
        setData((prev) => `${prev}${part.choices[0]?.delta?.content || ""}`);
      }
      ref.current.value = "";
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  return { data, loading, handleSubmit, handleSubmitStream };
}


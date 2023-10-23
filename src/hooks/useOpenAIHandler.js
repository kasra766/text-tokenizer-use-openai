import { useEffect, useState } from "react";
import { fetchSSE } from "../services/api/fetch-sse";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const AI_URL = import.meta.env.VITE_AI_URL;

export function useOpenAiHandler(ref) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    return () => {
      abortRequest();
    };
  }, []);

  function abortRequest() {
    controller.abort();
    setLoading(false);
  }
  function onError(err) {
    console.error(err);
    setError(true);
  }
  function onMessage(data) {
    setLoading(false);

    if (data !== "[DONE]") {
      const parseData = JSON.parse(data);
      setData((prev) => `${prev}${parseData.choices[0]?.delta?.content || ""}`);
    }
  }

  async function handleSubmit() {
    const prompt = ref.current.value;
    if (ref.current.value === "") {
      ref.current.focus();
      return;
    }

    const bodyOfFetchSSE = {
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      messages: [{ role: "user", content: prompt }],
      n: 1,
      stop: "\n",
      stream: true,
    };
    const fetchOption = {
      onError,
      onMessage,
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(bodyOfFetchSSE),
    };

    try {
      setError(false);
      setData("");
      setLoading(true);
      await fetchSSE(AI_URL, fetchOption);
      ref.current.value = "";
    } catch (err) {
      console.error(err);
    }
  }

  return { data, loading, error, handleSubmit, abortRequest };
}

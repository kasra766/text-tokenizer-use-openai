import { useEffect, useState } from "react";
import { fetchSSE } from "../services/api/fetch-sse";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const AI_URL = import.meta.env.VITE_AI_URL;

export function useOpenAiHandler(ref) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [stop, setStop] = useState(false);
  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    return () => {
      abortRequest();
    };
  }, []);

  function abortRequest() {
    controller.abort();
  }
  function onError(err) {
    throw new Error(err);
  }
  function onMessage(data) {
    setLoading(false);
    if (!stop) {
      const parseData = JSON.parse(data);
      setData((prev) => `${prev}${parseData.choices[0]?.delta?.content || ""}`);
      if (parseData.finish_reason === "stop") {
        setStop(true);
      }
    }
  }

  async function handleSubmit() {
    const prompt = ref.current.value;
    if (ref.current.value === "") {
      ref.current.focus();
      return;
    }
    setData("");
    setStop(false);
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
      setLoading(true);
      await fetchSSE(AI_URL, fetchOption);
    } catch (err) {
      console.error(err);
    }
  }

  return { data, loading, handleSubmit, abortRequest };
}

import { get_encoding } from "tiktoken";

const enc = {
  cl100k_base: get_encoding("cl100k_base"),
  p50k_base: get_encoding("p50k_base"),
  r50k_base: get_encoding("r50k_base"),
  p50k_edit: get_encoding("p50k_edit"),
};
export function tokenizer(text, type) {
  const encodingType = enc[type];
  const encode = encodingType.encode(text);

  return encode;
}

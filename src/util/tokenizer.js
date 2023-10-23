import { get_encoding } from "tiktoken";

export const enc = {
  cl100k_base: get_encoding("cl100k_base"),
  p50k_base: get_encoding("p50k_base"),
  r50k_base: get_encoding("r50k_base"),
  p50k_edit: get_encoding("p50k_edit"),
};
export function tokenizer(text) {
  const encodeTypes = Object.keys(enc);
console.log(encodeTypes);
  const encodedModels = encodeTypes.reduce((prev, cur) => {
    const encodingType = enc[cur];
    const encode = encodingType.encode(text);
    prev[cur] = encode;

    return prev;
  }, {});

  const maxTokenEncode = encodeTypes.reduce((prev, cur) => {
    console.log(prev,encodedModels[prev].length);
    console.log(cur,encodedModels[cur].length);
    return encodedModels[prev].length >= encodedModels[cur].length ? prev : cur;
  });
  console.log(encodedModels);
  // console.log(maxTokenEncode);
  // console.log(encodedModels[maxTokenEncode]);
  return { encode: encodedModels[maxTokenEncode], encodeModel: maxTokenEncode };
}

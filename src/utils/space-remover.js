export function spaceRemover(text) {
  const spaceRemoverReg =/\s{2,}/g;
  const removeStartAndEndSpace = text.trim()
  const removeMiddleSpace = removeStartAndEndSpace.replace(spaceRemoverReg, " ");

  return removeMiddleSpace;
}

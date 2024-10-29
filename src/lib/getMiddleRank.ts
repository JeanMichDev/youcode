const CONTROL_VALUE = "a";
const padWithControlValue = (length: number) =>
  Array.from({ length }).fill(CONTROL_VALUE).join("");
const getNextChar = (char: string, step: number) =>
  String.fromCharCode(char.charCodeAt(0) + step);

const findIndexToChange = (upItemRank: string, downItemRank: string) => {
  let index = 0;
  while (upItemRank[index] === downItemRank[index]) {
    index++;
  }
  return index;
};

export const getMiddleRank = (upItemRank?: string, downItemRank?: string) => {
  if (!upItemRank && downItemRank) {
    return getNextChar(downItemRank[0], -1) + downItemRank.slice(1);
  }
  if (upItemRank && !downItemRank) {
    return getNextChar(upItemRank[0], 1) + upItemRank.slice(1);
  }
  if (!upItemRank || !downItemRank) {
    const value = padWithControlValue(9).split("");
    value[4] = getNextChar(CONTROL_VALUE, 1);
    return value.join("");
  }
  let indexToChange = findIndexToChange(upItemRank, downItemRank);
  if (
    getNextChar(upItemRank[indexToChange], 1) === downItemRank[indexToChange]
  ) {
    indexToChange++;
  }
  const nextChar = getNextChar(upItemRank[indexToChange], 1);
  return (
    upItemRank.slice(0, indexToChange) +
    nextChar +
    upItemRank.slice(indexToChange + 1).replace(/./g, CONTROL_VALUE)
  );
};

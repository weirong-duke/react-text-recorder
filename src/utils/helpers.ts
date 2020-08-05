export const stringSplice = (string, index, count, add) => {
  return string.slice(0, index) + (add || "") + (index >= 0 ? string.slice(index + count) : '');
};

export function toWords(camelCase: string) {
  if (camelCase === null)
    return null;

  return camelCase.replace(/([A-Z]+)/g, " $1").trim();
}

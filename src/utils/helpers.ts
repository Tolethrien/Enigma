export const NameToUpper = (name: string) => {
  if (name.length === 0) return "";
  return name.at(0)?.toUpperCase() + name.slice(1);
};

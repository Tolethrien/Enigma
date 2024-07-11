export const NameToUpper = (name: string) => {
  if (name.length === 0) return "";
  return name.at(0)?.toUpperCase() + name.slice(1);
};
export function assertion(value: any, msg?: string): asserts value {
  if (!value) {
    throw new Error(msg ?? "Assertion Failder");
  }
}
export const saveBadge = (badge: string) => {
  if (!badge) return;
  const downloadImage = document.createElement("a");
  document.body.appendChild(downloadImage);
  downloadImage.setAttribute("download", "enigma-badge");
  downloadImage.href = badge;
  downloadImage.click();
  downloadImage.remove();
};

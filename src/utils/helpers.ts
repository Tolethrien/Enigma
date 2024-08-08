export const NameToUpper = (name: string) => {
  if (name.length === 0) return "";
  return name.at(0)?.toUpperCase() + name.slice(1);
};
export function assertion(value: any, msg?: string): asserts value {
  if (!value) {
    throw new Error(msg ?? "Assertion Failder");
  }
}
/**
 * @description saves badge on a device by symulating user click in an ankor
 */
export const saveBadge = (badge: string) => {
  if (!badge) return;
  const downloadImage = document.createElement("a");
  document.body.appendChild(downloadImage);
  downloadImage.setAttribute("download", "enigma-badge");
  downloadImage.href = badge;
  downloadImage.click();
  downloadImage.remove();
};
export const getLocalStorage = () =>
  typeof window === "undefined" ? undefined : localStorage;
export const getSessionStorage = () =>
  typeof window === "undefined" ? undefined : sessionStorage;

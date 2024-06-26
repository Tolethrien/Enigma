import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { Tables } from "@/types/database";
function haveCreds() {
  if (sessionStorage.getItem("enigmaKey") && sessionStorage.getItem("enigmaIv"))
    return true;
  return false;
}
export function generateCreds() {
  const key = randomBytes(32).toString("hex");
  const iv = randomBytes(16).toString("hex");
  return { key, iv };
}
function cipher(text: string) {
  if (!haveCreds()) return text;
  const cipher = createCipheriv(
    "aes256",
    Buffer.from(sessionStorage.getItem("enigmaKey")!, "hex"),
    Buffer.from(sessionStorage.getItem("enigmaIv")!, "hex"),
  );
  return cipher.update(text, "utf-8", "hex") + cipher.final("hex");
}
function decipher(text: string) {
  if (!haveCreds()) return text;
  const decipher = createDecipheriv(
    "aes256",
    Buffer.from(sessionStorage.getItem("enigmaKey")!, "hex"),
    Buffer.from(sessionStorage.getItem("enigmaIv")!, "hex"),
  );
  return decipher.update(text, "hex", "utf-8") + decipher.final("utf-8");
}
export function cryptAddCardData({
  card_name,
  login,
  password,
  link,
  notes,
  at_folder,
  is_password,
}: Omit<Tables<"Cards">, "id" | "user_id" | "created_at" | "favorite">) {
  return {
    card_name: cipher(card_name),
    login: cipher(login),
    password: cipher(password),
    link: link ? cipher(link) : undefined,
    notes: notes ? cipher(notes) : undefined,
    at_folder,
    is_password,
  };
}
export function cryptEditCardData({
  card_name,
  login,
  password,
  link,
  notes,
  at_folder,
  is_password,
  id,
}: Omit<Tables<"Cards">, "user_id" | "created_at" | "favorite">) {
  return {
    card_name: cipher(card_name),
    login: cipher(login),
    password: cipher(password),
    link: link ? cipher(link) : undefined,
    notes: notes ? cipher(notes) : undefined,
    at_folder,
    is_password,
    id,
  };
}
export function decryptCardData({
  card_name,
  login,
  password,
  link,
  notes,
  at_folder,
  created_at,
  favorite,
  id,
  is_password,
  user_id,
}: Tables<"Cards">) {
  return {
    at_folder,
    created_at,
    favorite,
    id,
    is_password,
    user_id,
    card_name: decipher(card_name),
    login: decipher(login),
    password: decipher(password),
    link: link ? decipher(link) : undefined,
    notes: notes ? decipher(notes) : undefined,
  };
}
export function cryptAddFolderData({
  custome_sort_order,
  folder_name,
  hashtag,
  icon_name,
}: Omit<Tables<"Folder">, "id" | "user_id">) {
  return {
    custome_sort_order,
    folder_name: cipher(folder_name),
    hashtag: cipher(hashtag),
    icon_name: cipher(icon_name),
  };
}
export function cryptEditFolderData({
  folder_name,
  hashtag,
  icon_name,
  id,
}: Omit<Tables<"Folder">, "user_id" | "custome_sort_order">) {
  return {
    folder_name: cipher(folder_name),
    hashtag: cipher(hashtag),
    icon_name: cipher(icon_name),
    id,
  };
}
export function decryptFolderData({
  custome_sort_order,
  folder_name,
  hashtag,
  icon_name,
  id,
}: Omit<Tables<"Folder">, "user_id">) {
  return {
    custome_sort_order,
    id,
    folder_name: decipher(folder_name),
    hashtag: decipher(hashtag),
    icon_name: decipher(icon_name),
  };
}
export function decryptAllFolderData(data: Tables<"Folder">[]) {
  const decodedData: Omit<Tables<"Folder">, "user_id">[] = [];
  data.forEach((folder) => {
    decodedData.push({
      custome_sort_order: folder.custome_sort_order,
      id: folder.id,
      folder_name: decipher(folder.folder_name),
      hashtag: decipher(folder.hashtag),
      icon_name: decipher(folder.icon_name),
    });
  });
  return decodedData;
}

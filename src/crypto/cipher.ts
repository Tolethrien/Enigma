import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { Tables } from "@/types/database";
import { getSessionStorage } from "@/utils/helpers";

type CipherType = "addCard" | "editCard" | "AddFolder" | "editFolder";
interface UseCipher {
  addCard: Omit<Tables<"Cards">, "id" | "user_id" | "created_at" | "favorite">;
  editCard: Omit<Tables<"Cards">, "user_id" | "created_at" | "favorite">;
  AddFolder: Omit<Tables<"Folder">, "id" | "user_id" | "custome_sort_order">;
  editFolder: Omit<Tables<"Folder">, "user_id" | "custome_sort_order">;
}

type DecipherType = "card" | "folder";
interface UseDecipher {
  card: Tables<"Cards">;
  folder: Omit<Tables<"Folder">, "user_id">;
}

export function cipherData<T extends CipherType>(type: T, data: UseCipher[T]) {
  if (type === "addCard" || type === "editCard") {
    const {
      at_folder,
      card_name,
      id,
      is_password,
      link,
      login,
      notes,
      password,
    } = data as UseCipher["editCard"];
    return {
      card_name: cipher(card_name),
      login: cipher(login),
      password: cipher(password),
      link: link ? cipher(link) : undefined,
      notes: notes ? cipher(notes) : undefined,
      at_folder,
      is_password,
      id: id ?? NaN,
    } as UseCipher[T];
  } else {
    const { folder_name, hashtag, icon_name, id } =
      data as UseCipher["editFolder"];
    return {
      folder_name: cipher(folder_name),
      hashtag: cipher(hashtag),
      icon_name: cipher(icon_name),
      id: id ?? NaN,
    } as UseCipher[T];
  }
}
export function decipherData<T extends DecipherType>(
  type: T,
  data: UseDecipher[T],
) {
  if (type === "card") {
    const {
      at_folder,
      card_name,
      id,
      is_password,
      link,
      login,
      notes,
      password,
      created_at,
      favorite,
      user_id,
    } = data as UseDecipher["card"];
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
    } as UseDecipher[T];
  } else {
    const { folder_name, hashtag, icon_name, id, custome_sort_order } =
      data as UseDecipher["folder"];
    return {
      custome_sort_order,
      id,
      folder_name: decipher(folder_name),
      hashtag: decipher(hashtag),
      icon_name: decipher(icon_name),
    } as UseDecipher[T];
  }
}
export function haveCreds() {
  const session = getSessionStorage();
  if (session?.getItem("enigmaKey") && session?.getItem("enigmaIv"))
    return true;
  return false;
}
export function generateCreds() {
  const key = randomBytes(32).toString("hex");
  const iv = randomBytes(16).toString("hex");
  return { key, iv };
}
export function cipher(text: string) {
  if (!haveCreds()) return text;
  const cipher = createCipheriv(
    "aes256",
    Buffer.from(sessionStorage.getItem("enigmaKey")!, "hex"),
    Buffer.from(sessionStorage.getItem("enigmaIv")!, "hex"),
  );
  //TODO: nie pozwol tego robic jak nie masz odkodowanych wiadomosci
  return cipher.update(text, "utf-8", "hex") + cipher.final("hex");
}
export function decipher(text: string) {
  if (!haveCreds()) return text;
  const decipher = createDecipheriv(
    "aes256",
    Buffer.from(sessionStorage.getItem("enigmaKey")!, "hex"),
    Buffer.from(sessionStorage.getItem("enigmaIv")!, "hex"),
  );
  try {
    return decipher.update(text, "hex", "utf-8") + decipher.final("utf-8");
  } catch {
    return text;
  }
}

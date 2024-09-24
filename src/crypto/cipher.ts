import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { Tables } from "@/types/database";
import { getSessionStorage } from "@/utils/helpers";
import { DEMO_KEY, DEMO_IV } from "./demo";
// THIS IS DEMO VERSION, WILL USE HARDCODED KEY AND IV

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
/**
 * @description encrypts user data using AES-256 so that it can be sent to the server securely.
 */
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
/**
 * @description decrypts user data using AES-256 to display it in a readable format.
 */
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
/**
 * @description checks if the cryptographic key and IV are present in sessionStorage and can be used for encryption/decryption.
 */
export function haveCreds() {
  //harcoded creeds, always true
  return true;
  // const session = getSessionStorage();
  // if (session?.getItem("enigmaKey") && session?.getItem("enigmaIv"))
  //   return true;
  // return false;
}
/**
 * @description generates a random 32-bit cryptographic key and a random 16-bit IV, then returns them as hexadecimal strings.
 */
export function generateCreds() {
  const key = randomBytes(32).toString("hex");
  const iv = randomBytes(16).toString("hex");
  return { key, iv };
}
/**
 * @description main encryption function takes the key and IV stored in the Badge and uses them to encrypt messages.
 */
export function cipher(text: string) {
  if (!haveCreds()) return text;
  const session = getSessionStorage();
  if (!session) return;
  const cipher = createCipheriv(
    "aes256",
    Buffer.from(DEMO_KEY, "hex"),
    Buffer.from(DEMO_IV, "hex"),
  );
  //TODO: nie pozwol tego robic jak nie masz odkodowanych wiadomosci
  return cipher.update(text, "utf-8", "hex") + cipher.final("hex");
}
/**
 * @description main decryption function takes the key and IV stored in the Badge and uses them to decrypt messages.
 */
export function decipher(text: string) {
  if (!haveCreds()) return text;
  const session = getSessionStorage();
  if (!session) return;
  const decipher = createDecipheriv(
    "aes256",
    Buffer.from(DEMO_KEY, "hex"),
    Buffer.from(DEMO_IV, "hex"),
  );
  try {
    return decipher.update(text, "hex", "utf-8") + decipher.final("utf-8");
  } catch {
    return text;
  }
}

import { generateCreds } from "@/crypto/cipher";
import { expect, test } from "vitest";
test("generateCrred returns key and iv", () => {
  const creds = generateCreds();

  expect(creds).toBeTypeOf("object");
  expect(creds).toHaveProperty("key");
  expect(creds).toHaveProperty("iv");
  expect(creds.iv).toBeTypeOf("string");
  expect(creds.key).toBeTypeOf("string");
  expect(creds.key.length).toBe(64);
  expect(creds.iv.length).toBe(32);
});

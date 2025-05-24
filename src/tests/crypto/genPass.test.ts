import { generateStrongPassword } from "@/crypto/generatePassword";
import { expect, test } from "vitest";
test("generate strong Password", () => {
  const password = generateStrongPassword();
  const passwordArr = Array.from(password);
  const special = "!@#$%^&*";
  const numbers = "0123456789";
  const haveChars = (charList: string, expected: number) => {
    const list = passwordArr.filter((char) => charList.includes(char)).length;
    expect(list).toBeGreaterThanOrEqual(expected);
  };
  expect(password).toBeTypeOf("string");
  expect(password.length).toBe(14);
  expect(password.length).toBe(14);
  haveChars(special, 3);
  haveChars(numbers, 3);
});

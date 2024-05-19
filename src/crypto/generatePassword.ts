export const generateStrongPassword = () =>
  shuffle(getChars() + getNumbers() + getSpecial());

const getChars = () => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let chars = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    chars += charset.charAt(randomIndex);
  }
  return chars;
};
const getNumbers = () => {
  const numbers = "0123456789";
  let nums = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    nums += numbers.charAt(randomIndex);
  }
  return nums;
};
const getSpecial = () => {
  const special = "!@#$%^&*";
  let spec = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * special.length);
    spec += special.charAt(randomIndex);
  }
  return spec;
};

const shuffle = (pass: string) => {
  const shuff = Array.from(pass)
    .map((value) => ({ value, sort: Math.random() * pass.length }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuff.join("");
};

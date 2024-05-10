import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primeBG: "#282C34",
        iconColor: "#272D38",
      },
      boxShadow: {
        iconShadow: "0 0 5px 1px rgba(255,255,255,0.25)",
        iconImgShadow: "4px 3px 5px 2px rgba(0,0,0,0.25)",
        innerColorRed: "0 0 5px 2px rgba(185,28,28,0.4)",
        innerColorOrange: "0 0 5px 2px rgba(194,65,12,0.4)",
        innerColorYellow: "0 0 5px 2px rgba(161,98,7,0.4)",
        innerColorGreen: "0 0 5px 2px rgba(4,120,87,0.4)",
        innerColorCyan: "0 0 5px 2px rgba(14,116,144,0.4)",
        innerColorPurple: "0 0 5px 2px rgba(107,33,168,0.4)",
        innerColorPink: "0 0 5px 2px rgba(190,24,93,0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

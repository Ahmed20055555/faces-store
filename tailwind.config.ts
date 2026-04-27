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
                primary: "#000000",
                accent: "#b22234",
                mutedText: "#555555",
                borderLight: "#eeeeee",
            },
            fontFamily: {
                cairo: ["Cairo", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            letterSpacing: {
                luxury: "0.2em",
            }
        },
    },
    plugins: [],
};
export default config;

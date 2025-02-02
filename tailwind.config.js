/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlack: "#313131",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/bg-task.jpg')",
      },
    },
  },
  plugins: [],
};

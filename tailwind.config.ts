import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-blue": "#029896",
        "background-blue": "#1a1448",
        "layout-grey": "#7e7e7e",
        "footer-grey": "#f2f2f2",
        "queue-grey": "#4d4d4d",
        "queue-green": "#35be86",
        "warning-yellow": "#fffbec",
        "note-blue": "#f0f7fb",
        "note-border-blue": "#3498db",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: ["0.875rem", "1.5"],
      md: "1.5em",
      lg: "1.75em",
      xl: "2.5em",
    },
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
      header: ["League Gothic"],
    },
  },
  plugins: [],
} satisfies Config

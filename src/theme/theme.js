import { createTheme } from "@mui/material/styles";
// theme.js
const commonSettings = {
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: `'Inter', 'Roboto', sans-serif`,
    button: { textTransform: "none", fontWeight: 600 },
  },
};

export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    background: {
      default: "#0B0F1A",
      paper: "rgba(18,25,45,0.75)",
    },
    primary: { main: "#4DA3FF" },
    secondary: { main: "#3AFF8C" },
    text: {
      primary: "#EAF0FF",
      secondary: "#A8B0D3",
    },
    divider: "rgba(255,255,255,0.08)",
  },
  custom: {
    glassBg: "rgba(18,25,45,0.75)",
    glassBorder: "rgba(255,255,255,0.08)",
    glassShadow: "0 12px 40px rgba(0,0,0,0.55)",
    neonPrimary: "rgba(77,163,255,0.6)",
    neonSecondary: "rgba(58,255,140,0.5)",

    neonBorder:
      "linear-gradient(135deg, rgba(77,163,255,0.5), rgba(58,255,140,0.4))",

    neonShadowDark:
      "0 0 0 1px rgba(77,163,255,0.2), 0 20px 60px rgba(77,163,255,0.35)",

    neonShadowLight:
      "0 0 0 1px rgba(37,99,235,0.2), 0 18px 48px rgba(37,99,235,0.25)",
  },
});

export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "light",
    background: {
      default: "#F5F7FB",
      paper: "rgba(255,255,255,0.75)",
    },
    primary: { main: "#2563EB" },
    secondary: { main: "#16A34A" },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
    divider: "rgba(15,23,42,0.08)",
  },
  custom: {
    glassBg: "rgba(255,255,255,0.75)",
    glassBorder: "rgba(15,23,42,0.08)",
    glassShadow: "0 10px 30px rgba(15,23,42,0.15)",
    neonPrimary: "rgba(77,163,255,0.6)",
    neonSecondary: "rgba(58,255,140,0.5)",

    neonBorder:
      "linear-gradient(135deg, rgba(77,163,255,0.5), rgba(58,255,140,0.4))",

    neonShadowDark:
      "0 0 0 1px rgba(77,163,255,0.2), 0 20px 60px rgba(77,163,255,0.35)",

    neonShadowLight:
      "0 0 0 1px rgba(37,99,235,0.2), 0 18px 48px rgba(37,99,235,0.25)",
  },
});

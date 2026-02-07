import { useEffect, useState } from "react";
import { styled, useMediaQuery } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useNavigate, useLocation } from "react-router-dom";
import { keyframes } from "@mui/system";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeMode } from "../../theme/ThemeContext";
import AppDrawer from "./AppDrawer";
import ThemeSettingsDialog from "../common/ThemeSettingsDialog";
import { useConfirm } from "../../contexts/ConfirmContext";

/* ----------------------------------
   Nav config (single source of truth)
----------------------------------- */

const navLinks = [
  { label: "Home", path: "/home", protected: false },
  { label: "Bookings", path: "/booking", protected: true },
  { label: "Profile", path: "/profile", protected: true },
  { label: "Services", path: "/services", protected: false },
];

/* ----------------------------------
   Styled Components
----------------------------------- */

const HeaderRoot = styled(Box)(({ theme, scrolled }) => ({
  position: "sticky",
  top: 12,
  zIndex: 1100,
  margin: "0 auto",
  width: "calc(100% - 24px)",
  maxWidth: 1200,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "10px 20px",
  borderRadius: 999,

  background: theme.custom.glassBg,
  backdropFilter: "blur(18px)",
  border: `1px solid ${theme.custom.glassBorder}`,

  boxShadow: scrolled ? theme.custom.glassShadow : "none",

  transition: "all 0.35s ease",
}));

const LeftGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
}));

const RightGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
}));

const Brand = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: "0.04em",
  cursor: "pointer",
  color: theme.palette.text.primary,

  "& span": {
    color: theme.palette.primary.main,
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 18,

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  position: "relative",
  padding: "6px 16px",
  borderRadius: 999,
  fontWeight: 600,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,

  background: active
    ? theme.palette.mode === "dark"
      ? "rgba(77,163,255,0.15)"
      : "rgba(37,99,235,0.12)"
    : "transparent",

  transition: "all 0.25s ease",

  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(15,23,42,0.06)",
    color: theme.palette.text.primary,
  },

  "&::after": active
    ? {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: 999,
        boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
        opacity: 0.35,
      }
    : {},
}));

const rotateOnce = keyframes`
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(180deg) scale(1.05); }
`;

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  position: "relative",
  width: 40,
  height: 40,

  background:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.06)"
      : "rgba(15,23,42,0.06)",

  border: `1px solid ${theme.custom.glassBorder}`,
  backdropFilter: "blur(12px)",

  transition: "all 0.25s ease",

  "& svg": {
    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  /* 🟡 Hover – tease */
  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.12)"
        : "rgba(15,23,42,0.12)",

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 4px rgba(77,163,255,0.15)"
        : "0 0 0 4px rgba(37,99,235,0.15)",

    "& svg": {
      transform: "rotate(20deg) scale(1.15)",
    },
  },

  /* 🟢 Active / Click – confirm */
  "&:active svg": {
    animation: `${rotateOnce} 0.45s ease`,
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

/* ----------------------------------
   Component
----------------------------------- */

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { mode } = useThemeMode();
  const theme = useTheme();
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const confirm = useConfirm();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Scroll elevation effect */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <HeaderRoot scrolled={scrolled}>
        {/* LEFT */}
        <LeftGroup>
          <MobileMenuButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </MobileMenuButton>

          <Brand variant="h6" onClick={() => navigate("/home")}>
            Hotel<span>gram</span>
          </Brand>

          <NavLinks>
            {navLinks.map((link) => {
              if (link.protected && !isAuthenticated) return null;

              return (
                <NavButton
                  key={link.path}
                  active={location.pathname === link.path}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </NavButton>
              );
            })}
          </NavLinks>
        </LeftGroup>

        {/* RIGHT */}
        <RightGroup>
          <ThemeToggleButton onClick={() => setThemeDialogOpen(true)}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ThemeToggleButton>

          {!isMobile &&
            (!isAuthenticated ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : (
              <>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.name[0].toUpperCase()}
                </Avatar>

                <Button
                  size="small"
                  color="inherit"
                  onClick={async () => {
                    const ok = await confirm({
                      title: "Logout from Hotelgram?",
                      description:
                        "You’ll be signed out and redirected to the home page.",
                      confirmText: "Logout",
                      danger: true,
                    });

                    if (ok) logout();
                  }}
                >
                  Logout
                </Button>
              </>
            ))}
        </RightGroup>
      </HeaderRoot>

      <AppDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ThemeSettingsDialog
        open={themeDialogOpen}
        onClose={() => setThemeDialogOpen(false)}
      />
    </>
  );
};

export default Header;

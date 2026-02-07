import { useEffect, useState } from "react";
import { styled, keyframes } from "@mui/system";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

/* ----------------------------------
   Animations
----------------------------------- */

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const fadeOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(16px) scale(0.9);
  }
`;

/* ----------------------------------
   Styled Button
----------------------------------- */

const FloatingButton = styled(IconButton)(({ theme, visible }) => ({
  position: "fixed",
  bottom: 28,
  right: 28,
  zIndex: 1400,

  width: 48,
  height: 48,
  borderRadius: "50%",

  background:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.08)"
      : "rgba(15,23,42,0.08)",

  backdropFilter: "blur(12px)",
  border: `1px solid ${theme.custom.glassBorder}`,

  color: theme.palette.primary.main,

  animation: visible
    ? `${fadeInUp} 0.35s ease forwards`
    : `${fadeOutDown} 0.35s ease forwards`,

  pointerEvents: visible ? "auto" : "none",

  transition: "box-shadow 0.3s ease",

  "&:hover": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 24px rgba(77,163,255,0.55)"
        : "0 0 24px rgba(37,99,235,0.45)",
  },

  [theme.breakpoints.down("sm")]: {
    bottom: 20,
    right: 20,
    width: 44,
    height: 44,
  },
}));

/* ----------------------------------
   Component
----------------------------------- */

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FloatingButton
      visible={visible ? 1 : 0}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <KeyboardArrowUpIcon />
    </FloatingButton>
  );
};

export default ScrollToTopButton;

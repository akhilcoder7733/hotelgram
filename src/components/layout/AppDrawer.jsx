import { styled } from "@mui/system";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useConfirm } from "../../contexts/ConfirmContext";

/* ----------------------------------
   Styled Components
----------------------------------- */

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 260,
    background: theme.custom.glassBg,
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${theme.custom.glassBorder}`,
    boxShadow: theme.custom.glassShadow,
    paddingTop: 16,

    /* 🎯 CORE ANIMATION */
    transition: `
      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.3s ease
    `,

    opacity: 0.98,

    [theme.breakpoints.down("sm")]: {
      width: 240,
    },
  },

  /* 🫧 Backdrop animation */
  "& .MuiBackdrop-root": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0,0,0,0.45)"
        : "rgba(15,23,42,0.25)",
    backdropFilter: "blur(2px)",
    transition: "opacity 0.35s ease",
  },
}));

const DrawerFooter = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: "16px 16px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  borderTop: `1px solid ${theme.custom.glassBorder}`,
}));

const DrawerContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: "12px 20px",
}));

const Brand = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: "0.04em",
  color: theme.palette.text.primary,

  "& span": {
    color: theme.palette.primary.main,
  },
}));

const NavList = styled(List)(({ theme }) => ({
  padding: "8px 12px",
  display: "flex",
  flexDirection: "column",
  gap: 6,
}));

const NavItem = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: 12,
  padding: "10px 14px",

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
        borderRadius: 12,
        boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
        opacity: 0.35,
      }
    : {},

  [theme.breakpoints.down("sm")]: {
    padding: "12px 16px",
  },
}));

const NavText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: "0.95rem",
  },
}));

/* ----------------------------------
   Component
----------------------------------- */

const AppDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const confirm = useConfirm();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <StyledDrawer open={open} onClose={onClose}>
      <DrawerContainer>
        {/* Header */}
        <DrawerHeader>
          <Brand variant="h6">
            Hotel<span>gram</span>
          </Brand>
        </DrawerHeader>

        {/* Navigation */}
        <NavList>
          {[
            { label: "Home", path: "/home" },
            { label: "Bookings", path: "/booking" },
            { label: "Profile", path: "/profile" },
            { label: "Services", path: "/services" },
          ].map((item) => (
            <NavItem
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => handleNav(item.path)}
            >
              <NavText primary={item.label} />
            </NavItem>
          ))}
        </NavList>

        {/* Footer (Mobile Auth Actions) */}
        <DrawerFooter>
          {!isAuthenticated ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                navigate("/login");
                onClose();
              }}
            >
              Login
            </Button>
          ) : (
            <>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
                <Typography fontWeight={600}>{user.name}</Typography>
              </Box>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={async () => {
                  const ok = await confirm({
                    title: "Logout from Hotelgram?",
                    description:
                      "You’ll be signed out and redirected to the home page.",
                    confirmText: "Logout",
                    danger: true,
                  });

                  if (ok) {
                    logout();
                    onClose();
                  }
                }}
              >
                Logout
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContainer>
    </StyledDrawer>
  );
};

export default AppDrawer;

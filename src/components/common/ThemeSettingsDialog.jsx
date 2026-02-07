import { styled } from "@mui/system";
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeMode } from "../../theme/ThemeContext";
import { useState } from "react";

/* ---------------- Styled ---------------- */

const DialogCard = styled(Box)(({ theme }) => ({
  padding: 32,
  borderRadius: 24,
  background:
    theme.palette.mode === "dark"
      ? "rgba(18,25,45,0.95)"
      : "rgba(255,255,255,0.95)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 40px rgba(77,163,255,0.45)"
      : "0 12px 40px rgba(37,99,235,0.35)",
}));

const Option = styled(Box)(({ active, theme }) => ({
  flex: 1,
  padding: 20,
  borderRadius: 18,
  cursor: "pointer",
  textAlign: "center",
  border: active
    ? `2px solid ${theme.palette.primary.main}`
    : "1px solid rgba(255,255,255,0.15)",
  background: active
    ? "rgba(77,163,255,0.15)"
    : "transparent",
  transition: "all 0.25s ease",

  "&:hover": {
    background: "rgba(77,163,255,0.12)",
  },
}));

/* ---------------- Component ---------------- */

const ThemeSettingsDialog = ({ open, onClose }) => {
  const { mode, setMode } = useThemeMode();
  const [selected, setSelected] = useState(mode);

  const handleApply = () => {
    setMode(selected);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          background: "transparent",
          boxShadow: "none",
        },
      }}
      TransitionProps={{
        timeout: 250,
      }}
    >
      <DialogCard>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            Theme Settings
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography color="text.secondary" mt={1} mb={3}>
          Choose how Hotelgram looks
        </Typography>

        <Box display="flex" gap={2}>
          <Option
            active={selected === "dark"}
            onClick={() => setSelected("dark")}
          >
            <DarkModeIcon fontSize="large" />
            <Typography mt={1}>Dark</Typography>
          </Option>

          <Option
            active={selected === "light"}
            onClick={() => setSelected("light")}
          >
            <LightModeIcon fontSize="large" />
            <Typography mt={1}>Light</Typography>
          </Option>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4, borderRadius: 14 }}
          onClick={handleApply}
        >
          Apply Theme
        </Button>
      </DialogCard>
    </Dialog>
  );
};

export default ThemeSettingsDialog;

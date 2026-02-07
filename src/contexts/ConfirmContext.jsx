import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";

/* ----------------------------------
   Context
----------------------------------- */

const ConfirmContext = createContext(null);

export const useConfirm = () => useContext(ConfirmContext);

/* ----------------------------------
   Animations
----------------------------------- */

const scaleFade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

/* ----------------------------------
   Styled Dialog
----------------------------------- */

const GlassDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 24,
    background: theme.custom.glassBg,
    backdropFilter: "blur(18px)",
    border: `1px solid ${theme.custom.glassBorder}`,
    boxShadow: theme.custom.glassShadow,
    animation: `${scaleFade} 0.25s ease`,
  },
}));

const DangerBar = styled(Box)(({ theme }) => ({
  height: 4,
  width: "100%",
  background: "linear-gradient(90deg, #ef4444, #f97316)",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
}));

/* ----------------------------------
   Provider
----------------------------------- */

export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const confirm = (options) =>
    new Promise((resolve) => {
      setState({
        ...options,
        resolve,
      });
    });

  const handleClose = (result) => {
    state.resolve(result);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {state && (
        <GlassDialog open onClose={() => handleClose(false)}>
          {state.danger && <DangerBar />}

          <DialogContent sx={{ pt: 3 }}>
            <Typography fontWeight={800} fontSize={20}>
              {state.title || "Are you sure?"}
            </Typography>

            {state.description && (
              <Typography mt={1.5} color="text.secondary">
                {state.description}
              </Typography>
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color={state.danger ? "error" : "primary"}
              onClick={() => handleClose(true)}
            >
              {state.confirmText || "Confirm"}
            </Button>
          </DialogActions>
        </GlassDialog>
      )}
    </ConfirmContext.Provider>
  );
};

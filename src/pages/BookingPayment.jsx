import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../contexts/PaymentContext";
import { useConfirm } from "../contexts/BookingConfirmContext";
import { useFormik } from "formik";
import * as Yup from "yup";

/* ================= STYLES ================= */

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: "120px 16px 64px",
  display: "flex",
  justifyContent: "center",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 520,
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  borderRadius: 28,
  padding: 32,
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 40px rgba(0,180,255,0.08)",

  [theme.breakpoints.down("sm")]: {
    padding: 24,
  },
}));

const StepLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
}));

const PaymentMethodButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  borderRadius: 16,
  padding: "14px 12px",
  border: "1px solid rgba(255,255,255,0.2)",
  color: theme.palette.text.primary,

  "&.Mui-selected": {
    background:
      "linear-gradient(135deg, rgba(0,245,255,0.25), rgba(0,120,255,0.25))",
    borderColor: "rgba(0,245,255,0.6)",
    boxShadow: "0 0 18px rgba(0,245,255,0.45)",
  },
}));

const NeonButton = styled(Button)(({ theme }) => ({
  marginTop: 24,
  borderRadius: 20,
  padding: "14px",
  minHeight: 54,
  fontWeight: 800,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "#001418",
  background: "linear-gradient(135deg,#00f5ff,#0077ff)",
  boxShadow: "0 10px 36px rgba(0,245,255,0.55)",
}));

/* ================= COMPONENT ================= */

export default function BookingPayment() {
  const navigate = useNavigate();
  const { status, makePayment, resetPayment } = usePayment();
  const { confirmBooking } = useConfirm();

  const formik = useFormik({
    initialValues: {
      method: "card",
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
      upiId: "",
    },
    validationSchema: Yup.object({
      method: Yup.string().required(),

      cardNumber: Yup.string().when("method", {
        is: "card",
        then: (s) => s.required("Card number required").min(16),
      }),
      cardName: Yup.string().when("method", {
        is: "card",
        then: (s) => s.required("Name required"),
      }),
      expiry: Yup.string().when("method", {
        is: "card",
        then: (s) => s.required("Expiry required"),
      }),
      cvv: Yup.string().when("method", {
        is: "card",
        then: (s) => s.required("CVV required").min(3),
      }),

      upiId: Yup.string().when("method", {
        is: "upi",
        then: (s) => s.required("UPI ID required"),
      }),
    }),
    onSubmit: async () => {
  await makePayment();
  confirmBooking();

  // allow state to settle
  setTimeout(() => {
    navigate("/booking/confirmation");
  }, 100);
}
  });

  return (
    <PageRoot>
      <ContentWrapper>
        <Box mb={4}>
          <Typography variant="h4" fontWeight={900}>
            Secure Payment
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Choose a payment method and complete your booking
          </Typography>
        </Box>

        <GlassCard>
          <form onSubmit={formik.handleSubmit}>
            {/* STEP 1 */}
            <StepLabel>Step 1 · Payment Method</StepLabel>

            <ToggleButtonGroup
              fullWidth
              exclusive
              value={formik.values.method}
              onChange={(_, v) => v && formik.setFieldValue("method", v)}
              sx={{ mt: 2 }}
            >
              <PaymentMethodButton value="card">
                Card
              </PaymentMethodButton>
              <PaymentMethodButton value="upi">
                UPI
              </PaymentMethodButton>
            </ToggleButtonGroup>

            <Divider sx={{ my: 4 }} />

            {/* STEP 2 */}
            <StepLabel>Step 2 · Payment Details</StepLabel>

            <Stack spacing={2} mt={2}>
              {formik.values.method === "card" && (
                <>
                  <TextField
                    label="Card Number"
                    {...formik.getFieldProps("cardNumber")}
                    error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                    helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                  />
                  <TextField
                    label="Name on Card"
                    {...formik.getFieldProps("cardName")}
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Expiry (MM/YY)"
                      {...formik.getFieldProps("expiry")}
                    />
                    <TextField
                      label="CVV"
                      type="password"
                      {...formik.getFieldProps("cvv")}
                    />
                  </Stack>
                </>
              )}

              {formik.values.method === "upi" && (
                <TextField
                  label="UPI ID"
                  placeholder="name@bank"
                  {...formik.getFieldProps("upiId")}
                  error={formik.touched.upiId && Boolean(formik.errors.upiId)}
                  helperText={formik.touched.upiId && formik.errors.upiId}
                />
              )}
            </Stack>

            {/* STEP 3 */}
            <Divider sx={{ my: 4 }} />

            {status === "processing" ? (
              <Stack alignItems="center" spacing={2}>
                <CircularProgress />
                <Typography>Processing payment…</Typography>
              </Stack>
            ) : status === "error" ? (
              <Stack spacing={2}>
                <Typography color="error">
                  Payment failed. Please try again.
                </Typography>
                <Button onClick={resetPayment}>Retry</Button>
              </Stack>
            ) : (
              <NeonButton
                type="submit"
                fullWidth
                disabled={!formik.isValid}
              >
                Pay Securely
              </NeonButton>
            )}
          </form>
        </GlassCard>
      </ContentWrapper>
    </PageRoot>
  );
}

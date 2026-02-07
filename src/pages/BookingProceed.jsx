import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";
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
  maxWidth: 720,
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(18px)",
  borderRadius: 28,
  padding: 32,
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 40px rgba(0,180,255,0.08)",

  [theme.breakpoints.down("sm")]: {
    padding: 24,
    borderRadius: 22,
  },
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: 32,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 12,
}));

const FormGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr 1fr",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const NeonButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",

  borderRadius: 20,
  padding: "14px 18px",
  minHeight: 54,

  fontWeight: 800,
  fontSize: "0.95rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",

  color: "#001418",
  background: "linear-gradient(135deg, #00f5ff 0%, #0077ff 100%)",

  boxShadow: `
    0 8px 28px rgba(0, 245, 255, 0.35),
    inset 0 1px 0 rgba(255,255,255,0.35)
  `,

  transition:
    "transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease",

  /* ---------- Hover ---------- */
  "&:hover": {
    transform: "translateY(-2px)",
    filter: "brightness(1.08)",
    boxShadow: `
      0 12px 42px rgba(0, 245, 255, 0.55),
      inset 0 1px 0 rgba(255,255,255,0.45)
    `,
  },

  /* ---------- Active (Click) ---------- */
  "&:active": {
    transform: "translateY(0)",
    boxShadow: `
      0 6px 18px rgba(0, 245, 255, 0.35),
      inset 0 3px 6px rgba(0,0,0,0.25)
    `,
  },

  /* ---------- Focus (Keyboard) ---------- */
  "&:focus-visible": {
    outline: "none",
    boxShadow: `
      0 0 0 3px rgba(0, 245, 255, 0.35),
      0 10px 36px rgba(0, 245, 255, 0.55)
    `,
  },

  /* ---------- Disabled ---------- */
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.6)",
    background:
      "linear-gradient(135deg, rgba(0,245,255,0.35), rgba(0,120,255,0.35))",
    boxShadow: "none",
    transform: "none",
    cursor: "not-allowed",
  },

  /* ---------- Subtle shine sweep ---------- */
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35), transparent 70%)",
    transform: "translateX(-100%)",
    transition: "transform 0.8s ease",
  },

  "&:hover::after": {
    transform: "translateX(100%)",
  },

  /* ---------- Mobile tuning ---------- */
  [theme.breakpoints.down("sm")]: {
    minHeight: 50,
    fontSize: "0.9rem",
    borderRadius: 18,
  },
}));


/* ================= COMPONENT ================= */

export default function BookingProceed() {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();

  const formik = useFormik({
    initialValues: {
      checkIn: booking.dates.checkIn,
      checkOut: booking.dates.checkOut,
      guests: booking.guests,
      rooms: booking.rooms,
    },
    validationSchema: Yup.object({
      checkIn: Yup.date().required("Required"),
      checkOut: Yup.date().required("Required"),
      guests: Yup.number().min(1).required(),
      rooms: Yup.number().min(1).required(),
    }),
    onSubmit: (values) => {
      updateBooking({
        dates: {
          checkIn: values.checkIn,
          checkOut: values.checkOut,
        },
        guests: values.guests,
        rooms: values.rooms,
      });
      navigate("/booking/payment");
    },
  });

  return (
    <PageRoot>
      <ContentWrapper>
        {/* Page Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight={900}>
            Review Your Stay
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Confirm your dates and occupancy before payment
          </Typography>
        </Box>

        <GlassCard>
          <form onSubmit={formik.handleSubmit}>
            {/* Dates Section */}
            <Section>
              <SectionTitle variant="h6">
                Stay Dates
              </SectionTitle>

              <FormGrid>
                <TextField
                  type="date"
                  label="Check-in"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps("checkIn")}
                />
                <TextField
                  type="date"
                  label="Check-out"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps("checkOut")}
                />
              </FormGrid>
            </Section>

            <Divider sx={{ my: 4 }} />

            {/* Occupancy Section */}
            <Section>
              <SectionTitle variant="h6">
                Occupancy
              </SectionTitle>

              <FormGrid>
                <TextField
                  type="number"
                  label="Guests"
                  inputProps={{ min: 1 }}
                  {...formik.getFieldProps("guests")}
                />
                <TextField
                  type="number"
                  label="Rooms"
                  inputProps={{ min: 1 }}
                  {...formik.getFieldProps("rooms")}
                />
              </FormGrid>
            </Section>

            <Divider sx={{ my: 4 }} />

            {/* CTA */}
            <Box textAlign="right">
              <NeonButton
                type="submit"
                fullWidth
              >
                Continue to Payment
              </NeonButton>
            </Box>
          </form>
        </GlassCard>
      </ContentWrapper>
    </PageRoot>
  );
}

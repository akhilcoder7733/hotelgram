import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  Divider,
  Stack,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";

/* =======================
   Styled Components
======================= */

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: "120px 16px 64px",
  background: theme.palette.background.default,
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(16px)",
  borderRadius: 24,
  border: "1px solid rgba(255,255,255,0.12)",
  padding: 24,
  boxShadow: "0 0 40px rgba(0,180,255,0.08)",
}));

const TwoColumn = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: 32,
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "2fr 1fr",
  },
}));

const StickySummary = styled(GlassCard)(({ theme }) => ({
  position: "sticky",
  top: 120,
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


/* --- Gallery --- */

const GalleryWrapper = styled(Box)(() => ({
  width: "100%",
  marginBottom: 40,
}));

const MainImage = styled(Box)(({ image, theme }) => ({
  width: "100%",
  height: 420,
  borderRadius: 28,
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "all 0.35s ease",
  [theme.breakpoints.down("sm")]: {
    height: 280,
    borderRadius: 20,
  },
}));

const ThumbnailStrip = styled(Box)(() => ({
  display: "flex",
  gap: 12,
  marginTop: 16,
  overflowX: "auto",
  justifyContent: "center",
  paddingBottom: 4,
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const Thumbnail = styled(Box)(({ image, active }) => ({
  width: 84,
  height: 64,
  borderRadius: 14,
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  cursor: "pointer",
  flexShrink: 0,
  border: active ? "2px solid #00f5ff" : "1px solid rgba(255,255,255,0.2)",
  boxShadow: active ? "0 0 18px rgba(0,245,255,0.55)" : "none",
  transform: active ? "scale(1.05)" : "scale(1)",
  transition: "all 0.25s ease",
}));

/* =======================
   Component
======================= */

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHotelById, startBooking } = useBooking();

  const hotel = getHotelById(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [savedOpen, setSavedOpen] = useState(false);

  const [dates, setDates] = useState({
    checkIn: "",
    checkOut: "",
  });

  /* Set default image AFTER hotel loads */
  useEffect(() => {
    if (hotel?.images?.length) {
      setSelectedImage(hotel.images[0]);
    }
  }, [hotel]);

  const [guests, setGuests] = useState(2);

  if (!hotel) {
    return (
      <PageRoot>
        <Typography>Hotel not found</Typography>
      </PageRoot>
    );
  }

  const nights = dates.checkIn && dates.checkOut ? 2 : 1;
  const subtotal = hotel.pricePerNight * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleProceed = () => {
    startBooking({
      hotel,
      dates,
      guests,
      rooms: 1,
    });

    navigate("/booking/proceed");
  };

  return (
    <PageRoot>
      {/* Image Gallery */}
      <GalleryWrapper>
        <MainImage image={selectedImage} />

        <ThumbnailStrip>
          {hotel.images.map((img, index) => (
            <Thumbnail
              key={index}
              image={img}
              active={selectedImage === img}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </ThumbnailStrip>
      </GalleryWrapper>

      <TwoColumn>
        {/* LEFT CONTENT */}
        {/* LEFT CONTENT */}
        <Box>
          <Typography variant="h4" fontWeight={800}>
            {hotel.name}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mt={1}>
            <Rating value={hotel.rating} precision={0.5} readOnly />
            <Typography color="text.secondary">
              ({hotel.reviews || 120}+ reviews)
            </Typography>
          </Stack>

          <Typography mt={3} color="text.secondary" lineHeight={1.9}>
            {hotel.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Stay Details */}
          <Typography variant="h6" mb={2}>
            Your Stay
          </Typography>

          <Stack spacing={2}>
            <TextField
              type="date"
              label="Check-in"
              InputLabelProps={{ shrink: true }}
              value={dates.checkIn}
              onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
            />

            <TextField
              type="date"
              label="Check-out"
              InputLabelProps={{ shrink: true }}
              value={dates.checkOut}
              onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
            />

            <TextField
              type="number"
              label="Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              inputProps={{ min: 1 }}
            />
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Amenities
          </Typography>

          <Typography variant="h6">Amenities</Typography>

          <Box mt={2} display="flex" gap={1.5} flexWrap="wrap">
            {hotel.amenities.map((a) => (
              <Chip
                key={a}
                label={a}
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(0,255,255,0.18), rgba(0,150,255,0.18))",
                  border: "1px solid rgba(0,255,255,0.25)",
                }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Hotel Policies
          </Typography>

          <Typography variant="body2" color="text.secondary">
            • Check-in: 2:00 PM
            <br />
            • Check-out: 11:00 AM
            <br />
            • Free cancellation within 24 hours
            <br />• Government ID required at check-in
          </Typography>
        </Box>

        {/* RIGHT BOOKING CARD */}
        {/* RIGHT SUMMARY */}
        <StickySummary>
          <Typography variant="h6" fontWeight={700}>
            Booking Summary
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.5}>
            <Typography>
              ₹{hotel.pricePerNight} × {nights} nights
            </Typography>
            <Typography color="text.secondary">
              Taxes & Fees: ₹{taxes}
            </Typography>

            <Divider />

            <Typography fontWeight={800} fontSize={18}>
              Total: ₹{total}
            </Typography>
          </Stack>

          <NeonButton
            fullWidth
            sx={{ mt: 3 }}
            disabled={!hotel.availability}
            onClick={handleProceed}
          >
            Proceed to Payment
          </NeonButton>

          <Button
            fullWidth
            sx={{ mt: 1, opacity: 0.75 }}
            onClick={() => setSavedOpen(true)}
          >
            Save for Later
          </Button>
        </StickySummary>
      </TwoColumn>
      <Snackbar
        open={savedOpen}
        autoHideDuration={3000}
        onClose={() => setSavedOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(0,245,255,0.9), rgba(0,120,255,0.9))",
            color: "#000",
            fontWeight: 600,
            boxShadow: "0 0 20px rgba(0,245,255,0.6)",
          }}
        >
          Saved for later ✨
        </Alert>
      </Snackbar>
    </PageRoot>
  );
};

export default BookingDetails;

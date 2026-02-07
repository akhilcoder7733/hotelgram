import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Chip,
  Slider,
  Rating,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";
import BookingSkeleton from "../components/common/BookingSkeleton";

/* -----------------------------
   Constants
------------------------------ */

const CATEGORIES = ["All", "Luxury", "Resort", "Business", "Budget"];

/* -----------------------------
   Styled Components
------------------------------ */

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: "120px 24px 48px",
  background: theme.palette.background.default,

  [theme.breakpoints.down("sm")]: {
    padding: "96px 16px 32px",
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 24,
}));

const FiltersBar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 24,
  marginBottom: 32,
  alignItems: "center",
}));

const CategoryGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
}));

const FilterBlock = styled(Box)(({ theme }) => ({
  minWidth: 220,
}));

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 24,
}));

const Card = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  overflow: "hidden",
  background: theme.palette.background.paper,
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  transition: "all 0.3s ease",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
  },
}));

const CardImage = styled("div")(({ image }) => ({
  height: 180,
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));

/* -----------------------------
   Component
------------------------------ */

const Booking = () => {
  const navigate = useNavigate();

  const {
    hotels,
    loading,
    filters,
    setCategory,
    setPrice,
    setRating,
    sortBy,
    setSortBy,
  } = useBooking();

  if (loading) {
    return <BookingSkeleton />;
  }

  return (
    <PageRoot>
      <PageTitle variant="h4">Available Hotels</PageTitle>

      {/* Filters + Sorting */}
      <FiltersBar>
        {/* Categories */}
        <CategoryGroup>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              color={filters.category === cat ? "primary" : "default"}
              onClick={() => setCategory(cat)}
            />
          ))}
        </CategoryGroup>

        {/* Price */}
        <FilterBlock>
          <Typography variant="caption">Price range (₹)</Typography>
          <Slider
            value={filters.price}
            min={1000}
            max={10000}
            step={500}
            onChange={(_, val) => setPrice(val)}
            valueLabelDisplay="auto"
          />
        </FilterBlock>

        {/* Rating */}
        <FilterBlock>
          <Typography variant="caption">Minimum rating</Typography>
          <Rating
            value={filters.rating}
            precision={0.5}
            onChange={(_, val) => setRating(val || 0)}
          />
        </FilterBlock>

        {/* Sorting */}
        <FilterBlock>
          <Typography variant="caption">Sort by</Typography>
          <Select
            size="small"
            fullWidth
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="price_low">Price: Low → High</MenuItem>
            <MenuItem value="price_high">Price: High → Low</MenuItem>
            <MenuItem value="rating">Top Rated</MenuItem>
          </Select>
        </FilterBlock>
      </FiltersBar>

      {/* Grid */}
      <Grid>
        {hotels.map((hotel) => (
          <Card
            key={hotel.id}
            onClick={() => navigate(`/booking/${hotel.id}`)}
          >
            <CardImage image={hotel.images[0]} />

            <CardContent>
              <Typography fontWeight={600}>
                {hotel.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {hotel.city} • {hotel.category}
              </Typography>

              <Rating
                value={hotel.rating}
                precision={0.1}
                readOnly
                size="small"
              />

              <Price>
                ₹{hotel.pricePerNight} / night
              </Price>
            </CardContent>
          </Card>
        ))}
      </Grid>

      {hotels.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 6 }}>
          No hotels match the selected filters.
        </Typography>
      )}
    </PageRoot>
  );
};

export default Booking;

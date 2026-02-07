import { styled } from "@mui/system";
import { Box, Skeleton } from "@mui/material";

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 24,
  padding: "120px 24px",
}));

const Card = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  overflow: "hidden",
}));

const BookingSkeleton = () => {
  return (
    <Grid>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <Skeleton variant="rectangular" height={180} />
          <Skeleton height={32} />
          <Skeleton width="60%" />
        </Card>
      ))}
    </Grid>
  );
};

export default BookingSkeleton;

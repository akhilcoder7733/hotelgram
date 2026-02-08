import { useEffect } from "react";
import { useLocation, matchRoutes } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";

const APP_NAME = "Hotelgram";

const routesWithTitles = [
  { path: "/", title: "Welcome" },

  // Public
  { path: "/home", title: "Home" },
  { path: "/login", title: "Login" },
  { path: "/services", title: "Services" },

  // Booking flow
  { path: "/booking", title: "Book Hotels" },
  { path: "/booking/:id", title: "Hotel Details" },
  { path: "/booking/proceed", title: "Booking Summary" },
  { path: "/booking/payment", title: "Payment" },
  { path: "/booking/confirmation", title: "Booking Confirmed" },

  // Protected
  { path: "/profile", title: "Profile" },

  // Fallback
  { path: "*", title: "Page Not Found" },
];

const RouteTitleManager = () => {
  const location = useLocation();
  const { getHotelById } = useBooking();

  useEffect(() => {
    const matches = matchRoutes(routesWithTitles, location);
    const match = matches?.[matches.length - 1]?.route;

    let title = APP_NAME;

    /* ---------------- Dynamic Hotel Title ---------------- */
    if (match?.path === "/booking/:id") {
      const id = location.pathname.split("/").pop();
      const hotel = getHotelById?.(id);

      title = hotel
        ? `${APP_NAME} | ${hotel.name}`
        : `${APP_NAME} | Hotel Details`;
    }

    /* ---------------- Static Titles ---------------- */
    else if (match?.title) {
      title = `${APP_NAME} | ${match.title}`;
    }

    /* ---------------- Sync with Page Transitions ---------------- */
    const timeout = setTimeout(() => {
      document.title = title;
    }, 150); // aligns nicely with AnimatePresence exit

    return () => clearTimeout(timeout);
  }, [location, getHotelById]);

  return null;
};

export default RouteTitleManager;

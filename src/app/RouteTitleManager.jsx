import { useEffect } from "react";
import { useLocation, matchRoutes } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";

const APP_NAME = "Hotelgram";

const routesWithTitles = [
  { path: "/", title: "Hotelgram" },
  { path: "/home", title: "Home" },
  { path: "/login", title: "Login" },
  { path: "/booking", title: "Book Hotels" },
  { path: "/booking/:id", title: "Hotel Details" },
  { path: "/profile", title: "Profile" },
];

const RouteTitleManager = () => {
  const location = useLocation();
  const { getHotelById } = useBooking();

  useEffect(() => {
    const matches = matchRoutes(routesWithTitles, location);
    const match = matches?.[matches.length - 1]?.route;

    let title = APP_NAME;

    // 🧠 Dynamic booking title
    if (match?.path === "/booking/:id") {
      const id = location.pathname.split("/").pop();
      const hotel = getHotelById(id);

      title = hotel
        ? `${APP_NAME} | ${hotel.name}`
        : `${APP_NAME} | Hotel Details`;
    } else if (match?.title) {
      title = `${APP_NAME} | ${match.title}`;
    }

    // ✨ Sync with transitions
    const timeout = setTimeout(() => {
      document.title = title;
    }, 150); // tweak to match your animation timing

    return () => clearTimeout(timeout);
  }, [location, getHotelById]);

  return null;
};

export default RouteTitleManager;

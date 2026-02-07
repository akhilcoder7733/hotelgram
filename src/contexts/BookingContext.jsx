import { createContext, useContext, useEffect, useMemo, useState } from "react";
import hotelsData from "../data/hotels.json";

const BookingContext = createContext(null);
export const useBooking = () => useContext(BookingContext);

const INITIAL_BOOKING = {
  hotel: null,
  dates: { checkIn: "", checkOut: "" },
  guests: 1,
  rooms: 1,
  price: {
    nights: 1,
    subtotal: 0,
    taxes: 0,
    total: 0,
  },
};

export const BookingProvider = ({ children }) => {
  /* -------------------------
     Hotels Catalog
  -------------------------- */
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Filters */
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState([1000, 10000]);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  /* -------------------------
     Active Booking
  -------------------------- */
  const [booking, setBooking] = useState(INITIAL_BOOKING);

  /* Fake API */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHotels(hotelsData);
      setLoading(false);
    }, 1200);
  }, []);

  /* -------------------------
     Derived Hotels
  -------------------------- */
  const processedHotels = useMemo(() => {
    let data = [...hotels];

    data = data.filter((h) => {
      return (
        (category === "All" || h.category === category) &&
        h.pricePerNight >= price[0] &&
        h.pricePerNight <= price[1] &&
        h.rating >= rating
      );
    });

    if (sortBy === "price_low") data.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sortBy === "price_high") data.sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sortBy === "rating") data.sort((a, b) => b.rating - a.rating);
    if (sortBy === "featured") data.sort((a, b) => Number(b.featured) - Number(a.featured));

    return data;
  }, [hotels, category, price, rating, sortBy]);

  /* -------------------------
     Helpers
  -------------------------- */
  const getHotelById = (id) => hotels.find((h) => h.id === id);

  const startBooking = ({ hotel, dates, guests, rooms }) => {
    const nights = 1; // can be calculated later
    const subtotal = hotel.pricePerNight * nights * rooms;
    const taxes = Math.round(subtotal * 0.12);

    setBooking({
      hotel,
      dates,
      guests,
      rooms,
      price: {
        nights,
        subtotal,
        taxes,
        total: subtotal + taxes,
      },
    });
  };

  const updateBooking = (payload) =>
    setBooking((prev) => ({ ...prev, ...payload }));

  const resetBooking = () => setBooking(INITIAL_BOOKING);

  return (
    <BookingContext.Provider
      value={{
        /* catalog */
        hotels: processedHotels,
        loading,
        filters: { category, price, rating },
        setCategory,
        setPrice,
        setRating,
        sortBy,
        setSortBy,
        getHotelById,

        /* booking */
        booking,
        startBooking,
        updateBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

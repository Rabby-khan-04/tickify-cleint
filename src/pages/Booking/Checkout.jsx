import useBookingStore from "../../hooks/useBookingStore";

const Checkout = () => {
  const { theater, price, date, time, showId, movie, seats, clearBookingData } =
    useBookingStore();

  console.log({
    theater,
    price,
    date,
    time,
    showId,
    movie,
    seats,
    clearBookingData,
  });

  return (
    <div>
      <h1>This is Checkout component</h1>
    </div>
  );
};

export default Checkout;

import useBookingStore from "../../hooks/useBookingStore";

const Seat = () => {
  const { theater, price, date, time, showId, movie } = useBookingStore();

  console.log({ theater, price, date, time, showId, movie });
  return (
    <div>
      <h1>This is Seat component</h1>
    </div>
  );
};

export default Seat;

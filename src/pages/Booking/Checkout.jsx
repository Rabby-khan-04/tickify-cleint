import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useAddBooking from "../../hooks/useAddBooking";
import useBookingStore from "../../hooks/useBookingStore";
import { formatTime } from "../../utils/dateFormater";

const Checkout = () => {
  const { addBooking } = useAddBooking();
  const { theater, date, time, showId, movie, seats } = useBookingStore();

  const handleCheckout = () => {
    const bookingDetails = {
      showId,
      movieId: movie,
      seats,
      theaterId: theater,
      date,
      time: formatTime(time),
    };

    addBooking(bookingDetails);
  };
  return (
    <main className="h-screen relative overflow-hidden flex items-center justify-center">
      <BlurCircle top="-100px" right="-100px" />
      <div className="container-fluid">
        <div className="max-w-md mx-auto text-white">
          <SectionTitle title="Booking Details" />
          <div className="space-y-5 mb-16">
            <h3 className="text-[clamp(1.2rem,2vw,1.5rem)]">Schedule</h3>

            <div className="space-y-1">
              <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">Date</h4>
              <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                "Hello How Do you do"
              </p>
            </div>
            <div className="space-y-1 flex items-center justify-between flex-wrap">
              <div>
                <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">
                  Seats ({seats.length})
                </h4>
                <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                  {seats.join(", ")}
                </p>
              </div>
              <div>
                <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">Hour</h4>
                <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                  {formatTime(time)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button className="btn w-full" onClick={handleCheckout}>
              Pay
            </button>
          </div>
        </div>
      </div>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default Checkout;

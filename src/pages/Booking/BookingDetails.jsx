import { useEffect } from "react";
import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useBookingStore from "../../hooks/useBookingStore";
import useMovieDetails from "../../hooks/useMovieDetails";
import { farmateFullDate, formatTime } from "../../utils/dateFormater";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const BookingDetails = () => {
  const navigate = useNavigate();
  const { theater, price, date, time, showId, movie, seats } =
    useBookingStore();
  const { movieDetails, movieDetailsLoading } = useMovieDetails(movie);

  useEffect(() => {
    if (!theater || !showId || !movie) {
      toast.error("Select a show!!");
      navigate("/movies");
    }
  }, [theater, showId, movie, navigate]);

  if (movieDetailsLoading) return <Spinner />;

  const billAmount = price * seats.length;
  const serviceCharge = price * 0.06;
  const totalSearviceCharge = serviceCharge * seats.length;
  const totalBill = billAmount + totalSearviceCharge;
  return (
    <main className="h-screen relative overflow-hidden flex items-center justify-center">
      <BlurCircle top="-100px" right="-100px" />
      <div className="container-fluid">
        {movieDetails && theater && showId ? (
          <div className="max-w-md mx-auto text-white">
            <SectionTitle title="Booking Details" />
            <div className="space-y-5 mb-16">
              <h3 className="text-[clamp(1.2rem,2vw,1.5rem)]">Schedule</h3>
              <div className="space-y-1">
                <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">Movie Title</h4>
                <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                  {movieDetails?.title}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">Date</h4>
                <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                  {farmateFullDate(date)}
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

            <div className="space-y-2 mb-10">
              <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">
                Transaction Detail
              </h4>
              <div className="flex flex-wrap items-center justify-between text-[clamp(1rem,1.5vw,1rem)]">
                <p className="">REGULAR SEAT</p>
                <p>
                  $ {price} <sub>X</sub>
                  {seats.length}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between text-[clamp(1rem,1.5vw,1rem)]">
                <p className="">Service Sharge (6%)</p>
                <p>
                  $ {serviceCharge} <sub>X</sub>
                  {seats.length}
                </p>
              </div>

              <div className="border-y border-white/80 py-2 flex flex-wrap items-center justify-between text-[clamp(1rem,1.8vw,1.2rem)]">
                <p>Total payment</p>
                <p>$ {totalBill}</p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xs text-white/80">
                *Purchased ticket cannot be canceled
              </p>
              <Link to="/checkout" className="btn w-full">
                Checkout Ticket
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-white">
            <SectionTitle title="Booking Details Not Available" />
          </div>
        )}
      </div>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default BookingDetails;

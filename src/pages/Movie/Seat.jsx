import { useLocation, useNavigate } from "react-router";
import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useBookingStore from "../../hooks/useBookingStore";
import screen from "../../assets/icon/screen.svg";
import { useState } from "react";
import SeatLayout from "../../components/Movies/SeatLayout";
import { FaTimes } from "react-icons/fa";
import useBookedSeats from "../../hooks/useBookedSeats";
import { formatTime } from "../../utils/dateFormater";
import Spinner from "../../components/shared/Loader/Spinner";
import toast from "react-hot-toast";

const Seat = () => {
  const [selectedSeat, setSelectedSeat] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    theater,
    price,
    date,
    time,
    showId,
    clearBookingData,
    setBookedSeat,
  } = useBookingStore();

  const bookingInfo = { theaterId: theater, date, time: formatTime(time) };
  const { bookedSeat, bookedSeatLoading } = useBookedSeats(showId, bookingInfo);

  const rowGroup = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
    ["K", "L"],
  ];

  const handleBackNavigation = () => {
    clearBookingData();
    navigate(location.state.from || "/");
  };

  const handleRemoveSeatSelection = () => {
    setSelectedSeat([]);
  };

  const handleProceedPayment = () => {
    if (!selectedSeat.length)
      return toast("Select Seat first!!", { icon: "⚠️" });
    setBookedSeat(selectedSeat);
    navigate("/booking-details");
  };

  if (bookedSeatLoading) return <Spinner />;

  return (
    <main className="relative h-[calc(100vh-120px)] py-16 overflow-y-scroll lg:overflow-y-hidden overflow-x-hidden">
      <BlurCircle top="-100px" right="-100px" />
      <section>
        <div className="container-fluid">
          <SectionTitle
            title="Select your seat"
            className="text-center text-white uppercase"
          />
          <div className="max-w-4xl mx-auto text-center">
            <img src={screen} className="w-4/5 inline-block" alt="" />
            <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

            <div className="space-y-2 lg:space-y-8">
              <div className="space-y-2">
                {rowGroup[0].map((row) => (
                  <SeatLayout
                    key={row}
                    row={row}
                    setSelectedSeat={setSelectedSeat}
                    selectedSeat={selectedSeat}
                    bookedSeat={bookedSeat}
                  />
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-2 lg:gap-11">
                {rowGroup.slice(1, rowGroup.length - 1).map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    {group.map((row) => (
                      <SeatLayout
                        key={row}
                        row={row}
                        setSelectedSeat={setSelectedSeat}
                        selectedSeat={selectedSeat}
                        bookedSeat={bookedSeat}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {rowGroup[rowGroup.length - 1].map((row) => (
                  <SeatLayout
                    key={row}
                    row={row}
                    setSelectedSeat={setSelectedSeat}
                    selectedSeat={selectedSeat}
                    bookedSeat={bookedSeat}
                  />
                ))}
              </div>
              <button
                onClick={handleRemoveSeatSelection}
                className="text-dark-light w-sm p-2 rounded-2xl text-center inline-block bg-white hover:bg-red-500 hover:text-primary transition-all duration-200 cursor-pointer"
              >
                <FaTimes className="inline-block text-xl" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t bg-dark-light border-primary-light fixed w-full bottom-0 left-0 right-0 py-6 lg:bg-primary/10">
        <div className="container-fluid">
          <div className="max-w-5xl mx-auto flex max-md:flex-wrap items-center justify-between max-md:gap-4">
            <div className="">
              <h4 className="text-lg uppercase font-medium text-white">
                TOTAL
              </h4>
              <p className="font-bold text-[clamp(1.3rem,3vw,2rem)] text-white">
                ${" "}
                {price * selectedSeat.length
                  ? price * selectedSeat.length
                  : price}
              </p>
            </div>
            {selectedSeat.length > 0 && (
              <div className="">
                <h4 className="text-lg uppercase font-medium text-white">
                  SEAT
                </h4>
                <p className="font-bold text-[clamp(1.3rem,3vw,2rem)] text-white">
                  {selectedSeat.join(",")}
                </p>
              </div>
            )}

            <div className="flex items-center max-md:justify-between max-md:w-full gap-4 flex-wrap">
              <button onClick={handleBackNavigation} className="btn-alt">
                Back
              </button>
              <button
                className="btn disabled:bg-gray-500 disabled:pointer-events-none disabled:border-gray-500"
                onClick={handleProceedPayment}
                disabled={!selectedSeat.length}
              >
                Proceed Payment
              </button>
            </div>
          </div>
        </div>
      </section>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default Seat;

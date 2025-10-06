import { useLoaderData } from "react-router";
import Ticket from "../../components/Bookings/Ticket";
import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useBookings from "../../hooks/useBookings";

const Bookings = () => {
  const { bookings, bookingsLoading } = useBookings();
  const { data } = useLoaderData();
  console.log(data);

  if (bookingsLoading) return <Spinner />;
  return (
    <main className="py-20 lg:py-32 relative overflow-hidden">
      <BlurCircle top="-100px" right="-100px" />
      <BlurCircle top="50%" left="-100px" />
      <section>
        <div className="container-fluid">
          <SectionTitle title="Ticket Detail" />

          <div className="flex items-center gap-8 flex-wrap justify-center">
            {bookings.map((booking) => (
              <Ticket booking={booking} key={booking._id} />
            ))}
          </div>
        </div>
      </section>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default Bookings;

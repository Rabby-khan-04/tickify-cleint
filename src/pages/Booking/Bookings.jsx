import { useLoaderData } from "react-router";
import Ticket from "../../components/Bookings/Ticket";
import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useBookings from "../../hooks/useBookings";
import { useEffect, useState } from "react";

import Pagination from "../../components/shared/Pagination";

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(8);
  const { bookings, bookingsLoading } = useBookings(
    currentPage,
    itemPerPage,
    totalPage
  );
  const { data } = useLoaderData();

  useEffect(() => {
    const total_item = data.data;
    const total_page = Math.ceil(total_item / itemPerPage);
    setTotalPage(total_page);
  }, [data.data, itemPerPage]);

  if (bookingsLoading) return <Spinner />;

  return (
    <main className="py-20 lg:py-32 relative overflow-hidden">
      <BlurCircle top="-100px" right="-100px" />
      <section className="min-h-screen">
        <div className="container-fluid">
          <SectionTitle title="Ticket Detail" />

          {bookings && (
            <>
              <div className="flex items-center gap-8 flex-wrap justify-center">
                {bookings.map((booking) => (
                  <Ticket booking={booking} key={booking._id} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            </>
          )}
        </div>
      </section>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default Bookings;

import { useLoaderData } from "react-router";
import Ticket from "../../components/Bookings/Ticket";
import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useBookings from "../../hooks/useBookings";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(8);
  const { bookings, bookingsLoading } = useBookings(currentPage, itemPerPage);
  const { data } = useLoaderData();

  useEffect(() => {
    const total_item = data.data;
    const total_page = Math.ceil(total_item / itemPerPage);
    setTotalPage(total_page);
  }, [data.data, itemPerPage]);

  console.log({ totalPage, currentPage });

  if (bookingsLoading) return <Spinner />;

  return (
    <main className="py-20 lg:py-32 relative overflow-hidden">
      <BlurCircle top="-100px" right="-100px" />
      <section>
        <div className="container-fluid">
          <SectionTitle title="Ticket Detail" />

          {bookings && (
            <>
              <div className="flex items-center gap-8 flex-wrap justify-center">
                {bookings.map((booking) => (
                  <Ticket booking={booking} key={booking._id} />
                ))}
              </div>

              <div className="flex items-stretch justify-center mt-10 gap-4">
                <button
                  className={`btn-pagination bg-primary/10 text-white ${
                    currentPage === 0 && "pointer-events-none"
                  }`}
                  onClick={() =>
                    setCurrentPage((prev) => (prev === 0 ? 0 : prev - 1))
                  }
                >
                  <FaChevronLeft />
                </button>
                {[...Array(totalPage).keys()].map((item) => (
                  <button
                    onClick={() => setCurrentPage(item)}
                    className={`btn-pagination ${
                      currentPage === item
                        ? "bg-white text-dark"
                        : "bg-primary/10 text-white"
                    }`}
                    key={item}
                  >
                    {item + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev === totalPage - 1 ? totalPage - 1 : prev + 1
                    )
                  }
                  className={`btn-pagination bg-primary/10 text-white ${
                    currentPage === totalPage - 1 && "pointer-events-none"
                  }`}
                >
                  <FaAngleRight />
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <BlurCircle bottom="-100px" left="-100px" />
    </main>
  );
};

export default Bookings;

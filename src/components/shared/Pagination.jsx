import PropTypes from "prop-types";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
  return (
    <div className="flex items-stretch justify-center mt-10 gap-4">
      <button
        className={`btn-pagination bg-primary/10 text-white ${
          currentPage === 0 && "pointer-events-none"
        }`}
        onClick={() => setCurrentPage((prev) => (prev === 0 ? 0 : prev - 1))}
      >
        <FaChevronLeft />
      </button>
      {Array.from({ length: totalPage }, (_, i) => i).map((item) => (
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
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalPage: PropTypes.number,
};

export default Pagination;

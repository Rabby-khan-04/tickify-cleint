import { Link } from "react-router";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useAllShow from "../../hooks/useAllShow";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import {
  formatDay,
  formatMonth,
  formatWeakDay,
  formatYearTwo,
} from "../../utils/dateFormater";

const ManageShowtimes = () => {
  const { allShows, allShowsLoading } = useAllShow();

  if (allShowsLoading) return <Spinner />;

  console.log(allShows);

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle title="All Shows" />
        <Link
          className="btn inline-flex items-center gap-2"
          to="/dashboard/admin/add-show"
        >
          <FaPlus />
          <span>Create new Show</span>
        </Link>
      </div>
      <div className="overflow-x-auto">
        {allShows.length ? (
          <table className="table-auto w-full border border-white/60 border-collapse text-white">
            <thead>
              <tr className="border border-white/60">
                <th className="border border-white/60 px-4 py-2">#</th>
                <th className="border border-white/60 px-4 py-2">Cover</th>
                <th className="border border-white/60 px-4 py-2">Title</th>
                <th className="border border-white/60 px-4 py-2">Dates</th>
                <th className="border border-white/60 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allShows.map((show, idx) => (
                <tr>
                  <td className="border border-white/60 px-4 py-2">
                    {idx + 1}
                  </td>
                  <td className="border border-white/60 px-4 py-2 text-center">
                    <img
                      src={`${import.meta.env.VITE_TMDB_PATH}${
                        show.movie.poster_path
                      }`}
                      className="h-32 inline-block"
                      alt=""
                    />
                  </td>
                  <td className="border border-white/60 px-4 py-2">
                    <p className="truncate">{show.movie.title}</p>
                  </td>
                  <td className="border border-white/60 px-4 py-2">
                    <div className="flex items-center gap-2">
                      {show.theaters.map((theater) =>
                        theater.dates.map((date) => (
                          <div className="p-2 border border-white/50 inline-block rounded-xl">
                            <p>
                              <span>{formatDay(date.date)}</span>{" "}
                              <span>{formatWeakDay(date.date)}</span>
                            </p>
                            <p>
                              <span>{formatMonth(date.date)}</span>{" "}
                              <span>{formatYearTwo(date.date)}</span>
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="border border-white/60 px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-md cursor-pointer bg-primary">
                        <FaEye />
                      </button>
                      <button className="p-2 rounded-md cursor-pointer bg-accent">
                        <FaPen />
                      </button>
                      <button className="p-2 rounded-md cursor-pointer bg-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center text-2xl italic text-white/60 mt-5">
            No shows available
          </h2>
        )}
      </div>
    </div>
  );
};

export default ManageShowtimes;

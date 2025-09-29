import { Link } from "react-router";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useAllMovies from "../../hooks/useAllMovies";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { runtimeFormater } from "../../utils/runtimeFormater";
import { formatYear } from "../../utils/dateFormater";

const ManageMovies = () => {
  const { allmovies, allMoviesLoading } = useAllMovies();

  if (allMoviesLoading) return <Spinner />;

  console.log(allmovies);

  return (
    <div className="text-white">
      <div className="flex items-center justify-between flex-wrap mb-5">
        <SectionTitle title="All Movies" />
        <Link
          className="btn inline-flex items-center gap-2"
          to="/dashboard/admin/add-show"
        >
          <FaPlus />
          <span>Create new Show</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        {allmovies.length ? (
          <table className="table-auto w-full border border-white/60 border-collapse text-white">
            <thead>
              <tr className="border border-white/60">
                <th className="border border-white/60 px-4 py-2 max-md:hidden">
                  #
                </th>
                <th className="border border-white/60 px-4 py-2 max-md:hidden">
                  Cover
                </th>
                <th className="border border-white/60 px-4 py-2">Title</th>
                <th className="border border-white/60 px-4 py-2 max-md:hidden">
                  Details
                </th>
                <th className="border border-white/60 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allmovies.map((movie, idx) => (
                <tr key={movie._id}>
                  <td className="border border-white/60 px-4 py-2 max-md:hidden">
                    {idx + 1}
                  </td>
                  <td className="border border-white/60 px-4 py-2 text-center max-md:hidden">
                    <img
                      src={`${import.meta.env.VITE_TMDB_PATH}${
                        movie.poster_path
                      }`}
                      className="min-lg:h-32 inline-block rounded-md"
                      alt=""
                    />
                  </td>
                  <td className="border border-white/60 px-4 py-2 max-lg:max-w-40">
                    <p className="truncate">{movie.title}</p>
                  </td>
                  <td className="border border-white/60 px-4 py-2 max-md:hidden">
                    <p>Language: {movie.original_language}</p>
                    <p>Runtime: {runtimeFormater(movie.runtime)}</p>
                    <p>Released: {formatYear(movie.release_date)}</p>
                    <p>Rating: {movie.vote_average.toFixed(2)}</p>
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
            No movies available
          </h2>
        )}
      </div>
    </div>
  );
};

export default ManageMovies;

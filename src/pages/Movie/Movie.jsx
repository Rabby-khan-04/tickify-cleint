import { Link, useParams } from "react-router";
import useMovie from "../../hooks/useMovie";
import Spinner from "../../components/shared/Loader/Spinner";
import { Calendar, Earth, PartyPopper, Play, Star, Ticket } from "lucide-react";
import { farmateFullDate, formatYear } from "../../utils/dateFormater";
import { runtimeFormater } from "../../utils/runtimeFormater";
import { FaClock } from "react-icons/fa6";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useShowByMovie from "../../hooks/useShowByMovie";
import toast from "react-hot-toast";

const Movie = () => {
  const { movieId } = useParams();
  const { movieDetails, movieDetailsLoading } = useMovie(movieId);
  const { showData, showDataLoading } = useShowByMovie(movieDetails?._id);
  if (movieDetailsLoading || showDataLoading) return <Spinner />;

  const {
    backdrop_path,
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
    casts,
    original_language,
    popularity,
    runtime,
    genres,
  } = movieDetails;

  const handelNoShowMovies = () => {
    toast("No show available", { icon: "⚠️" });
  };

  return (
    <>
      <section
        className="h-screen bg-no-repeat bg-cover bg-center pb-20 flex items-end"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${
            import.meta.env.VITE_TMDB_PATH
          }${backdrop_path})`,
        }}
      >
        <div className="container-fluid flex items-center gap-12">
          <div className="w-auto shrink-0 hidden md:block">
            <img
              src={import.meta.env.VITE_TMDB_PATH + poster_path}
              className="w-[300px] h-[400px]block lg:w-[400px] lg:h-[500px] xl:w-[500px] xl:h-[600px] object-cover object-center rounded-3xl border border-primary-light "
              alt=""
            />
          </div>
          <div className="text-white max-w-xl">
            <h2 className="text-[clamp(2rem,3vw,80px)] font-bold">{title}</h2>
            <p className="text-base md:text-lg mb-4">{overview}</p>

            <div className="mb-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FaClock />
                <p>{runtimeFormater(runtime)}</p>
              </div>

              <div className="flex items-center gap-1">
                {genres.map((genre) => (
                  <div key={genre._id}>
                    <p>• {genre.name}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <Calendar />
                <p>{formatYear(release_date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {showData?.theaters?.length > 0 ? (
                <Link to={`/showtime/${showData._id}`} className="btn-gradient">
                  <Ticket />
                  <span>Get Ticket</span>
                </Link>
              ) : (
                <button className="btn-gradient" onClick={handelNoShowMovies}>
                  <Ticket />
                  <span>Get Ticket</span>
                </button>
              )}
              <Link to="/" className="btn-ghost">
                <Play />
                <span>Trailer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-fluid flex items-center gap-6">
          <div className="flex-1">
            <SectionTitle title="Your Favorite Cast" />
            <div className="flex items-center flex-wrap gap-2">
              {casts.map((cast) => (
                <div
                  className="inline-flex flex-col items-center text-center"
                  key={cast.id}
                >
                  <img
                    alt=""
                    className="rounded-full h-20 md:h-20 aspect-square object-cover"
                    src={`${import.meta.env.VITE_TMDB_PATH}${
                      cast.profile_path
                    }`}
                  />
                  <p className="font-medium text-xs mt-3 text-white">
                    {cast.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-96 py-5 px-7 md:py-10 md:px-14 border border-primary-light rounded-2xl text-white space-y-8">
            <h2 className="text-white text-[clamp(1.3rem,2vw,1.5rem)] font-semibold">
              More Details
            </h2>
            <div className="space-y-4 text-white/80">
              <div className="flex items-center gap-1">
                <Earth />
                <p>Language: {original_language}</p>
              </div>

              <div className="flex items-center gap-1">
                <Star />
                <p>Rating: {vote_average}</p>
              </div>

              <div className="flex items-center gap-1">
                <Calendar />
                <p>Release: {farmateFullDate(release_date)}</p>
              </div>
              <div className="flex items-center gap-1">
                <PartyPopper />
                <p>Popularith: {popularity.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movie;

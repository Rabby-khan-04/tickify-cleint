import { Link, useParams } from "react-router";
import useMovie from "../../hooks/useMovie";
import Spinner from "../../components/shared/Loader/Spinner";
import { Calendar, Play, Star, Ticket } from "lucide-react";
import { farmateFullDate } from "../../utils/dateFormater";

const Movie = () => {
  const { movieId } = useParams();
  const { movieDetails, movieDetailsLoading } = useMovie(movieId);
  if (movieDetailsLoading) return <Spinner />;

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
                <Star />
                <p>{vote_average}</p>
              </div>

              <div className="flex items-center gap-1">
                <Calendar />
                <p>{farmateFullDate(release_date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link to={`/showtime/`} className="btn-gradient">
                <Ticket />
                <span>Get Ticket</span>
              </Link>
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
          <div className="flex-1"></div>
          <div className="w-96">
            <h2>More Details</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movie;

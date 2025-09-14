import { Calendar, Play, Star, Ticket } from "lucide-react";
import { Link } from "react-router";

const FeatureCard = ({ movie }) => {
  return (
    <div
      className="h-[300px] sm:h-full bg-center bg-cover bg-no-repeat rounded-xl  px-4 py-6 xl:py-6 xl:px-8 flex flex-col justify-end text-white relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(29, 231, 130, 0.0), rgba(0, 0, 0, 0.8)), url(${
          import.meta.env.VITE_TMDB_PATH
        }${movie?.poster_path})`,
      }}
    >
      <p className="movie-badge">New Relase</p>
      <h2 className="text-[clamp(1.2rem,2vw,42px)] font-bold mb-2">
        {movie?.title}
      </h2>
      <div className="mb-3 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          <Star />
          <p>{movie?.vote_average}</p>
        </div>

        <div className="flex items-center gap-1">
          <Calendar />
          <p>{movie?.release_date}</p>
        </div>
      </div>

      <div>
        <Link to="/" className="btn-gradient-sm">
          <Ticket />
          <span>Get Ticket</span>
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;

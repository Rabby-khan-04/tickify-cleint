import { Calendar, Star } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { title, poster_path, vote_average, release_date, id, movieId } = movie;

  const handleNavigate = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      onClick={() => handleNavigate(id || movieId)}
      className="w-full h-[300px] bg-center bg-cover bg-no-repeat rounded-xl p-6 flex flex-col justify-end text-white cursor-pointer"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${
          import.meta.env.VITE_TMDB_PATH
        }${poster_path})`,
      }}
    >
      <h3 className="text-[clamp(1.2rem,2vw,32px)] font-medium mb-2">
        {title}
      </h3>
      <div className="mb-3 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star />
          <p>{vote_average}</p>
        </div>

        <div className="flex items-center gap-1">
          <Calendar />
          <p>{release_date}</p>
        </div>
      </div>{" "}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object,
};

export default MovieCard;

import React from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";
import { BiSolidUpvote } from "react-icons/bi";
import { useNavigate } from "react-router";

const ShowCard = ({ movie }) => {
  const navigate = useNavigate();
  const { title, poster_path, vote_average, vote_count, id } = movie;

  const handleNavigate = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      onClick={() => handleNavigate(id)}
      className="max-w-56 md:max-w-80 cursor-pointer transform hover:-translate-y-4 transition-all duration-200 text-white"
    >
      <div className="rounded-xl overflow-hidden relative">
        <img src={`${import.meta.env.VITE_TMDB_PATH}${poster_path}`} alt="" />

        <div className="absolute left-0 right-0 bottom-0 w-full bg-dark/70 px-2 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center text-base gap-2">
            <FaStar className="text-xl text-primary" />
            <p>{vote_average.toFixed(1)}</p>
          </div>
          <div className="flex items-center text-base gap-2">
            <BiSolidUpvote className="text-xl text-primary" />
            <p>{vote_count}</p>
          </div>
        </div>
      </div>
      <div className="px-2 py-2">
        <p className="truncate font-medium">{title}</p>
      </div>
    </div>
  );
};

ShowCard.propTypes = {
  movie: PropTypes.object,
};

export default ShowCard;

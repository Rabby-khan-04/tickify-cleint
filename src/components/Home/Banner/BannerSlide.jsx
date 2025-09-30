import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Calendar, Play, Star, Ticket } from "lucide-react";
import { farmateFullDate } from "../../../utils/dateFormater";

const BannerSlide = ({ show }) => {
  const { _id, movie } = show;
  const {
    backdrop_path,
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
  } = movie;

  return (
    <div
      className="h-screen bg-cover bg-center pb-20 flex items-end"
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
            <Link to={`/showtime/${_id}`} className="btn-gradient">
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
    </div>
  );
};

BannerSlide.propTypes = {
  show: PropTypes.object,
};

export default BannerSlide;

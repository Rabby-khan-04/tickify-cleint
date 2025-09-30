import React from "react";
import PropTypes from "prop-types";
import { formatTime } from "../../../utils/dateFormater";

const ShowTime = ({ time, state = false, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(time);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`px-3 py-2 md:py-3 md:px-5 border rounded-lg inline-block cursor-pointer max-md:text-sm ${
        state
          ? "bg-primary border-primary text-dark"
          : "bg-transparent border-white text-white"
      }`}
    >
      <p>{formatTime(time)}</p>
    </div>
  );
};

ShowTime.propTypes = {
  time: PropTypes.string,
  state: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default ShowTime;

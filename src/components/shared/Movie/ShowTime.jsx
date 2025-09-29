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
      className={`text-white py-3 px-5 border rounded-lg inline-block cursor-pointer ${
        state ? "bg-primary border-primary" : "bg-transparent border-white"
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

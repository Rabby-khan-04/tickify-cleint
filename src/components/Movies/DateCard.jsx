import React from "react";
import PropTypes from "prop-types";
import {
  formatDay,
  formatMonth,
  formatWeakDay,
} from "../../utils/dateFormater";

const DateCard = ({ date, state = false, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(date);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`text-white text-center inline-block py-5 px-6 border rounded-lg cursor-pointer ${
        state ? "bg-primary border-primary" : "bg-transparent border-white"
      }`}
    >
      <p>
        <span>{formatDay(date)}</span> <span>{formatMonth(date)}</span>
      </p>
      <p className="text-xl font-bold">{formatWeakDay(date)}</p>
    </div>
  );
};

DateCard.propTypes = {
  date: PropTypes.string.isRequired,
  state: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default DateCard;

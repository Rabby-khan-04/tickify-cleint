import React from "react";
import PropTypes from "prop-types";

const SectionTitle = ({ title, className = "" }) => {
  return (
    <h2
      className={`text-[clamp(2rem,3vw,2rem)] text-white font-medium mb-5 ${className}`}
    >
      {title}
    </h2>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default SectionTitle;

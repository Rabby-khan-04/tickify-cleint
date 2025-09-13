import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router";

const DashboardNavLink = ({ items }) => {
  const { path, ICON, text } = items;
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `relative flex items-center md:pl-10 text-gray-400 gap-2 max-md:justify-center py-2.5 ${
          isActive && "bg-primary/15 text-primary"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <ICON />
          <span>{text}</span>
          <span
            className={`absolute ${
              isActive && "bg-primary"
            } right-0 top-0 w-1.5 rounded-l h-full z-10`}
          ></span>
        </>
      )}
    </NavLink>
  );
};

DashboardNavLink.propTypes = {
  items: PropTypes.object,
};

export default DashboardNavLink;

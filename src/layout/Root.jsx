import React, { Children, useEffect } from "react";
import PropTypes from "prop-types";
import useAuthStore from "../hooks/useAuthStore";

const Root = ({ children }) => {
  const { initializeAuthUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuthUser();

    return () => unsubscribe();
  }, [initializeAuthUser]);

  return children;
};

Root.propTypes = {
  children: PropTypes.node,
};

export default Root;

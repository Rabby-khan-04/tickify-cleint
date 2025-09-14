import React from "react";
import PropTypes from "prop-types";
import useAuthStore from "../hooks/useAuthStore";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuthStore();

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;

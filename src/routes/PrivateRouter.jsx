import PropTypes from "prop-types";
import useAuthStore from "../hooks/useAuthStore";
import Loader from "../components/shared/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { authUser, userInfo, isAuthLoading, isUserInfoLoading } =
    useAuthStore();
  const location = useLocation();

  if (isAuthLoading || isUserInfoLoading) return <Loader />;

  if (authUser && userInfo) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

PrivateRouter.propTypes = {
  children: PropTypes.node,
};

export default PrivateRouter;

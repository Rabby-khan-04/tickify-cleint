import logo from "../../../assets/brand/logo.png";
import { Link } from "react-router";
import avatar from "../../../assets/icon/profile.png";
import useAuthStore from "../../../hooks/useAuthStore";

const DashboardHeader = () => {
  const { userInfo } = useAuthStore();
  return (
    <header
      className={`py-4 px-8 z-50 transition-all duration-150 border-b border-primary-light/20 bg-dark}`}
    >
      <nav className="flex justify-between items-center">
        <div className="">
          <Link to="/">
            <img src={logo} alt="logo" className="h-7 md:h-10" />
          </Link>
        </div>

        <div className="">
          <img
            src={userInfo?.photo || avatar}
            className="size-8 rounded-full object-cover object-center"
            alt=""
          />
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;

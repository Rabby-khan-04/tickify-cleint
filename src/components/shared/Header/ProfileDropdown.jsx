import { ChevronDown, LogOut, Settings, Ticket } from "lucide-react";
import avatar from "../../../assets/icon/profile.png";
import PropTypes from "prop-types";
import { Link } from "react-router";

const ProfileDropdown = ({ dropDown, setDropDown }) => {
  return (
    <div className="relative">
      <div
        onClick={() => setDropDown((prev) => !prev)}
        className="flex items-center justify-end cursor-pointer gap-2"
      >
        <img
          src={avatar}
          className="size-8 rounded-full object-cover object-center"
          alt=""
        />

        <div className="max-lg:hidden space-y-1">
          <h4 className="text-sm text-white/80">Hi, Welcome</h4>
          <p className="text-sm lg:text-lg font-medium text-white">
            Albert Edison
          </p>
        </div>
        <div className="max-lg:hidden">
          <ChevronDown
            className={`text-white transform ${
              dropDown ? "rotate-180" : ""
            } transition-all duration-75`}
          />
        </div>
      </div>

      <div
        className={`absolute top-[130%] max-md:right-[-150%] md:right-0 bg-white w-72 md:w-80 rounded-2xl py-4 px-5 ${
          dropDown
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } overflow-hidden transition-all duration-75`}
      >
        <div className="flex items-center gap-5 pb-5">
          <img
            src={avatar}
            className="size-10 rounded-full object-cover object-center"
            alt=""
          />
          <div className="text-sm">
            <p className="font-medium text-dark">Albert Edison</p>
            <h4 className="text-text-dark">abcd@gmail.com</h4>
          </div>
        </div>

        <div className="">
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-4 text-text-muted text-sm py-2"
            onClick={() => setDropDown(false)}
          >
            <Settings className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          <Link
            to="/dashboard/bookings"
            className="flex items-center gap-4 text-text-muted text-sm py-2"
            onClick={() => setDropDown(false)}
          >
            <Ticket className="w-4 h-4" />
            <span>Bookings</span>
          </Link>
          <div className="flex items-center gap-4 text-text-muted text-sm py-2">
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  dropdown: PropTypes.bool,
  setDropDown: PropTypes.func,
};

export default ProfileDropdown;

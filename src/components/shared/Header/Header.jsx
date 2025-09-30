import { Link, NavLink } from "react-router";
import logo from "../../../assets/brand/logo.png";
import ProfileDropdown from "./ProfileDropdown";
import { Heart, LucideMenu, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "../../../hooks/useAuthStore";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { authUser } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY >= 92);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const toggleMenuAndDropdown = () => {
    setIsOpen((prev) => !prev);
    setDropDown(false);
  };

  const closeMenuAndDropdown = () => {
    setIsOpen(false);
    setDropDown(false);
  };

  const navLink = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `inline-block px-3 ${isActive && "text-primary"}`
          }
          to="/"
          onClick={closeMenuAndDropdown}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            `inline-block px-3 ${isActive && "text-primary"}`
          }
          to="/movies"
          onClick={closeMenuAndDropdown}
        >
          Movies
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            `inline-block px-3 ${isActive && "text-primary"}`
          }
          to="/contact"
          onClick={closeMenuAndDropdown}
        >
          contact
        </NavLink>
      </li>
    </>
  );

  return (
    <header
      className={`py-5 px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
        scrolling ? "bg-dark" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center">
        <div className="flex-1 ">
          <Link to="/">
            <img src={logo} alt="logo" className="h-9 md:h-12" />
          </Link>
        </div>

        <div
          className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:z-50 max-md:h-screen max-md:flex max-md:items-center max-md:justify-center max-md:bg-black/70 max-md:backdrop-blur overflow-hidden transition-all duration-300 ${
            isOpen ? "max-md:w-full" : "max-md:w-0"
          }`}
        >
          <XIcon
            className="h-6 w-6 absolute top-6 right-6 cursor-pointer md:hidden text-white"
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <ul className="text-white flex max-md:flex-col items-center justify-center text-2xl max-md:space-y-4 md:text-lg font-medium [&>li>a]:hover:text-primary [&>li>a]:transition-all [&>li>a]:duration-150 ">
            {navLink}
          </ul>
        </div>

        <div className="flex-1 flex items-center justify-end gap-4">
          {authUser ? (
            <>
              <Link
                to="/favorite"
                className="inline-block border border-border/80 p-2 rounded-full max-md:hidden"
              >
                <Heart className="h-5 w-5 text-white" />
              </Link>
              <div className="h-5 w-px bg-white/70 max-md:hidden"></div>
              <ProfileDropdown dropDown={dropDown} setDropDown={setDropDown} />
            </>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}

          <LucideMenu
            className="md:hidden h-7 w-7 cursor-pointer text-white"
            onClick={toggleMenuAndDropdown}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;

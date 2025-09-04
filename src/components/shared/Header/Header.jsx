import { Link, NavLink } from "react-router";
import logo from "../../../assets/brand/logo.png";
import ProfileDropdown from "./ProfileDropdown";
import { Heart, LucideMenu, XIcon } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = true;

  const navLink = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `inline-block px-3 ${isActive && "text-primary"}`
          }
          to="/"
          onClick={() => setIsOpen(false)}
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
          onClick={() => setIsOpen(false)}
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
          onClick={() => setIsOpen(false)}
        >
          contact
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="py-5 px-8">
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
            className="h-6 w-6 absolute top-6 right-6 cursor-pointer md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <ul className="flex max-md:flex-col items-center justify-center text-2xl max-md:space-y-4 md:text-lg font-medium [&>li>a]:hover:text-primary [&>li>a]:transition-all [&>li>a]:duration-150 ">
            {navLink}
          </ul>
        </div>

        <div className="flex-1 flex items-center justify-end">
          {user ? (
            <>
              <Link
                to="/dashboard/favorite"
                className="mr-5 lg:mr-8 inline-block border border-border/80 p-2 rounded-full"
              >
                <Heart className="h-4 w-4 md:h-6 md:w-6" />
              </Link>
              <ProfileDropdown />
            </>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}

          <LucideMenu
            className="md:hidden h-7 w-7 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;

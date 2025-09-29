import { NavLink } from "react-router";
import avatar from "../../../assets/icon/profile.png";
import DashboardNavLink from "./DashboardNavLink";
import {
  LayoutDashboard,
  ListTodo,
  Settings,
  Videotape,
  SquareUser,
  TicketCheck,
  LogOut,
  PlusSquare,
  Theater,
} from "lucide-react";
import useAuthStore from "../../../hooks/useAuthStore";

const DashboardNav = () => {
  const { userInfo, isAdmin, logOutUser } = useAuthStore();
  const adminNavLinks = [
    {
      path: "/dashboard/admin",
      text: "Dashboard",
      ICON: LayoutDashboard,
    },
    {
      path: "/dashboard/admin/add-show",
      text: "Add Show",
      ICON: PlusSquare,
    },
    {
      path: "/dashboard/admin/manage-movies",
      text: "Movies",
      ICON: Videotape,
    },
    {
      path: "/dashboard/admin/shows",
      text: "Shows",
      ICON: TicketCheck,
    },
    {
      path: "/dashboard/admin/theaters",
      text: "Theaters",
      ICON: Theater,
    },
    {
      path: "/dashboard/admin/bookings",
      text: "Bookings",
      ICON: ListTodo,
    },
    {
      path: "/dashboard/admin/users",
      text: "Users",
      ICON: SquareUser,
    },
  ];

  return (
    <aside className="shrink-0 max-w-13 md:max-w-60 w-full h-full border-r border-primary-light/20 pt-8 flex flex-col justify-between">
      <div>
        <div className="text-center space-y-2">
          <img
            src={userInfo?.photo || avatar}
            className="sh-9 md:h-14 w-9 md:w-14 rounded-full mx-auto object-cover"
            alt=""
          />
          <p className="max-md:hidden text-sm lg:text-lg font-medium text-white">
            {userInfo?.name || "Albert Edison"}
          </p>
        </div>

        <div className="mt-6">
          <DashboardNavLink
            key="/dashboard/profile"
            items={{
              path: "/dashboard/profile",
              text: "Profile",
              ICON: Settings,
            }}
          />
          {isAdmin &&
            adminNavLinks.map((items) => (
              <DashboardNavLink key={items.path} items={items} />
            ))}
        </div>
      </div>

      <div className="border-t border-primary-light/20">
        <div
          onClick={logOutUser}
          className="flex items-center md:pl-10 text-gray-400 gap-2 max-md:justify-center py-2.5 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="max-md:hidden">Sign out</span>
        </div>
      </div>
    </aside>
  );
};

export default DashboardNav;

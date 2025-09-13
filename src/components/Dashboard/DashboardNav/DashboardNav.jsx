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
} from "lucide-react";

const DashboardNav = () => {
  const adminNavLinks = [
    {
      path: "/dashboard/admin",
      text: "Dashboard",
      ICON: LayoutDashboard,
    },
    {
      path: "/dashboard/admin/add-show",
      text: "Add Show",
      ICON: LayoutDashboard,
    },
    {
      path: "/dashboard/admin/bookings",
      text: "Bookings",
      ICON: ListTodo,
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
      path: "/dashboard/admin/users",
      text: "Users",
      ICON: SquareUser,
    },
  ];

  return (
    <aside className="max-w-13 md:max-w-60 w-full h-[calc(100vh-65px)] md:h-[calc(100vh-73px)] shrink-0 border-r border-primary-light/20 pt-8">
      <div className="text-center space-y-2">
        <img
          src={avatar}
          className="sh-9 md:h-14 w-9 md:w-14 rounded-full mx-auto object-cover"
          alt=""
        />
        <p className="text-sm lg:text-lg font-medium text-white">
          Albert Edison
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
        {adminNavLinks.map((items) => (
          <DashboardNavLink key={items.path} items={items} />
        ))}
      </div>
    </aside>
  );
};

export default DashboardNav;

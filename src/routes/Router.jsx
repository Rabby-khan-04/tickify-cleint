import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddShowtime from "../pages/Admin/AddShowtime";
import AllBookings from "../pages/Admin/AllBookings";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Admin/Dashboard";
import ManageMovies from "../pages/Admin/ManageMovies";
import ManageShowtimes from "../pages/Admin/ManageShowtimes";
import Users from "../pages/Admin/Users";
import Profile from "../pages/User/Profile";
import Bookings from "../pages/Booking/Bookings";
import BookingDetails from "../pages/Booking/BookingDetails";
import Checkout from "../pages/Booking/Checkout";
import Movies from "../pages/Movie/Movies";
import Seat from "../pages/Movie/Seat";
import Movie from "../pages/Movie/Movie";
import PaymentSuccess from "../pages/Booking/PaymentSuccess";
import TicketDetails from "../pages/Booking/TicketDetails";
import Favorite from "../pages/User/Favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "seat",
    element: <Seat />,
  },

  {
    path: "movie",
    element: <Movie />,
  },

  {
    path: "payment-success",
    element: <PaymentSuccess />,
  },

  {
    path: "ticket",
    element: <TicketDetails />,
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin",
        element: <Dashboard />,
      },
      {
        path: "admin/add-show",
        element: <AddShowtime />,
      },
      {
        path: "admin/bookings",
        element: <AllBookings />,
      },
      {
        path: "admin/manage-movies",
        element: <ManageMovies />,
      },
      {
        path: "admin/shows",
        element: <ManageShowtimes />,
      },
      {
        path: "admin/users",
        element: <Users />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "booking/:id",
        element: <BookingDetails />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
    ],
  },
]);

export default router;

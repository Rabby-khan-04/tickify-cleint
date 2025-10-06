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
import Movies from "../pages/Movie/Movies";
import Seat from "../pages/Movie/Seat";
import PaymentSuccess from "../pages/Booking/PaymentSuccess";
import TicketDetails from "../pages/Booking/TicketDetails";
import Favorite from "../pages/User/Favorite";
import Root from "../layout/Root";
import PrivateRouter from "./PrivateRouter";
import AdminRoute from "./AdminRoute";
import Theaters from "../pages/Admin/Theaters";
import Showtime from "../pages/Booking/Showtime";
import Movie from "../pages/Movie/Movie";
import PaymentLoading from "../components/shared/Loader/PaymentLoading";
import axiosSecure from "../utils/axiosSecure";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Root>
        <Main />
      </Root>
    ),
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
        path: "movies",
        element: <Movies />,
      },
      {
        path: "bookings",
        element: <Bookings />,
        loader: () => axiosSecure.get("/bookings/my-booking-count"),
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "showtime/:showId",
        element: <Showtime />,
      },
      {
        path: "movie/:movieId",
        element: <Movie />,
      },
    ],
  },

  {
    path: "register",
    element: <Register />,
  },
  {
    path: "loading/:nextUrl",
    element: <PaymentLoading />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "booking-details",
    element: <BookingDetails />,
  },
  {
    path: "seat",
    element: <Seat />,
  },
  {
    path: "success",
    element: <PaymentSuccess />,
  },

  {
    path: "ticket",
    element: (
      <PrivateRouter>
        <TicketDetails />
      </PrivateRouter>
    ),
  },

  {
    path: "dashboard",
    element: (
      <Root>
        <PrivateRouter>
          <DashboardLayout />
        </PrivateRouter>
      </Root>
    ),
    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "admin/add-show",
        element: (
          <AdminRoute>
            <AddShowtime />
          </AdminRoute>
        ),
      },
      {
        path: "admin/theaters",
        element: (
          <AdminRoute>
            <Theaters />
          </AdminRoute>
        ),
      },
      {
        path: "admin/bookings",
        element: (
          <AdminRoute>
            <AllBookings />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-movies",
        element: (
          <AdminRoute>
            <ManageMovies />
          </AdminRoute>
        ),
      },
      {
        path: "admin/shows",
        element: (
          <AdminRoute>
            <ManageShowtimes />
          </AdminRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;

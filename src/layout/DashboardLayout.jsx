import { Outlet } from "react-router";
import Header from "../components/shared/Header/Header";
import Footer from "../components/shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DashboardLayout;

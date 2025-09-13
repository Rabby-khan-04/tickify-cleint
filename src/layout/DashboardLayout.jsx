import { Outlet } from "react-router";
import DashboardHeader from "../components/shared/Dashboard/DashboardHeader";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <main className="flex">
        <DashboardNav />
        <section className="flex-1">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;

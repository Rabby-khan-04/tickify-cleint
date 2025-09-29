import { Outlet } from "react-router";
import DashboardHeader from "../components/shared/Dashboard/DashboardHeader";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <main className="flex h-[calc(100vh-73px)]">
        <DashboardNav />
        <section className="flex-1 p-6 md:p-10 min-w-0 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;

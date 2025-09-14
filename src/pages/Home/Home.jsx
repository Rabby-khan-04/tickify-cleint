import Banner from "../../components/Home/Banner/Banner";
import NowShowing from "../../components/Home/NowShowing/NowShowing";
import Promotion from "../../components/Home/Promotion/Promotion";
import UpcomingMovies from "../../components/Home/UpcomingMovies/UpcomingMovies";
import useAuthStore from "../../hooks/useAuthStore";

const Home = () => {
  const { authUser } = useAuthStore();

  console.log(authUser);
  return (
    <main>
      <Banner />
      <NowShowing />
      <UpcomingMovies />
      <Promotion />
    </main>
  );
};

export default Home;

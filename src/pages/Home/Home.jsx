import Banner from "../../components/Home/Banner/Banner";
import NowShowing from "../../components/Home/NowShowing/NowShowing";
import UpcomingMovies from "../../components/Home/UpcomingMovies/UpcomingMovies";

const Home = () => {
  return (
    <main>
      <Banner />
      <NowShowing />
      <UpcomingMovies />
    </main>
  );
};

export default Home;

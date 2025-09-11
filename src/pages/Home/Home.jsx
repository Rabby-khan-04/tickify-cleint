import Banner from "../../components/Home/Banner/Banner";
import NowShowing from "../../components/Home/NowShowing/NowShowing";
import Promotion from "../../components/Home/Promotion/Promotion";
import UpcomingMovies from "../../components/Home/UpcomingMovies/UpcomingMovies";

const Home = () => {
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

import NowShowingMovies from "../../components/Movies/NowShowingMovies";
import UpcomingShows from "../../components/Movies/UpcomingShows";
import TitleBanner from "../../components/shared/TitleBanner/TitleBanner";

const Movies = () => {
  return (
    <main className="">
      <TitleBanner title="Movies" />
      <NowShowingMovies />
      <UpcomingShows />
    </main>
  );
};

export default Movies;

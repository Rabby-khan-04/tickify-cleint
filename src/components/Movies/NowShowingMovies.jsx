import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import { fetchNowPlaying } from "../../utils/fetchShows";
import ShowCard from "../shared/Movie/ShowCard";
import Spinner from "../shared/Loader/Spinner";
import BlurCircle from "../shared/BlurCircle/BlurlCircle";

const NowShowingMovies = () => {
  const { data: nowPlayingMovies, isLoading: movieLoading } = useQuery({
    queryKey: ["now-playing"],
    queryFn: fetchNowPlaying,
  });

  if (movieLoading) return <Spinner />;

  return (
    <section className="p-top relative">
      <BlurCircle top="100px" left="0" />
      <BlurCircle bottom="100px" right="0" />
      <div className="container-fluid">
        <SectionTitle title="Now Showing" className="text-center text-white" />

        <div className="flex items-center justify-center flex-wrap gap-8 mt-4">
          {nowPlayingMovies.map((movie) => (
            <ShowCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NowShowingMovies;

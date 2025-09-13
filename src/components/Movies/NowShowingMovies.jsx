import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import { fetchNowPlaying } from "../../utils/fetchShows";
import ShowCard from "../shared/Movie/ShowCard";

const NowShowingMovies = () => {
  const { data: nowPlayingMovies, isLoading: movieLoading } = useQuery({
    queryKey: ["now-playing"],
    queryFn: fetchNowPlaying,
  });

  if (movieLoading) return <h1>Loading</h1>;

  return (
    <section className="p-top">
      <div className="container-fluid">
        <SectionTitle title="Now Showing" className="text-center" />

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

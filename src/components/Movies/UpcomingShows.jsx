import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingMovies } from "../../utils/fetchShows";
import ShowCard from "../shared/Movie/ShowCard";
import SectionTitle from "../shared/SectionTitle/SectionTitle";

const UpcomingShows = () => {
  const { data: upcomingMovies, isLoading: movieLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: fetchUpcomingMovies,
  });

  if (movieLoading) return <h1>Loading</h1>;

  return (
    <section className="p-top">
      <div className="container-fluid">
        <SectionTitle title="Upcoming Shows" className="text-center" />

        <div className="flex items-center justify-center flex-wrap gap-8 mt-4">
          {upcomingMovies.map((movie) => (
            <ShowCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingShows;

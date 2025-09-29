import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const useAllMovies = () => {
  const {
    data: allmovies,
    isLoading: allMoviesLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["all-movies"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/movies");
        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching All Movies: ${error}`);
      }
    },
  });

  return { allmovies, allMoviesLoading, isError, isPending };
};

export default useAllMovies;

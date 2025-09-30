import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../utils/axiosPublic";

const useMovie = (movieId) => {
  const {
    data: movieDetails,
    isLoading: movieDetailsLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: async ({ queryKey }) => {
      try {
        const [_key, movieId] = queryKey;
        const res = await axiosPublic.get(`/movies/${movieId}`);

        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Movie: ${error}`);
      }
    },
    enabled: !!movieId,
  });

  return { movieDetails, movieDetailsLoading, isError, isPending };
};

export default useMovie;

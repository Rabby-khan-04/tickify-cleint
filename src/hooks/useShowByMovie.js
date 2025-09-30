import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../utils/axiosPublic";

const useShowByMovie = (movieId) => {
  const {
    data: showData,
    isLoading: showDataLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["show-by-movie", movieId],
    queryFn: async ({ queryKey }) => {
      const [_key, movieId] = queryKey;
      const res = await axiosPublic.get(`/showtimes/movie/${movieId}`);

      return res.data?.data;
    },
    enabled: !!movieId,
  });

  return { showData, showDataLoading, isError, isPending };
};

export default useShowByMovie;

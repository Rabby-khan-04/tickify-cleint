import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const useAllShow = () => {
  const {
    data: allShows,
    isLoading: allShowsLoading,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["all-show"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/showtimes/all");

        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching All Shows: ${error}`);
      }
    },
  });

  return { allShows, allShowsLoading, isPending, isError };
};

export default useAllShow;

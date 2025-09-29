import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../utils/axiosPublic";

const useUpcomingShows = () => {
  const {
    data: upcomingShows,
    isLoading: upcomingShowsLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["upcoming-shows"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/showtimes/upcoming");

        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Upcoming Shows: ${error}`);
      }
    },
  });

  return { upcomingShows, upcomingShowsLoading, isError, isPending };
};

export default useUpcomingShows;

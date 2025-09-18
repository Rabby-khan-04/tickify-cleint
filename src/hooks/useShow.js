import { useQuery } from "@tanstack/react-query";
import { fetchNowPlaying } from "../utils/fetchShows";

const useShow = () => {
  const {
    data: nowPlayingShows,
    isLoading: nowPlayingShowsLoading,
    isError,
  } = useQuery({
    queryKey: ["now-playing"],
    queryFn: fetchNowPlaying,
  });

  return { nowPlayingShows, nowPlayingShowsLoading, isError };
};

export default useShow;

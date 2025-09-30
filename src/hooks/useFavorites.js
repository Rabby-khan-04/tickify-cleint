import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../utils/axiosPublic";

const useFavorites = () => {
  const {
    data: favorites,
    isLoading: favoritesLoading,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/users/favorites");
        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Favorites: ${error}`);
      }
    },
  });

  return { favorites, favoritesLoading, isError, isPending };
};

export default useFavorites;

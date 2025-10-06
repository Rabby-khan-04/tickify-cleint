import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const useBookings = () => {
  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/my");
      return res.data?.data;
    },
  });

  return { bookings, bookingsLoading, isError, isPending };
};

export default useBookings;

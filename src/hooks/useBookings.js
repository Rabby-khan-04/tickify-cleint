import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const useBookings = (page, limit) => {
  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["bookings", page, limit],
    queryFn: async ({ queryKey }) => {
      const [_key, page, limit] = queryKey;
      const res = await axiosSecure.get("/bookings/my", {
        params: { page, limit },
      });

      console.log(page, limit);
      return res.data?.data;
    },
    enabled: page !== undefined && page !== null && !!limit,
  });

  return { bookings, bookingsLoading, isError, isPending };
};

export default useBookings;

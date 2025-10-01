import { useQuery } from "@tanstack/react-query";

const useBookedSeats = (info) => {
  const {
    data: bookedSeat,
    isLoading: bookedSeatLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["bookedSeat", info],
    queryFn: async ({ queryKey }) => {
      try {
        const [_key, info] = queryKey;
        console.log(info);
      } catch (error) {
        console.log(`ERROR While Fetching Booked Seat: ${error}`);
      }
    },
  });

  return { bookedSeat, bookedSeatLoading, isError, isPending };
};

export default useBookedSeats;

import { useMutation } from "@tanstack/react-query";
import axiosPublic from "../utils/axiosPublic";

const useAddBooking = () => {
  const {
    mutate: addBooking,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["add-booking"],
    mutationFn: async (bookingDetails) => {
      try {
        const { date, time, ...rest } = bookingDetails;

        const res = await axiosPublic.post(`/bookings/${date}/${time}`, rest);
        console.log(res);
        return res;
      } catch (error) {
        console.log(`ERROR While Booking Show: ${error}`);
      }
    },
  });

  return { addBooking, isPending, isError };
};

export default useAddBooking;

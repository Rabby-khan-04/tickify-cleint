import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set) => ({
      theater: null,
      price: null,
      date: null,
      time: null,
      showId: null,
      movie: null,

      setBookingData: (data) => set(() => ({ ...data })),
      clearBookingData: () =>
        set(() => ({
          theater: null,
          date: null,
          time: null,
          showId: null,
          movie: null,
        })),
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useBookingStore;

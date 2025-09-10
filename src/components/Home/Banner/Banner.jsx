import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../utils/axiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import BannerSlide from "./BannerSlide";
import SliderNav from "./SliderNav";
import { useState } from "react";

const Banner = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const { data: nowPlayingMovies, isLoading: movieLoading } = useQuery({
    queryKey: ["now-playing"],
    queryFn: async () => {
      try {
        const movie = await axiosPublic.get("/movies/now-playing");

        return movie?.data?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (movieLoading) return <h1>Loading</h1>;
  return (
    <section className="relative">
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} px-2 py-2 inline-block bg-gradient-to-br from-white/20 to-white/40 text-white rounded-full cursor-pointer"></span>`;
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {nowPlayingMovies.slice(0, 4).map((movie) => (
          <SwiperSlide key={movie.id}>
            <BannerSlide movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderNav swiper={swiperRef} />
      <div className="custom-pagination absolute z-30 bottom-6 lg:bottom-20 w-full hidden md:flex items-center justify-center gap-2"></div>
    </section>
  );
};

export default Banner;

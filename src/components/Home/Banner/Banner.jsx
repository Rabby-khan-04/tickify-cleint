import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
// import "swiper/css/navigation";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import BannerSlide from "./BannerSlide";
import SliderNav from "./SliderNav";
import { useState } from "react";
import { fetchNowPlaying } from "../../../utils/fetchShows";
import Spinner from "../../shared/Loader/Spinner";

const Banner = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const { data: nowPlayingMovies, isLoading: movieLoading } = useQuery({
    queryKey: ["now-playing"],
    queryFn: fetchNowPlaying,
  });

  if (movieLoading) return <Spinner />;
  return (
    <section className="relative">
      <Swiper
        onSwiper={setSwiperRef}
        effect={"fade"}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} px-2 py-2 inline-block bg-gradient-to-br from-white/20 to-white/40 text-white rounded-full cursor-pointer"></span>`;
          },
        }}
        modules={[Pagination, Autoplay, EffectFade]}
        className="mySwiper"
      >
        {nowPlayingMovies.slice(0, 4).map((movie) => (
          <SwiperSlide key={movie.id}>
            <BannerSlide movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderNav
        swiper={swiperRef}
        className="bottom-4 right-20 lg:bottom-20"
      />
      <div className="custom-pagination absolute z-30 bottom-6 lg:bottom-20 w-full hidden md:flex items-center justify-center gap-2"></div>
    </section>
  );
};

export default Banner;

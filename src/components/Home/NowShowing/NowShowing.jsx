import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { Autoplay, Grid } from "swiper/modules";
import MovieCard from "../../shared/Movie/MovieCard";
import FeatureCard from "./FeatureCard";
import { useState } from "react";
import SliderNav from "../Banner/SliderNav";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import BlurCircle from "../../shared/BlurCircle/BlurlCircle";
import Spinner from "../../shared/Loader/Spinner";
import useUpcomingShows from "../../../hooks/useUpcomingShows";

const NowShowing = () => {
  const { upcomingShows, upcomingShowsLoading } = useUpcomingShows();
  const [swiperRef, setSwiperRef] = useState(null);

  if (upcomingShowsLoading) return <Spinner />;

  return (
    <section className="p-top relative z-30 overflow-x-hidden">
      <BlurCircle top="100px" right="-200px" />

      <div className="container-fluid">
        <div className="relative">
          <SectionTitle title="Now Showing" />
          <SliderNav swiper={swiperRef} className="top-0 right-0" />
        </div>

        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 md:grid-cols-7 gap-[30px]">
          <div className="md:col-span-3 xl:col-span-2">
            <FeatureCard show={upcomingShows[0]} />
          </div>
          <div className="md:col-span-4 xl:col-span-5">
            <Swiper
              onSwiper={setSwiperRef}
              grid={{
                rows: 2,
                fill: "row",
              }}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Grid, Autoplay]}
              className="mySwiper"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  grid: { rows: 1 },
                },
                1024: {
                  slidesPerView: 1.5,
                  slidesPerGroup: 1,
                  grid: { rows: 2 },
                },
                1280: {
                  slidesPerView: 2.5,
                  slidesPerGroup: 2,
                  grid: { rows: 2 },
                },
              }}
            >
              {upcomingShows?.slice(1)?.map((show) => (
                <SwiperSlide key={show._id}>
                  <MovieCard movie={show.movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowShowing;

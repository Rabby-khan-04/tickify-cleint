import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingMovies } from "../../../utils/fetchShows";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import MovieCard from "../../shared/Movie/MovieCard";
import SliderNav from "../Banner/SliderNav";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";

const UpcomingMovies = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const { data: upcomingMovies, isLoading: movieLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: fetchUpcomingMovies,
  });

  if (movieLoading) return <h1>Loading</h1>;
  return (
    <section className="p-top">
      <div className="container-fluid">
        <div className="relative">
          <SectionTitle title="Coming Soon" />
          <SliderNav swiper={swiperRef} className="top-0 right-0" />
        </div>

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
            768: {
              slidesPerView: 2.5,
              slidesPerGroup: 2,
              grid: { rows: 2 },
            },
            1024: {
              slidesPerView: 3.5,
              slidesPerGroup: 3,
              grid: { rows: 2 },
            },
          }}
        >
          {upcomingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingMovies;

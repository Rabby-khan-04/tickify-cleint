import { useState } from "react";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import useNowPlayingShow from "../../hooks/useNowPlayingShow";
import SliderNav from "../../components/Home/Banner/SliderNav";
import ShowCard from "../../components/shared/Movie/ShowCard";
import { FaCheck } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import useTheaters from "../../hooks/useTheaters";
import TheaterPill from "../../components/shared/Theater/TheaterPill";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SlCalender } from "react-icons/sl";
import { Delete } from "lucide-react";
import axiosSecure from "../../utils/axiosSecure";

const AddShowtime = () => {
  const { nowPlayingShows, nowPlayingShowsLoading } = useNowPlayingShow();
  const { theaters, theatersLoading } = useTheaters();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [swiperRef, setSwiperRef] = useState(null);
  const [showPrice, setShowPrice] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { price, datetime } = data;
    const [date, time] = datetime.split("T");

    const dateExist = selectedDateTime.find(
      (dateTime) => dateTime.date === date
    );

    if (!dateExist) {
      selectedDateTime.push({ date, showtimes: [time] });
    } else {
      const isTimeExist = dateExist?.showtimes.find(
        (savedTime) => savedTime === time
      );

      if (!isTimeExist) {
        dateExist?.showtimes.push(time);
      } else {
        toast.error("Date Time alrady Exist!!");
      }
    }

    setShowPrice(price);
  };

  const handleDeleteDateTime = (date, time) => {
    const dateTime = selectedDateTime.find(
      (dateAndTime) => dateAndTime.date === date
    );

    const filteredTime = dateTime.showtimes.filter(
      (savedTime) => savedTime !== time
    );

    if (filteredTime.length === 0) {
      const filterTime = selectedDateTime.filter(
        (savedDate) => savedDate.date !== date
      );
      setSelectedDateTime(filterTime);
    } else {
      const filteredDateAndTime = selectedDateTime.map((savedDateTime) => {
        if (savedDateTime.date === date) {
          savedDateTime.showtimes = filteredTime;
        }

        return savedDateTime;
      });

      setSelectedDateTime(filteredDateAndTime);
    }
  };

  const handleAddShow = () => {
    if (!selectedMovie) {
      toast.error("Select A Movie");
      return;
    } else if (!selectedTheater) {
      toast.error("Select A Theater");
      return;
    } else if (!showPrice) {
      toast.error("Add Show Price");
      return;
    } else if (!selectedDateTime) {
      toast.error("Select Date & Time");
      return;
    }

    const showData = {
      movieId: selectedMovie,
      theaters: [
        {
          theaterId: selectedTheater,
          price: showPrice,
          dates: selectedDateTime,
        },
      ],
    };

    axiosSecure
      .post("/showtimes", showData)
      .then(() => {
        setShowPrice(null);
        setSelectedMovie(null);
        setSelectedTheater(null);
        setSelectedDateTime([]);
        toast.success("Show Added Successfully!!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (nowPlayingShowsLoading || theatersLoading) return <Spinner />;

  return (
    <div className="">
      <div className="relative">
        <SectionTitle title="Add Show" />
        <SliderNav swiper={swiperRef} className="top-0 right-0" />
      </div>

      <div className="space-y-6">
        <div className="">
          <h2 className="text-2xl text-primary mb-5">Select A Movie:</h2>
          <div className="text-white group">
            <Swiper
              onSwiper={setSwiperRef}
              slidesPerView={8.5}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode]}
              className="mySwiper"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                450: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                },

                1560: {
                  slidesPerView: 8.5,
                },
              }}
            >
              {nowPlayingShows.map((show) => (
                <SwiperSlide key={show.id}>
                  <div
                    className="group-hover:not-hover:opacity-40 relative"
                    onClick={() => setSelectedMovie(show.id)}
                  >
                    <ShowCard movie={show} />
                    {selectedMovie === show.id && (
                      <div className="absolute top-2 right-2 p-1 bg-primary rounded-md text-dark">
                        <FaCheck className="text-lg" />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="">
          <h2 className="text-2xl text-primary mb-5">Select Theater:</h2>
          <div className="space-x-4 space-y-4">
            {theaters.map((theater) => (
              <TheaterPill
                key={theater._id}
                theater={theater}
                onSelect={(theaterId) => setSelectedTheater(theaterId)}
                state={theater._id === selectedTheater}
              />
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="text-2xl text-primary mb-5">Select Theater:</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-end gap-2 md:gap-5 flex-wrap"
          >
            <div className="flex flex-col gap-1 md:gap-2 grow">
              <label
                htmlFor="price"
                className={`text-base block ${
                  errors.price ? "text-red-400" : "text-white/80"
                }`}
              >
                Price*
              </label>
              <input
                type="number"
                id="price"
                className={`outline-0 focus:outline-0 border ${
                  errors.theater ? "border-red-400" : "border-white/50"
                } rounded-md px-4 py-2 w-full block placeholder:text-white/60 text-white/80`}
                placeholder="Enter ticket price"
                {...register("price", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-1 md:gap-2 grow">
              <label
                htmlFor="datetime"
                className={`text-base block ${
                  errors.datetime ? "text-red-400" : "text-white/80"
                }`}
              >
                Date & Time*
              </label>
              <input
                type="datetime-local"
                id="datetime"
                className={`outline-0 focus:outline-0 border ${
                  errors.theater ? "border-red-400" : "border-white/50"
                } rounded-md px-4 py-2 w-full block placeholder:text-white/60 text-white/80`}
                placeholder="Enter date and time"
                {...register("datetime", { required: true })}
              />
            </div>

            <button type="submit" className="btn max-xl:w-full">
              Add Time and Price
            </button>
          </form>
        </div>

        {selectedDateTime.length && (
          <div className="">
            <h2 className="text-xl text-white/80 mb-5">
              Selected Date & Time:
            </h2>

            <div className="space-y-2">
              {selectedDateTime.map((dateAndTime) => (
                <div key={dateAndTime.date} className="text-white/80 space-y-1">
                  <div className="flex items-center gap-2 ">
                    <SlCalender />
                    <h3>{dateAndTime.date}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {dateAndTime.showtimes.map((time) => (
                      <div
                        key={time}
                        className="inline-flex items-center gap-2 py-1 px-2 border rounded-md border-primary/60 group hover:border-primary"
                        onClick={() =>
                          handleDeleteDateTime(dateAndTime.date, time)
                        }
                      >
                        <p>{time}</p>
                        <Delete className="text-primary/60 group-hover:text-primary cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="btn mt-5" onClick={handleAddShow}>
              Add Show
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddShowtime;

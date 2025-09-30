import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import axiosPublic from "../../utils/axiosPublic";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import { runtimeFormater } from "../../utils/runtimeFormater";
import {
  farmateFullDate,
  formatTime,
  formatYear,
} from "../../utils/dateFormater";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import TheaterPill from "../../components/shared/Theater/TheaterPill";
import DateCard from "../../components/Movies/DateCard";
import { useEffect, useState } from "react";
import ShowTime from "../../components/shared/Movie/ShowTime";
import toast from "react-hot-toast";
import BlurCircle from "../../components/shared/BlurCircle/BlurlCircle";

const Showtime = () => {
  const { showId } = useParams();
  const [theaters, setTheaters] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { data: show, isLoading: showLoading } = useQuery({
    queryKey: ["show", showId],
    queryFn: async ({ queryKey }) => {
      try {
        const [_key, showId] = queryKey;
        const res = await axiosPublic.get(`/showtimes/${showId}`);

        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Show: ${error}`);
      }
    },

    enabled: !!showId,
  });

  const { data: theaterData, isLoading: theaterIsLoading } = useQuery({
    queryKey: ["single-theater", selectedTheater],
    queryFn: async ({ queryKey }) => {
      const [_key, selectedTheater] = queryKey;
      try {
        const res = await axiosPublic.get(`/theaters/${selectedTheater}`);
        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Theater: ${error}`);
      }
    },
    enabled: !!selectedTheater,
  });

  useEffect(() => {
    if (!show) return;
    if (show) {
      const allTheater = [];
      const allDates = [];
      const allTimes = [];

      show.theaters.forEach((theater) => {
        allTheater.push(theater.theaterId);
        theater.dates.forEach((date) => {
          if (!allDates.includes(date.date)) {
            allDates.push(date.date);
          }
          date.showtimes.forEach((time) => {
            allTimes.push(time.time);
          });
        });
      });

      setTheaters(allTheater);
      setDate(allDates);
      setTime(allTimes);
    }
    if (selectedTheater) {
      const newTheaters = [];
      const newDates = [];
      let newTime = [];

      const restTheater = show.theaters.filter(
        (theater) => theater.theaterId._id === selectedTheater
      );

      restTheater.forEach((theater) => {
        newTheaters.push(theater.theaterId);
        theater.dates.forEach((date) => {
          newDates.push(date.date);
          date.showtimes.forEach((time) => {
            newTime.push(time.time);
          });
        });
      });

      setDate(newDates);
      setTime(newTime);

      if (selectedDate) {
        newTime = [];
        const restTime = restTheater[0].dates.filter(
          (date) => date.date === selectedDate
        );

        restTime.forEach((dateTime) => {
          dateTime.showtimes.forEach((time) => {
            newTime.push(time.time);
          });
        });

        setTime(newTime);
      }
    }
  }, [show, selectedTheater, selectedDate]);

  if (showLoading || theaterIsLoading) return <Spinner />;

  const { movie } = show;

  const {
    title,
    poster_path,
    release_date,
    original_language,
    tagline,
    runtime,
    // overview,
  } = movie;

  const handelDateSelection = (currDate) => {
    if (!selectedTheater) {
      toast("Select A Theater", { icon: "⚠️" });
      return;
    }

    setSelectedDate(currDate);
    setSelectedTime("");
  };
  const handelTimeSelection = (currTime) => {
    if (!selectedDate) {
      toast("Pick A Date First", { icon: "⚠️" });
      return;
    }

    setSelectedTime(currTime);
  };

  return (
    <main className="py-20 lg:py-32 overflow-x-hidden">
      <section className="relative ">
        <BlurCircle top="-100px" right="0" />
        <BlurCircle bottom="-100px" left="-100px" />
        <div className="container-fluid flex max-md:flex-col-reverse gap-6">
          <div className="flex-1 flex flex-col justify-between gap-5">
            <div>
              <SectionTitle title="Theater" />
              <div className="flex items-center gap-2">
                {theaters.map((theater) => (
                  <TheaterPill
                    key={theater._id}
                    theater={theater}
                    state={theater._id === selectedTheater}
                    onSelect={(theaterId) => setSelectedTheater(theaterId)}
                  />
                ))}
              </div>
            </div>
            <div>
              <SectionTitle title="Date" />
              <div className="flex items-center gap-2">
                {date.map((date, idx) => (
                  <DateCard
                    key={idx}
                    date={date}
                    onSelect={(currDate) => handelDateSelection(currDate)}
                    state={selectedDate === date}
                  />
                ))}
              </div>
            </div>
            <div>
              <SectionTitle title="Time" />
              <div className="flex items-center gap-2 flex-wrap">
                {time.map((showTime, idx) => (
                  <ShowTime
                    time={showTime}
                    key={idx}
                    onSelect={(time) => handelTimeSelection(time)}
                    state={showTime === selectedTime}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-72">
            <img
              src={`${import.meta.env.VITE_TMDB_PATH}${poster_path}`}
              alt=""
              className="rounded-[20px] inline-block mb-9 max-w-60 sm:w-72"
            />
            <div className="space-y-4">
              <h2 className="text-white text-[clamp(1.3rem,2vw,1.5rem)] font-semibold">
                {title}
              </h2>
              {/* <p className="text-white/80 text-sm">{overview}</p> */}
              <div className="grid grid-cols-2 gap-1 text-white/80">
                <p>Duration: </p>
                <p>{runtimeFormater(runtime)}</p>
                <p>Language: </p>
                <p>{original_language}</p>
                <p>Release: </p>
                <p>{formatYear(release_date)}</p>
              </div>
              <p className="text-white/80 flex items-center gap-1">
                <FaStar />
                {tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedTheater && theaterData && (
        <section className="mt-10 lg:mt-16 ">
          <div className="container-fluid flex justify-end">
            <div className="w-full md:w-96 py-5 px-7 md:py-10 md:px-14 border border-white rounded-2xl text-white space-y-8">
              <div className="space-y-3">
                <h3 className="text-3xl font-semibold">
                  {theaterData.name || "N/A"}
                </h3>
                <p className="text-lg text-white/80 flex items-center gap-1">
                  <FaLocationDot className="text-sm" />
                  <span>{theaterData.location || "N/A"}</span>
                </p>
              </div>
              <div className="space-y-2">
                <h5>
                  Date: {selectedDate ? farmateFullDate(selectedDate) : "N/A"}
                </h5>
                <p>Time: {selectedTime ? formatTime(selectedTime) : "N/A"}</p>
              </div>

              <p className="text-sm">*Seat selection can be done after this</p>

              <Link className="btn w-full text-center" to="/">
                Proceed
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Showtime;

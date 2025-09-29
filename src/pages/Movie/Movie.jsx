import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axiosPublic from "../../utils/axiosPublic";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import { runtimeFormater } from "../../utils/runtimeFormater";
import { formatYear } from "../../utils/dateFormater";
import { FaStar } from "react-icons/fa6";
import TheaterPill from "../../components/shared/Theater/TheaterPill";
import DateCard from "../../components/Movies/DateCard";
import { useEffect, useState } from "react";
import ShowTime from "../../components/shared/Movie/ShowTime";

const Movie = () => {
  const { movieId } = useParams();
  const [theaters, setTheaters] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { data: show, isLoading: showLoading } = useQuery({
    queryKey: ["show", movieId],
    queryFn: async ({ queryKey }) => {
      try {
        const [_key, movieId] = queryKey;
        const res = await axiosPublic.get(`/showtimes/${movieId}`);

        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Show: ${error}`);
      }
    },

    enabled: !!movieId,
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

  if (showLoading) return <Spinner />;

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

  return (
    <main className="py-32">
      <section className="">
        <div className="container-fluid flex gap-6">
          <div className="flex-1 flex flex-col justify-between">
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
                    onSelect={(currDate) => setSelectedDate(currDate)}
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
                    onSelect={(time) => setSelectedTime(time)}
                    state={showTime === selectedTime}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 w-72">
            <img
              src={`${import.meta.env.VITE_TMDB_PATH}${poster_path}`}
              alt=""
              className="rounded-[20px] inline-block mb-9"
            />
            <div className="space-y-4">
              <h2 className="text-white text-2xl font-semibold">{title}</h2>
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
    </main>
  );
};

export default Movie;

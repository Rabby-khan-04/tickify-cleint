import axiosPublic from "./axiosPublic";

export const fetchNowPlaying = async () => {
  try {
    const movie = await axiosPublic.get("/movies/now-playing");

    return movie?.data?.data;
  } catch (error) {
    console.log(`ERROR While Fetching Now Playing Movies: ${error}`);
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const movie = await axiosPublic.get("/movies/upcoming");

    return movie?.data?.data;
  } catch (error) {
    console.log(`ERROR While Fetching Upcoming Movies: ${error}`);
  }
};

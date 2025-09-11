import axiosPublic from "./axiosPublic";

export const fetchNowPlaying = async () => {
  try {
    const movie = await axiosPublic.get("/movies/now-playing");

    return movie?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

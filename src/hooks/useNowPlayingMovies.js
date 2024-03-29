import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store=>store.movies.addNowPlayingMovies)
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1&region=IN",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    if(!nowPlayingMovies) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies; 

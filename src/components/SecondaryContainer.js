import MovieList from './MovieList';
import {useSelector} from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store)=>store.movies);
  return (
    <div className=" bg-black w-screen">
      <div className="mt-0  md:-mt-52 pl-4 md:pl-12 relative z-10">
        <MovieList title={"Now Playing"} movies={movies.addNowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.addPopularMovies} />
        <MovieList title={"Top Rated"} movies={movies.addTopRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.addUpcomingMovies} />
      </div>
    </div>
  );
}

export default SecondaryContainer;

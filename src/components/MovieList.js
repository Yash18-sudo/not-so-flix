import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  const dummy = "/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg"
  return (
    <div className="px-6 bg-transparent">
      <h1 className="text-3xl text-white py-4">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

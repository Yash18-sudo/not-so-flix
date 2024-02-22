import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import openAi from '../utils/openAi';
import lang from '../utils/languageConstants';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const langKey = useSelector(store=>store.config.lang);
  
  const searchMovieTMDB = async (movie)=>{
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query="+ movie +"&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async ()=>{
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a movie recommendation system and sugest some movies for the query " +
      searchText.current.value + ". only give me name of top 5 movies, comma seperated like given example result ahead. example result: spiderman, batman, jawaan, sholay, don";

    const gptResults = await openAi.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
  if(!gptResults.choices){
    //error page or eror handling
  }

  // console.log(gptResults.choices?.[0]?.message?.content);

  const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
  console.log(gptMovies);

  const promiseArray = gptMovies.map((movie)=>searchMovieTMDB(movie));

  Promise.all(promiseArray)
    .then((resolvedResults) => {
      const tmdbResults = resolvedResults; // Save the results in tmdbResults variable
      console.log(tmdbResults); // Access the results here
      // Now you can further process the results or do whatever you need
       dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults}));
    })
    .catch((error) => {
      console.error("Error fetching TMDB results:", error);
    });


  }
  
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {" "}
          {lang[langKey].search}{" "}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;

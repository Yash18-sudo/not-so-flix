import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    addNowPlayingMovies: null,
    addPopularMovies: null,
    addTopRatedMovies: null,
    addTrailerVideo: null,
    addUpcomingMovies:null,
    trailerVideo: 0,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.addNowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.addPopularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.addTopRatedMovies = action.payload;
    },
    addUpcomingMovies:(state, action) => {
        state.addUpcomingMovies = action.payload;
    }
  },
});

export const {addNowPlayingMovies, addTrailerVideo, addPopularMovies,addTopRatedMovies, addUpcomingMovies} = moviesSlice.actions;
export default moviesSlice.reducer;
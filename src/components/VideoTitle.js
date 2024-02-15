import React from 'react';

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold"> {title} </h1>
      <p className="py-6 text-l w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-10 text-xl rounded-lg m-1 hover:bg-opacity-80">
          <i class="fa fa-play"></i> Play
        </button>
        <button className="bg-gray-500 text-white p-4 px-10 text-xl bg-opacity-50 rounded-lg m-1">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;

import React from 'react';

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className=" text-2xl md:text-6xl font-bold"> {title} </h1>
      <p className="hidden md:block py-6 text-l w-1/4">{overview}</p>
      <div className='my-4 md:m-0'>
        <button className="bg-white text-black py-1 md:py-4 px-3 md:px-10 text-xl rounded-lg m-1 hover:bg-opacity-80">
          <i class="fa fa-play"></i> Play
        </button>
        <button className="bg-gray-500 text-white py-1 md:py-4 px-3 md:px-10 text-xl bg-opacity-50 rounded-lg m-1">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;

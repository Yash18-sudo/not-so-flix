import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {
    if(!posterPath){
      return (
        <div className="w-36 md:w-48 pr-4">
          <img
          className="w-full h-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpgSdHczpk8etxRPu6YybsDbmRzzWeIWRrgWsrMGevSEKByv04HnLS4Lrh-niL-9Sw04&usqp=CAU"
            alt="moviecard"
          ></img>
        </div>
      ); }

    return (
    <div className="w-40 pr-4">
      <img src={IMG_CDN_URL + posterPath} alt="moviecard"></img>
    </div>
  );
}

export default MovieCard;

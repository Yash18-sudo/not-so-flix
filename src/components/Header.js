import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import {useSelector,useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = ()=>{
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.

      });
  }

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=> unsubscribe();
  }, []);

  const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e)=>{
    dispatch(changeLanguage(e.target.value));
  }
  
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between h-26 md:h-auto  ">
      <img
        className="block md:hidden w-14 h-14 my-auto md:mt-0 mx-auto md:mx-0"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3erf-ixZvGblACVG6AG_Y_sFnj1Fck7TvBg&usqp=CAU"
        alt="logo"
      />
      <img
        className="hidden md:block w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex p-2 items-center gap-2">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onClick={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((option) => (
                <option key={option.identifier} value={option.identifier}>
                  {option.language}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchClick}
            className="text-white py-2 px-4 mx-4 my-2 bg-slate-600 rounded-lg"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <div className="text-white uppercase text-xl" >{user.displayName}</div>
          <img className="w-10 h-10" src={user?.photoURL} alt="usericon" />
          <button
            className="bg-red-700 h-10 p-4 md:p-2 font-bold text-white rounded-md  "
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;


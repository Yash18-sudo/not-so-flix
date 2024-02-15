import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import {useSelector,useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);
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

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />

      { user && (<div className="flex p-2 items-center gap-2">
        <div>{user.displayName}</div>
        <img
          className="w-10 h-10"
          src={user?.photoURL}
          alt="usericon"
        />
        <button className="bg-red-500 h-10 p-2 font-bold text-white rounded-md" onClick={handleSignOut}>(Sign Out)</button>
      </div>)}
    </div>
  );
};

export default Header;

//
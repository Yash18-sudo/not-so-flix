import React from "react";
import Header from "./Header";
import { useState, useRef} from "react";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {useDispatch} from "react-redux";
import { addUser} from "../utils/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // alert("Successfully Signed Up ");
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR ,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error, message);
            });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "--" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // alert("Successfully logged in");
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "--" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/98a1cb1e-5a1d-4b98-a46f-995272b632dd/IN-en-20240129-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bgimg"
        ></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute my-36 mx-auto right-0 left-0 p-12 bg-black text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            placeholder="Full Name"
            type="text"
            className="p-4 my-2 w-full bg-gray-800 bg-opacity-80"
          />
        )}

        <input
          ref={email}
          placeholder="Email"
          type="text"
          className="p-4 my-2 w-full bg-gray-800 bg-opacity-80"
        />
        <input
          ref={password}
          placeholder="Password"
          type="password"
          className="p-4 my-2 w-full  bg-gray-800 bg-opacity-80"
        />

        {errorMessage && (
          <div>
            <p className="text-red-500 mt-2">{errorMessage}</p>
            <p className="text-yellow-300 text-sm ">• Email should contain @</p>
            <p className="text-yellow-300 text-sm ">
              • Password should contain A-Z, a-z, 0-9, special characters
            </p>
          </div>
        )}

        <button
          className="p-4 my-6 w-full  bg-red-700 rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer py-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New To Netflix? Sign Up Now"
            : "Already Registered? Sign In Here"}
        </p>
      </form>
    </div>
  );
};

export default Login;

import { useState, useEffect } from "react";
import "./Login.css";
import Google from "../../assets/google.png";
import Backarrow from "./components/Back-arrow";
import { app } from "../../Firebase";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  async function handleSignIn() {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          navigate("/Dashboard")
          console.log(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    };


  return (
    <div className="login">
      <div className={`login-cont ${animate ? "animate" : ""}`}>
        <Backarrow />
        <div className="login-head">
          <h1>Welcome to PGscout!</h1>
          <p className="p1">Find your perfect PG in seconds with PGscout</p>
          <p className="p2">
            the ultimate time saving app for locating nearby PG!
          </p>
        </div>
        <div className="login-button">
          <button className="login-btn" onClick={handleSignIn}>
            <img src={Google} alt="google" width={40} height={40} />
            <p>Sign Up with Google</p>
          </button>
        </div>
      </div>
      <div className={`side-bar ${animate ? "animate" : ""}`}></div>
    </div>
  );
}

import React from "react";
import "./LandingPage.css";
import landingImg from "../../img/hero-img.png";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const LandingPage = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth.signInWithPopup(provider).then(({ user }) => {
      dispatch(
        login({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    });
  };

  return (
    <div className="landing">
      <div className="landing__container">
        <div className="landing__text">
          <h1>Save & Share</h1>
          <h4>
            like and manage useful links that you found and do not wan't them to
            get lost between tons of bookmarks in your web browser.{" "}
          </h4>
          <h3>
            <span className="landing__title">SaveLink</span> allows you to leave
            notes and comments
          </h3>
          <Button className="landing_button" onClick={signIn}>
            Join us
          </Button>
        </div>
        <div className="landing__img">
          <img src={landingImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

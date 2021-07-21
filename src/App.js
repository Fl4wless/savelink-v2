import React from "react";
import "./App.css";
import Navbar from "./components/header/Navbar";
import NewLink from "./components/feed/NewLink";
import Footer from "./components/footer/Footer";
import LinkDetails from "./components/feed/LinkDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectModal } from "./features/modalSlice";
import { login, logout, selectUser } from "./features/userSlice";
import AllPostsList from "./components/feed/AllPostsList";
import UserPostsList from "./components/feed/UserPostsList";
import { useEffect } from "react";
import { auth } from "./firebase";
import LandingPage from "./components/landing/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const showModal = useSelector(selectModal);
  const user = useSelector(selectUser);

  //Some kind of bug here

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      } else {
        auth.signOut().then(() => {
          dispatch(logout());
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <div className="app_body">
            <Route path="/" exact>
              {user ? <AllPostsList /> : <LandingPage />}
            </Route>
            {showModal && <LinkDetails />}
            <Route path="/my-links">
              {user ? <UserPostsList /> : <LandingPage />}
            </Route>
          </div>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

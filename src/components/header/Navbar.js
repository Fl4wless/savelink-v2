import React, { Fragment, useState } from "react";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import GradeIcon from "@material-ui/icons/Grade";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../features/userSlice";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <Fragment>
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__logo">
            <BookmarkBorderIcon /> SaveLink
          </div>

          <div
            className="menuToggle"
            onClick={() => {
              setClick((prev) => !prev);
            }}
          >
            {click ? <CloseIcon /> : <MenuIcon />}
          </div>

          <ul
            className={!click ? "navbar__links" : "navbar__links active"}
            onClick={() => {
              setClick(false);
            }}
          >
            <NavLink to="/" className="nav__item">
              Feed
            </NavLink>
            <NavLink to="/my-links" className="nav__item">
              My links
            </NavLink>
            <li
              className="
                nav__item hover"
            >
              <GradeIcon />
            </li>
            <li className="nav__item">For later</li>

            <div className="navbar__button">
              {!user ? (
                <Button onClick={signIn}>SIGN IN</Button>
              ) : (
                <Button onClick={signOut}>Sign Out</Button>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;

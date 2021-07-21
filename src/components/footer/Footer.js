import React from "react";
import "./Footer.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <BookmarkBorderIcon /> SaveLink
      </div>
    </div>
  );
};

export default Footer;

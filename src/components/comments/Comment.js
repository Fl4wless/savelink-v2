import { Avatar } from "@material-ui/core";
import React from "react";

import "./Comment.css";

const Comment = ({ photoUrl, comment, displayName }) => {
  return (
    <div className="comment">
      <div className="comment__info">
        <Avatar className="comment__avatar" src={photoUrl} />
        <p>{displayName}</p>
      </div>
      <div className="comment__text">{comment}</div>
    </div>
  );
};

export default Comment;

import React from "react";
import "./PostActions.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";

const PostActions = ({
  info,
  linkHandle,
  comments,
  commentsHandle,
  like,
  redColor,
}) => {
  return (
    <div className="post__actions">
      <IconButton
        className={redColor ? "likeIcon active" : "likeIcon"}
        onClick={like}
      >
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton className="scheduleIcon">
        <ScheduleIcon />
      </IconButton>
      <IconButton className="deleteIcon">
        <DeleteOutlineIcon />
      </IconButton>
      {info && (
        <IconButton onClick={linkHandle} className="infoIcon">
          <InfoOutlinedIcon />
        </IconButton>
      )}
      {comments && (
        <IconButton onClick={commentsHandle} className="commentIcon">
          <ChatOutlinedIcon />
        </IconButton>
      )}
    </div>
  );
};

export default PostActions;

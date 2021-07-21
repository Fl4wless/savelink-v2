import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import PostActions from "../UI/PostActions";
import "./LinkDetails.css";
import Comments from "../comments/Comments";
import FlipMove from "react-flip-move";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, selectLinkInfo } from "../../features/modalSlice";

const LinkDetails = () => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { description, link, photoUrl, timestamp, title, displayName } =
    useSelector(selectLinkInfo);

  const modalCloseHandler = () => {
    dispatch(hideModal());
  };

  const showCommentsHandler = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal__header">
          <Avatar
            className="modal__avatar"
            src={photoUrl.photoUrl}
            onClick={modalCloseHandler}
          />
          <div className="modal__createInfo">
            <h4>{displayName.displayName}</h4>
            <p>{timestamp.timestamp}</p>
          </div>
        </div>
        <h3>{title.title}</h3>
        <div className="modal__link">
          <p>{link.link}</p>
        </div>

        <div className="modal__description">{description.description}</div>
        <div className="post__actions">
          <PostActions commentsHandle={showCommentsHandler} comments={true} />
        </div>
      </div>

      <FlipMove className="modal__commentsFlipmove">
        {showComments && (
          <div className="modal__comments">
            <Comments />
          </div>
        )}
      </FlipMove>
    </div>
  );
};

export default LinkDetails;

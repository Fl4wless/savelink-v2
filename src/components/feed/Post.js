import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";
import PostActions from "../UI/PostActions";
import { useDispatch, useSelector } from "react-redux";
import { setLinkInfo, showModal } from "../../features/modalSlice";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { selectUser } from "../../features/userSlice";

const Post = ({
  id,
  title,
  description,
  timestamp,
  link,
  photoUrl,
  displayName,
  liked,
}) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const user = useSelector(selectUser);
  const linksRef = db.collection(`users/${user.uid}/liked-links`);

  const linkDetailHandler = () => {
    dispatch(
      setLinkInfo({
        title: { title },
        description: { description },
        timestamp: { timestamp },
        link: { link },
        photoUrl: { photoUrl },
        displayName: { displayName },
        id: { id },
      })
    );
    dispatch(showModal());
  };

  const likeHandler = () => {
    setLike((prev) => !prev);
    linksRef.doc(id).update({
      liked: !like,
    });
  };

  return (
    <div className={!liked ? "post" : "post liked"} key={id}>
      <div className="post__header">
        <Avatar src={photoUrl} />
        <div className="post__createInfo">
          <h4>{displayName}</h4>
          <p>{timestamp}</p>
        </div>
      </div>
      <div className="post__title">{title}</div>
      <div className="post__link">
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </div>
      <div className="post__text">{description}</div>
      <div className="post__actions">
        <PostActions
          info={true}
          linkHandle={linkDetailHandler}
          like={likeHandler}
          redColor={like}
        />
      </div>
    </div>
  );
};

export default Post;

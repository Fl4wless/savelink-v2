import React, { useEffect, useState } from "react";
import "./Comments.css";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectLinkInfo } from "../../features/modalSlice";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const currentLink = useSelector(selectLinkInfo);
  const id = currentLink.id.id;
  const linksRef = db.collection(`links/${id}/comments`);

  useEffect(() => {
    linksRef.orderBy("timestamp", "desc").onSnapshot((snapshot) =>
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [id]);

  console.log(comments);

  return (
    <div className="comments">
      <h3>Comments</h3>
      <NewComment />
      {comments?.map(({ id, data: { comment, displayName, photoUrl } }) => {
        return (
          <Comment
            key={id}
            comment={comment}
            id={id}
            displayName={displayName}
            photoUrl={photoUrl}
          />
        );
      })}
    </div>
  );
};

export default Comments;

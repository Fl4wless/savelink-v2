import React from "react";
import { useSelector } from "react-redux";
import { selectLinkInfo } from "../../features/modalSlice";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import "./NewComment.css";
import firebase from "firebase";

const NewComment = () => {
  const currentLink = useSelector(selectLinkInfo);
  const user = useSelector(selectUser);
  const id = currentLink.id.id;
  const linksRef = db.collection(`links/${id}/comments`);

  const { register, handleSubmit } = useForm();

  const onSubmitHandler = (formData) => {
    linksRef.add({
      comment: formData.comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photoUrl: user.photoURL,
      displayName: user.displayName,
    });
  };

  return (
    <form className="newComment" onSubmit={handleSubmit(onSubmitHandler)}>
      <textarea
        name="new_comment"
        id="new_comment"
        rows="2"
        placeholder="Comment..."
        {...register("comment")}
      ></textarea>
      <button type="submit" className="newComment__button">
        submit
      </button>
    </form>
  );
};

export default NewComment;

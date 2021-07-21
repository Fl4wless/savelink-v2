import React, { useState } from "react";
import "./NewLink.css";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";
import { Button, IconButton } from "@material-ui/core";
import FlipMove from "react-flip-move";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import firebase from "firebase";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

const NewLink = () => {
  const [addLink, setAddLink] = useState(false);
  const user = useSelector(selectUser);
  const linksRef = db.collection(`users/${user.uid}/link`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (formData) => {
    linksRef.add({
      link: formData.link,
      title: formData.title,
      description: formData.description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photoUrl: user.photoURL,
      displayName: user.displayName,
      liked: false,
    });

    setAddLink(false);
  };

  const addLinkForm = (
    <div className="newLinkForm">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          placeholder="http://..."
          {...register("link", { required: true })}
        />
        {errors.subject && <p className="addLink__error">"URL is required"</p>}
        <input placeholder="title" {...register("title", { required: true })} />
        {errors.subject && (
          <p className="addLink__error">"Title is required"</p>
        )}
        <textarea
          rows="4"
          cols="50"
          placeholder="description"
          {...register("description")}
        />

        <Button type="submit">post</Button>
      </form>
    </div>
  );

  return (
    <div className="newLink">
      <IconButton
        onClick={() => {
          setAddLink((prev) => !prev);
        }}
      >
        <ArrowDropDownCircleOutlinedIcon className="openForm" />
      </IconButton>
      <FlipMove
        leaveAnimation="none"
        enterAnimation="elevator"
        className="linkForm"
      >
        {addLink && addLinkForm}
      </FlipMove>
    </div>
  );
};

export default NewLink;

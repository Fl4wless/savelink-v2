import React, { useEffect, Fragment } from "react";
import "./AllPostsList.css";
import Post from "./Post";
import { db } from "../../firebase";
import { useState } from "react";
import NewLink from "./NewLink";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const AllPostsList = () => {
  const [links, setLinks] = useState([]);
  const user = useSelector(selectUser);

  const linksRef = db.collectionGroup("link");

  useEffect(() => {
    linksRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setLinks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Fragment>
      {user && <NewLink />}

      {links.map(
        ({
          id,
          data: {
            link,
            title,
            description,
            timestamp,
            photoUrl,
            displayName,
            liked,
          },
        }) => (
          <Post
            key={id}
            id={id}
            link={link}
            title={title}
            description={description}
            timestamp={new Date(timestamp?.seconds * 1000).toUTCString()}
            photoUrl={photoUrl}
            displayName={displayName}
            liked={liked}
          />
        )
      )}
    </Fragment>
  );
};

export default AllPostsList;

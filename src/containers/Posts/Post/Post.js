import React, { useContext, useEffect, useState } from "react";

import classes from "./Post.module.css";

import axios from "../../../axios-orders";
import { useParams } from "react-router";
import { FlashContext } from "../../../contexts/FlashContext";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState();
  const setFlash = useContext(FlashContext)[1];

  useEffect(() => {
    if (!post) {
      axios
        .get(`/posts/${slug}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch(() => {
          setFlash({
            messages: "Error fetching post",
            visible: true,
            type: "alert",
          });
        });
    }
  }, [slug, post, setPost, setFlash]);

  return (
    <div className={classes.post}>
      <p className={classes.title}>{post?.title}</p>
      <div className={classes.textBox}>
        <p className={classes.text}>{post?.body}</p>
      </div>
    </div>
  );
};

export default Post;

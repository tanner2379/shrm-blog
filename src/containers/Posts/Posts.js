import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios-orders";

import { UserContext } from "../../contexts/UserContext";
import { FlashContext } from "../../contexts/FlashContext";
import { formatDate } from "../../shared/utility";

import classes from "./Posts.module.css";

const Posts = () => {
  const userInfo = useContext(UserContext)[0];
  const setFlash = useContext(FlashContext)[1];
  const [posts, setPosts] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [page, setPage] = useState(1);
  const per_page = 5;

  useEffect(() => {
    axios
      .post("/getposts", { page: page, per: per_page })
      .then((response) => {
        setPosts(response.data.posts);
        setPostCount(response.data.post_count);
      })
      .catch((error) => {
        setFlash({ messages: error.messages, visible: true, type: "alert" });
      });
  }, [page]);

  let buttonJustification;
  if (page === 1) {
    buttonJustification = "right";
  } else {
    buttonJustification = "space-between";
  }

  return (
    <div className={classes.posts}>
      {userInfo.loggedIn === "LOGGED_IN" ? (
        <Link to={"/posts/new"} className={classes.newPost}>
          Create a New Post
        </Link>
      ) : null}
      <p className={classes.title}>Articles</p>
      {posts
        ? posts.reverse().map((post) => {
            return (
              <Link
                to={`/posts/${post.slug}`}
                className={classes.text}
                key={post.id}
              >
                <div className={classes.post}>
                  <div className={classes.dateBlock}>
                    {formatDate(post.created_at)}
                  </div>
                  <p className={classes.postTitle}>{post.title}</p>
                </div>
              </Link>
            );
          })
        : null}
      <div
        className={classes.buttonContainer}
        style={{ justifyContent: buttonJustification }}
      >
        {page > 1 ? (
          <button
            className={[classes.prevButton, classes.navButton].join(" ")}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        ) : null}
        {page * per_page < postCount ? (
          <button
            className={[classes.nextButton, classes.navButton].join(" ")}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Posts;

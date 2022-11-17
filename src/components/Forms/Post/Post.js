import React, { useState, useContext } from "react";
import axios from "../../../axios-orders";

import { inputChangedHandler } from "../../../shared/utility";
import { UserContext } from "../../../contexts/UserContext";
import { FlashContext } from "../../../contexts/FlashContext";

import classes from "./Post.module.css";

const PostForm = (props) => {
  const userInfo = useContext(UserContext)[0];
  const setFlash = useContext(FlashContext)[1];

  const [formValue, setFormValue] = useState({
    title: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    description: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    body: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const setFormIsValid = useState(false)[1];

  const handleChange = (event) => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  };

  // const fileSelectedHandler = event => {
  //   setFormValue({...formValue, images: {...formValue.images, value: [event.target.files][0]}})
  // }

  const handleSubmit = (event) => {
    if (userInfo.loggedIn === "LOGGED_IN") {
      const headers = {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      };

      const formData = new FormData();
      formData.append("title", formValue.title.value);
      formData.append("description", formValue.description.value);
      formData.append("body", formValue.body.value);
      // for(let i = 0; i < formValue.images.value.length; i++) {
      //   formData.append('images[]', formValue.images.value[i]);
      // }

      axios
        .post(`/posts/${props.destination}`, formData, headers)
        .then((response) => {
          if (response.data.status === "created") {
            setFlash({
              messages: ["Post Created!"],
              visible: true,
              type: "success",
            });
            props.history.push(`/posts/${response.data.data.slug}`);
          } else {
            setFlash({
              messages: response.data.errors
                ? response.data.errors
                : [response.data.errors],
              visible: true,
              type: "alert",
            });
          }
        })
        .catch((error) => {
          console.log("Post Create Error: ", error.message);
          setFlash({ messages: error.message, visible: true, type: "alert" });
        });
    } else {
      setFlash({
        messages: ["Only the site owner can create posts"],
        visible: true,
        type: "alert",
      });
    }

    event.preventDefault();
  };

  let disabledStyle = null;
  if (userInfo.loggedIn === "NOT_LOGGED_IN") {
    disabledStyle = classes.disabled;
  }

  return (
    <div className={classes.form}>
      <p className={classes.title}>{props.title}</p>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit}>
          <input
            className={classes.Input}
            type="text"
            name="title"
            placeholder="Post Title"
            onChange={(event) => handleChange(event)}
            required
          />
          <input
            className={classes.Input}
            type="text"
            name="description"
            placeholder="Post Description"
            onChange={(event) => handleChange(event)}
            required
          />
          <textarea
            className={classes.textArea}
            type="text"
            name="body"
            placeholder="Post Body"
            onChange={(event) => handleChange(event)}
            required
          />
          <div className={classes.buttonWrapper}>
            {props.destination ? (
              <button
                type="submit"
                className={[classes.createButton, disabledStyle].join(" ")}
                disabled={userInfo.loggedIn === "NOT_LOGGED_IN"}
              >
                Update Post
              </button>
            ) : (
              <button
                type="submit"
                className={[classes.createButton, disabledStyle].join(" ")}
                disabled={userInfo.loggedIn === "NOT_LOGGED_IN"}
              >
                Create Post
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;


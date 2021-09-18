import React, { Suspense, useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "./axios-orders";

import { UserContext } from "./contexts/UserContext";
import { SearchResultContext } from "./contexts/SearchResultContext";
import { FlashContext } from "./contexts/FlashContext";

import Layout from "./hoc/Layouts/Layout";
import TransitionElement from "./components/TransitionElement/TransitionElement";

import Home from "./containers/Home/Home";
import About from "./containers/About/About";
import Contact from "./containers/Contact/Contact";

import Posts from "./containers/Posts/Posts";
import Post from "./containers/Posts/Post/Post";
import NewPost from "./containers/Posts/New/New";
import EditPost from "./containers/Posts/Edit/Edit";

import Registration from "./containers/Registration/Registration";

import SearchResults from "./containers/SearchResults/SearchResults";

import "./App.css";

const App = (props) => {
  const [userInfo, setUserInfo] = useState({
    loggedIn: "NOT_LOGGED_IN",
    user: {},
  });
  const [searchQuery, setSearchQuery] = useState({
    query: "",
    warning: "none",
    posts: [],
  });
  const [flash, setFlash] = useState({
    messages: [],
    visible: false,
    type: null,
  });

  useEffect(() => {
    axios
      .get("/logged_in")
      .then((response) => {
        if (response.data.logged_in && userInfo.loggedIn === "NOT_LOGGED_IN") {
          setUserInfo({
            ...userInfo,
            loggedIn: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (
          !response.data.logged_in &&
          userInfo.loggedIn === "LOGGED_IN"
        ) {
          setUserInfo({ ...userInfo, loggedIn: "NOT_LOGGED_IN", user: {} });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }, []);

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <SearchResultContext.Provider value={[searchQuery, setSearchQuery]}>
        <FlashContext.Provider value={[flash, setFlash]}>
          <Layout {...props}>
            <Suspense fallback={<p>Loading...</p>}>
              <Route
                render={({ location }) => (
                  <TransitionElement
                    assignedKey={location.key}
                    animation="fade"
                    timeout={1000}
                  >
                    <Switch location={location}>
                      <Route
                        path="/"
                        exact
                        render={(props) => <Home {...props} />}
                      />

                      <Route
                        path="/about"
                        exact
                        render={(props) => <About {...props} />}
                      />

                      <Route
                        path="/contact"
                        exact
                        render={(props) => <Contact {...props} />}
                      />

                      <Route
                        path="/posts"
                        exact
                        render={(props) => <Posts {...props} />}
                      />
                      <Route
                        path="/posts/new"
                        exact
                        render={(props) => <NewPost {...props} />}
                      />
                      <Route
                        path="/posts/:slug/edit"
                        render={(props) => <EditPost {...props} />}
                      />
                      <Route
                        path="/posts/:slug"
                        render={(props) => <Post {...props} />}
                      />

                      <Route
                        path="/sign_in"
                        render={(props) => <Registration {...props} />}
                      />

                      <Route
                        path="/search_results"
                        render={(props) => <SearchResults {...props} />}
                      />

                      <Redirect to="/" />
                    </Switch>
                  </TransitionElement>
                )}
              />
            </Suspense>
          </Layout>
        </FlashContext.Provider>
      </SearchResultContext.Provider>
    </UserContext.Provider>
  );
};

export default withRouter(App);

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../shared/utility";
import { SearchResultContext } from "../../contexts/SearchResultContext";

import classes from "./SearchResults.module.css";

const SearchResults = () => {
  const [searchResults] = useContext(SearchResultContext);
  const posts = searchResults.posts;

  return (
    <div className={classes.posts}>
      <p className={classes.title}>
        Search Results for "{searchResults.query}"
      </p>
      {posts
        ? posts.map((post) => {
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
    </div>
  );
};

export default SearchResults;

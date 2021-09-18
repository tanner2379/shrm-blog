import React, { useState, useEffect, useContext } from "react";
import axios from "../../../axios-orders";

import { inputChangedHandler } from "../../../shared/utility";
import { SearchResultContext } from "../../../contexts/SearchResultContext";

import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [searchResults, setSearchResults] = useContext(SearchResultContext);
  const [formValue, setFormValue] = useState({
    query: {
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    if (searchResults.warning === "NOT_FOUND") {
      setSearchResults({ ...searchResults, warning: "none" });
    }
  }, [searchResults, setSearchResults]);

  const setFormIsValid = useState(false)[1];

  const handleChange = (event) => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  };

  const handleSubmit = (event) => {
    axios
      .post("/searchpost", {
        query: formValue.query.value,
      })
      .then((response) => {
        if (response.data[0]) {
          setSearchResults({
            query: formValue.query.value,
            posts: response.data,
            warning: "none",
          });
          props.history.push("/search_results");
        } else {
          setSearchResults({
            query: formValue.query.value,
            posts: [],
            warning: "NOT_FOUND",
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching search results", error);
      });

    event.preventDefault();
  };

  let notFoundModal = null;
  if (searchResults.warning === "NOT_FOUND") {
    notFoundModal = (
      <div className={classes.NotFoundModal}>
        <p>No posts match your search.</p>
      </div>
    );
  }

  console.log(searchResults);
  return (
    <div className={classes.SearchBar}>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <input
          type="text"
          name="query"
          placeholder="Search Posts..."
          onChange={(event) => handleChange(event)}
          required
          className={classes.searchInput}
        />
        <button type="submit" className={classes.searchButton}>
          Search
        </button>
      </form>
      {notFoundModal}
    </div>
  );
};

export default SearchBar;

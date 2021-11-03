import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
});

const prodInstance = axios.create({
  baseURL: "https://highsoaringministries-api.herokuapp.com/api/v1/",
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
  headers: {
    Origin: "https://www.highsoaringministries.com",
    "Access-Control-Allow-Origin":
      "https://highsoaringministries-api.herokuapp.com",
  },
});

export default prodInstance;

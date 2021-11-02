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
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default prodInstance;

import axios from "axios";
// const API = axios.create({
//   baseURL: "https://social-mediapp-mongo-noda3.herokuapp.com",
// });
const API = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_SERVER_HEROKKU,
});

export const uploadImage = (data) => API.post("/upload", data);
export const uploadPost = (data) => API.post("/posts", data);

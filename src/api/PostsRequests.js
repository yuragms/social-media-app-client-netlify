import axios from "axios";
// const API = axios.create({
//   baseURL: "https://social-mediapp-mongo-noda3.herokuapp.com",
// timeout: 5000,
// });

const API = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_SERVER_HEROKKU,
});

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);

export const likePost = (id, userId) =>
  API.put(`posts/${id}/like`, { userId: userId });

export const deletePost = (id) => API.delete(`posts/${id}`);

// const API = axios.create({
//   baseURL: "http://localhost:5001",
// });

// export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
// export const likePost = (id, userId) =>
//   API.put(`posts/${id}/like`, { userId: userId });

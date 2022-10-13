import axios from "axios";
// const API = axios.create({
//   baseURL: "https://social-mediapp-mongo-noda3.herokuapp.com",
// });
const API = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_SERVER_HEROKKU,
});
export const getMessages = (id) => API.get(`/messages/${id}`);
export const addMessage = (data) => API.post("messages/", data);

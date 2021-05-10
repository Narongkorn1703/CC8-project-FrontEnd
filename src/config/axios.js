import axios from "axios";
import {
  // clearToken,
  getToken,
} from "../services/localStorageService";
axios.defaults.baseURL = "http://localhost:8000/";
axios.interceptors.request.use(
  (config) => {
    if (getToken())
      config.headers.authorization = `Bearer ${getToken()}`;
    return config;
  },
  (err) => Promise.reject(err)
);
// axios.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     if (err.response.status === 401) {
//       clearToken();
//       window.location.assign("/");
//       return;
//     }
//     return Promise.reject(err);
//   }
// );
export default axios;

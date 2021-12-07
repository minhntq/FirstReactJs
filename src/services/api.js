import axios from "axios";
import store from "./../store/index";

const url = {
  baseUrl: "https://www.saigontech.edu.vn/restful-api",
  login: "/login",
  majors: "/majors",
  instructors: "/instructors",
  students: "/students",
};
const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  return request;
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      window.location.href = "/no-internet";
    } else {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/no-permission";
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  }
);
const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
export default api;

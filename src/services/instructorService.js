import api from "./api";
const add = (data) =>
  api.post(api.url.instructors, data).then((res) => res.data);
const get = (id) =>
  api.get(`${api.url.instructors}/${id}`).then((res) => res.data);
const list = () => api.get(api.url.instructors).then((res) => res.data);

const update = (id, data) =>
  api.put(`${api.url.instructors}/${id}`, data).then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.instructors}/${id}`).then((res) => res.data);

const instructorService = {
  add,
  get,
  list,
  update,
  delete: remove,
};
export default instructorService;

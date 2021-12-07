import api from "./api";
const add = (data) => api.post(api.url.students, data).then((res) => res.data);
const get = (id) =>
  api.get(`${api.url.students}/${id}`).then((res) => res.data);
const list = () => api.get(api.url.students).then((res) => res.data);

const update = (id, data) =>
  api.put(`${api.url.students}/${id}`, data).then((res) => res.data);

const remove = (id) =>
  api.delete(`${api.url.students}/${id}`).then((res) => res.data);

const studentService = {
  add,
  get,
  list,
  update,
  delete: remove,
};
export default studentService;

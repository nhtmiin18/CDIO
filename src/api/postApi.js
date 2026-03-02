import axiosClient from "./axios";

export const createInternshipPost = (data) => {
  return axiosClient.post("/posts/publish", data);
};
export const getAllPosts = () => {
  return axiosClient.get("/posts");
};
export const getRecruiterPosts = (recruiterId) => {
  return axiosClient.get(`/posts/recruiter/${recruiterId}`);
};
export const getPostById = (id) => {
  return fetch(`/api/posts/${id}`, {
    credentials: "include",
  }).then(res => res.json());
};

export const updatePost = (id, data) =>
  axios.put(`/api/posts/${id}`, data);

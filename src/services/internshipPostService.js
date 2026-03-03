import axios from "axios";

const API_URL = "http://localhost:5001/api/admin/internship-posts";

export const getAllInternshipPosts = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const updateInternshipPost = async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
};

export const deleteInternshipPost = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};
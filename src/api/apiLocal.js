import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/", // URL của json-server
});

// Lấy danh sách người dùng
export const fetchUsers = async () => {
  const response = await api.get("/posts");
  return response.data; // Lấy dữ liệu người dùng từ 'posts'
};

// Tạo người dùng mới
export const createUser = async (user) => {
  const response = await api.post("/posts", user);
  return response.data;
};

// Cập nhật người dùng
export const updateUser = async (id, user) => {
  const response = await api.put(`/posts/${id}`, user);
  return response.data;
};

// Xóa người dùng
export const deleteUser = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

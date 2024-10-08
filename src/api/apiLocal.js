// src/api.js
import axios from "axios";

// URL API cho đối tượng user
const API_URL = "http://localhost:5000/users";

// Lấy danh sách users từ API
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Trả về dữ liệu users từ API
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Tạo user mới
export const createUser = async (newUser) => {
  try {
    const response = await axios.post(API_URL, newUser); // newUser chứa {username, email, password}
    return response.data; // Trả về user mới đã được tạo
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Cập nhật thông tin user theo id
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUser); // updatedUser chứa thông tin mới
    return response.data; // Trả về dữ liệu user đã được cập nhật
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

// Xóa user theo id
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`); // Xóa user theo ID
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

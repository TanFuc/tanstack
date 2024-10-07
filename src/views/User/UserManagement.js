import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/apiLocal";
import UserTable from "../../components/User/UserTable";
import UserForm from "../../components/User/UserForm";
import Pagination from "../../components/User/UserPagination";

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Sử dụng useQuery để lấy dữ liệu người dùng
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"], // Khóa cho truy vấn
    queryFn: fetchUsers, // Hàm gọi API
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setEditingUser(null);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setEditingUser(null);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Lọc người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp người dùng
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return sortOrder === "asc"
      ? a.username.localeCompare(b.username)
      : b.username.localeCompare(a.username);
  });

  // Phân trang
  const itemsPerPage = 5;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleCreateOrUpdateUser = (user) => {
    if (editingUser) {
      updateUserMutation.mutate(user);
    } else {
      createUserMutation.mutate(user);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm người dùng"
          className="border border-gray-300 rounded p-2 w-full"
        />
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>
      {isLoading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <>
          <UserTable
            users={currentUsers}
            onUpdateUser={setEditingUser}
            onDeleteUser={(id) => deleteUserMutation.mutate(id)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedUsers.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
      <UserForm
        user={editingUser}
        onSubmit={handleCreateOrUpdateUser}
        onCancel={() => setEditingUser(null)}
      />
    </div>
  );
};

export default UserManagement;

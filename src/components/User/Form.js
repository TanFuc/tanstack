import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "../../api/apiLocal"; // Đảm bảo đúng đường dẫn tới api
import FormCard from "./FormCard";

const Form = ({ editingUser, setEditingUser }) => {
  const queryClient = useQueryClient();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Mutation để tạo người dùng mới
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setNewUser({ username: "", email: "", password: "" });
    },
  });

  // Mutation để cập nhật người dùng
  const updateUserMutation = useMutation({
    mutationFn: ({ id, updatedUser }) => updateUser(id, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setEditingUser(null); // Đặt lại editingUser sau khi cập nhật
    },
  });

  // Hàm xử lý tạo người dùng mới
  const handleCreateUser = async () => {
    if (newUser.username && newUser.email && newUser.password) {
      await createUserMutation.mutateAsync(newUser);
    }
  };

  // Hàm xử lý cập nhật sau khi chỉnh sửa
  const handleUpdate = async () => {
    if (editingUser) {
      await updateUserMutation.mutateAsync({
        id: editingUser.id,
        updatedUser: editingUser,
      });
    }
  };

  return (
    <FormCard
      editingUser={editingUser}
      newUser={newUser}
      setNewUser={setNewUser}
      setEditingUser={setEditingUser}
      handleUpdate={handleUpdate}
      handleCreateUser={handleCreateUser}
    />
  );
};

export default Form;

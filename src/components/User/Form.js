import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser, fetchUsers } from "../../api/apiLocal";
import FormCard from "./FormCard";

const Form = ({ editingUser, setEditingUser }) => {
  const queryClient = useQueryClient();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setNewUser({ username: "", email: "", password: "" });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, updatedUser }) => updateUser(id, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditingUser(null);
    },
  });

  const handleCreateUser = async () => {
    const emailExists = users.some(user => user.email === newUser.email);
    const usernameExists = users.some(user => user.username === newUser.username);

    if (emailExists) {
      setError("Email đã tồn tại. Vui lòng nhập email khác.");
    } else if (usernameExists) {
      setError("Tên người dùng đã tồn tại. Vui lòng nhập tên khác.");
    } else if (newUser.username && newUser.email && newUser.password) {
      await createUserMutation.mutateAsync(newUser);
      setError(null);
    }
  };

  const handleUpdate = async () => {
    if (editingUser) {
      await updateUserMutation.mutateAsync({
        id: editingUser.id,
        updatedUser: editingUser,
      });
    }
  };

  return (
    <>
      {error && <div className="text-red-500">{error}</div>} {/* Hiển thị thông báo lỗi */}
      <FormCard
        editingUser={editingUser}
        newUser={newUser}
        setNewUser={setNewUser}
        setEditingUser={setEditingUser}
        handleUpdate={handleUpdate}
        handleCreateUser={handleCreateUser}
      />
    </>
  );
};

export default Form;

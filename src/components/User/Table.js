// src/components/User/Table.js
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser } from "../../api/apiLocal"; // Đảm bảo đúng đường dẫn tới api
import TableCard from "./TableCard";

const Table = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState(null);

  // Fetch danh sách users với react-query
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Mutation để xóa người dùng
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Hàm xử lý xóa người dùng
  const handleDelete = async (id) => {
    await deleteUserMutation.mutateAsync(id);
  };

  if (isLoading) return <div className="text-center">Đang tải...</div>;

  return (
    <>
      <TableCard
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        users={users}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Table;

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser } from "../../api/apiLocal";
import TableCard from "./TableCard";

const Table = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

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

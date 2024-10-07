import React from "react";

const UserTable = ({ users, onUpdateUser, onDeleteUser }) => {
  if (!users || !Array.isArray(users)) {
    return <div>Không có dữ liệu người dùng.</div>;
  }

  return (
    <table className="min-w-full border-collapse bg-white shadow-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="border-b border-gray-300 p-4 text-left text-gray-700">
            Username
          </th>
          <th className="border-b border-gray-300 p-4 text-left text-gray-700">
            Email
          </th>
          <th className="border-b border-gray-300 p-4 text-left text-gray-700">
            Password
          </th>
          <th className="border-b border-gray-300 p-4 text-left text-gray-700">
            Hành động
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            <td className="border-b border-gray-300 p-4">{user.username}</td>
            <td className="border-b border-gray-300 p-4">{user.email}</td>
            <td className="border-b border-gray-300 p-4">{user.password}</td>
            <td className="border-b border-gray-300 p-4">
              <button
                onClick={() => onUpdateUser(user.id)}
                className="text-blue-500 hover:text-blue-700 transition duration-200"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => onDeleteUser(user.id)}
                className="text-red-500 hover:text-red-700 transition duration-200 ml-2"
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;

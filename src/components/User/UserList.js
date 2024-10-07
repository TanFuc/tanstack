import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/apiLocal"; // Nhập hàm fetchUsers từ API

const UserList = () => {
  const [users, setUsers] = useState([]); // Khởi tạo users là một mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(); // Gọi hàm fetchUsers để lấy dữ liệu
        console.log(data); // Kiểm tra dữ liệu trả về
        setUsers(data || []); // Nếu data là undefined, sử dụng mảng rỗng
      } catch (error) {
        setError(error.message); // Lưu thông báo lỗi nếu có
      } finally {
        setLoading(false); // Đánh dấu trạng thái đã tải xong
      }
    };

    loadUsers(); // Gọi hàm loadUsers
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Thông báo đang tải
  }

  if (error) {
    return <div className="text-red-500">Có lỗi xảy ra: {error}</div>; // Thông báo lỗi
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tên người dùng</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border px-4 py-2 text-center">
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

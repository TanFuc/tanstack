import Form from "./Form";

const TableCard = ({ editingUser, setEditingUser, users, handleDelete }) => {
  return (
    <>
      <div className="p-5 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-5">Bảng Người Dùng</h1>

        <Form editingUser={editingUser} setEditingUser={setEditingUser} />

        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Tên Người Dùng</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Mật Khẩu</th>
              <th className="py-3 px-4 text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.username}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.password}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Chỉnh Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableCard;

import Form from "./Form";

const TableCard = ({ editingUser, setEditingUser, users, handleDelete }) => {
  return (
    <>
      <div className="p-4 bg-gray-50 rounded shadow">
        <h1 className="text-xl font-semibold text-center mb-4">Người Dùng</h1>

        <Form editingUser={editingUser} setEditingUser={setEditingUser} />

        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-3 text-left">Tên</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-left">Password</th>
              <th className="py-2 px-3 text-left">Sửa/Xóa</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border-b">{user.username}</td>
                <td className="py-2 px-3 border-b">{user.email}</td>
                <td className="py-2 px-3 border-b">{user.password}</td>
                <td className="py-2 px-3 border-b">
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

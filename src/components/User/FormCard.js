const FormCard = ({
  editingUser,
  newUser,
  setNewUser,
  setEditingUser,
  handleUpdate,
  handleCreateUser,
}) => {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-lg font-semibold mb-2">
          {editingUser ? "Chỉnh Sửa Người Dùng" : "Thêm Người Dùng Mới"}
        </h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Tên Người Dùng"
            value={editingUser ? editingUser.username : newUser.username}
            onChange={(e) => {
              if (editingUser) {
                setEditingUser({ ...editingUser, username: e.target.value });
              } else {
                setNewUser({ ...newUser, username: e.target.value });
              }
            }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) => {
              if (editingUser) {
                setEditingUser({ ...editingUser, email: e.target.value });
              } else {
                setNewUser({ ...newUser, email: e.target.value });
              }
            }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
          />
          <input
            type="password"
            placeholder="Mật Khẩu"
            value={editingUser ? editingUser.password : newUser.password}
            onChange={(e) => {
              if (editingUser) {
                setEditingUser({ ...editingUser, password: e.target.value });
              } else {
                setNewUser({ ...newUser, password: e.target.value });
              }
            }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
          />
          {editingUser ? (
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition duration-200"
            >
              Cập Nhật
            </button>
          ) : (
            <button
              onClick={handleCreateUser}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200"
            >
              Thêm Người Dùng
            </button>
          )}
          {editingUser && (
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-400 text-white rounded-lg px-4 py-2 hover:bg-gray-500 transition duration-200"
            >
              Hủy
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default FormCard;

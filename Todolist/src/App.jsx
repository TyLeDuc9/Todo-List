import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    if (editIndex === null) {
      setTasks([...tasks, input]);
    } else {
      const updated = [...tasks];
      updated[editIndex] = input;
      setTasks(updated);
      setEditIndex(null);
    }
    setInput('');
  };

  const handleEdit = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setInput('');
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setInput('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-300 to-indigo-500">
      <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">📝 ToDo List</h1>

        {editIndex !== null && (
          <p className="mb-4 text-sm font-semibold text-indigo-600 text-center">
            ✏️ Đang chỉnh sửa: <span className="font-bold">{tasks[editIndex]}</span>
          </p>
        )}

        <form className="flex gap-2 mb-6" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Nhập công việc..."
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none font-medium"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-4 cursor-pointer py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {editIndex === null ? 'Thêm' : 'Cập nhật'}
          </button>

          {editIndex !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 cursor-pointer transition"
            >
              Huỷ
            </button>
          )}
        </form>

        <ul className="space-y-3">
          {tasks.map((value, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 border border-gray-300 p-3 rounded-lg hover:shadow-sm transition"
            >
              <span
                onClick={() => handleEdit(index)}
                className="cursor-pointer font-medium hover:underline text-gray-800 flex-1"
              >
                {index + 1}. {value}
              </span>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-3 py-1 cursor-pointer rounded transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 cursor-pointer rounded transition"
                >
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

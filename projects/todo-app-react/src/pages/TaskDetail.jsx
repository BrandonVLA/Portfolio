import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function TaskDetail({ taskList, onDelete, onEdit, onToggle }) {
  const { id } = useParams();
  const task = taskList.find((task) => task.id === Number(id));
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState("");
  const handleDeleteDetails = () => {
    onDelete(id);
    navigate("/");
  };

  const handleSaveEdit = () => {
    onEdit(id, newText);
    setIsEditing(false);
  };

  useEffect(() => {
    console.log("tasklist cambio,recalculando task", task.text);
  }, [taskList, task]);
  return (
    <main className="mx-auto w-full max-w-l px-4 ">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          {task && (
            <div>
              <h2
                className={`text-base font-semibold ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}
              >
                Task: {task.text}
              </h2>
              <p>
                Status:{" "}
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${task.completed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                >
                  {task.completed ? "Complete" : "Incomplete"}
                </span>
              </p>
            </div>
          )}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Editar tarea</h3>
                <input
                  type="text"
                  className="w-full border rounded p-2 mb-4"
                  value={newText}
                  placeholder="Enter edited task"
                  onChange={(e) => setNewText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleSaveEdit}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-around">
          <button
            type="button"
            onClick={handleDeleteDetails}
            className="rounded-2xl border border-red-900 bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-300 hover:text-white"
          >
            Delete
          </button>
          <button
            className="rounded-2xl border border-blue-400 bg-blue-400 px-3 py-2 text-sm font-medium text-black transition hover:bg-blue-200"
            onClick={() => {
              setIsEditing(true);
              setNewText(task.text);
            }}
          >
            Edit
          </button>
          <Link
            to={`/`}
            className="rounded-2xl border border-gray-400 bg-gray-400 px-3 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            Close
          </Link>
        </div>
      </div>
    </main>
  );
}

export default TaskDetail;

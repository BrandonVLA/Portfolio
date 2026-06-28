import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editTask, deleteTask } from "../store/slices/todoSlice";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.todos.tasks);
  const task = taskList.find((t) => t.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState("");

  const handleDeleteDetails = () => {
    dispatch(deleteTask(id));
    navigate("/");
  };

  const handleSaveEdit = () => {
    if (newText.trim() === "") return;
    dispatch(editTask({ id, text: newText }));
    setIsEditing(false);
  };

  useEffect(() => {
    if (task) {
      setNewText(task.text);
    }
  }, [task]);

  if (!task) {
    return (
      <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 px-4 py-16 flex items-center justify-center">
        <div className="text-center rounded-3xl border border-slate-200/50 bg-white p-8 max-w-sm shadow-lg dark:border-slate-800/50 dark:bg-slate-950">
          <svg
            className="w-12 h-12 text-slate-350 dark:text-slate-650 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-lg font-bold text-slate-850 dark:text-slate-250 mb-2">
            Task not found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-450 mb-6">
            The task you are looking for might have been deleted.
          </p>
          <Link
            to="/"
            className="inline-flex rounded-2xl bg-violet-600 hover:bg-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/10 transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 px-4 py-16 flex items-center justify-center transition-colors duration-250">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200/50 bg-white/95 p-6 sm:p-8 shadow-xl shadow-slate-200/40 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/85 dark:shadow-none">
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
              Task Details
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white break-words">
              {task.text}
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Status:
              </span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold select-none ${
                  task.completed
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                }`}
              >
                {task.completed ? "Complete" : "Incomplete"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between border-t border-slate-100/80 dark:border-slate-900/80 pt-5 gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setNewText(task.text);
                  setIsEditing(true);
                }}
                className="rounded-2xl border border-transparent bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-950/20 dark:text-violet-400 dark:hover:bg-violet-950/40 px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer"
              >
                Edit Task
              </button>
              <button
                type="button"
                onClick={handleDeleteDetails}
                className="rounded-2xl border border-transparent bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>

            <Link
              to="/"
              className="rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-350 transition-all text-center"
            >
              Go Back
            </Link>
          </div>
        </div>

        {/* Modal para Editar Tarea */}
        {isEditing && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200/50 bg-white p-6 shadow-2xl dark:border-slate-800/50 dark:bg-slate-950 animation-in fade-in zoom-in-95 duration-200">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Edit Task
              </h3>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-950/40"
                value={newText}
                placeholder="Edit task description..."
                onChange={(e) => setNewText(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  className="rounded-xl bg-violet-600 hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400 px-4 py-2 text-xs font-semibold text-white transition-all shadow-sm shadow-violet-500/10 active:scale-95 cursor-pointer"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default TaskDetail;

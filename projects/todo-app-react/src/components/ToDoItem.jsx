import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ToDoItem({ id, text, completed, onDelete, handleToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  // Mantener el texto local sincronizado si cambia desde fuera
  useEffect(() => {
    setEditText(text);
  }, [text]);

  const handleSave = () => {
    if (editText.trim() === "") return;
    onEdit(id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:border-slate-700/80 transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-center gap-3.5 justify-between">
        <div className="flex items-center gap-3.5 flex-grow min-w-0">
          {/* Custom Checkbox */}
          <button
            onClick={() => handleToggle(id)}
            className="flex-shrink-0 cursor-pointer focus:outline-none transition-transform active:scale-90"
            aria-label={completed ? "Mark incomplete" : "Mark complete"}
          >
            {completed ? (
              <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-400 transition-colors" />
            )}
          </button>

          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-950/40"
              placeholder="Edit task..."
              autoFocus
            />
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className={`text-sm font-semibold truncate cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors ${
                completed ? "text-slate-400/80 line-through dark:text-slate-500" : "text-slate-800 dark:text-slate-200"
              }`}
            >
              {text}
            </p>
          )}
        </div>

        <span
          className={`flex-shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold select-none ${
            completed 
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400" 
              : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100/80 dark:border-slate-900/80 pt-3">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-violet-600 hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400 px-4 py-1.5 text-xs font-semibold text-white transition-all shadow-sm shadow-violet-500/10 active:scale-95 cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-xl border border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
            >
              Edit
            </button>
            <Link
              className="rounded-xl border border-transparent bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-950/20 dark:text-violet-400 dark:hover:bg-violet-950/40 px-3.5 py-1.5 text-xs font-semibold transition-all"
              to={`/task/${id}`}
            >
              Details
            </Link>
          </div>
        )}

        {!isEditing && (
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="rounded-xl border border-transparent bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </section>
  );
}

export default ToDoItem;

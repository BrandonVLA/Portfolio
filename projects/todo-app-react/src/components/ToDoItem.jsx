import { ImCheckboxUnchecked } from "react-icons/im";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { Link } from "react-router-dom";
function ToDoItem({ id, text, completed, onDelete, handleToggle }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`text-base font-semibold ${completed ? "text-slate-400 line-through" : "text-slate-900"}`}
        >
          {text}
        </p>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${completed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
        >
          Delete
        </button>
        <Link
          className="rounded-2xl border border-red-200 bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-400"
          to={`/task/${id}`}
        >
          Details
        </Link>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => handleToggle(id)}
            className="h-5 w-5 rounded border border-slate-300 text-slate-900 focus:ring-slate-500"
          />
          Mark complete
        </label>
      </div>
    </section>
  );
}

export default ToDoItem;

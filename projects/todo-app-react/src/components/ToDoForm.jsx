import { useState } from "react";

function ToDoForm({ onAddTodo }) {
  const [taskText, setTaskText] = useState("");

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() === "") return;
    onAddTodo(taskText);
    setTaskText("");
  };

  return (
    <form onSubmit={handleTaskSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-grow">
        <label
          htmlFor="task"
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1"
        >
          Task Name
        </label>
        <input
          id="task"
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="mt-1.5 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-950/40"
          placeholder="Enter a new task..."
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 dark:from-violet-500 dark:to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98] transition-all duration-200 h-[48px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Task
      </button>
    </form>
  );
}

export default ToDoForm;

import { useState } from "react";

function ToDoForm({ onAddTodo }) {
  const [taskText, setTaskText] = useState("");

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (taskText.trim() === "") return;
    onAddTodo(taskText);
    setTaskText("");
  };
  return (
    <form onSubmit={handleTaskSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="task"
          className="block text-sm font-medium text-slate-700"
        >
          Task Name
        </label>
        <input
          id="task"
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Add Task
      </button>
    </form>
  );
}

export default ToDoForm;

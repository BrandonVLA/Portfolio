import ToDoForm from "../components/ToDoForm";
import ToDosList from "../components/TodosList";
import TodoFilters from "../components/TodoFilters";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  setFilter,
} from "../store/slices/todoSlice";
function Home() {
  //Global State(Redux)
  const taskList = useSelector((state) => state.todos.tasks);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();
  //Stats
  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((t) => t.completed).length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  //Tasks Filter by active filter on Redux
  const filteredTasks = taskList.filter((task) => {
    if (filter === "pending") {
      return task.completed === false;
    }
    if (filter === "completed") {
      return task.completed === true;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 px-4 py-10 transition-colors duration-250">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200/50 bg-white/90 p-6 sm:p-8 shadow-xl shadow-slate-200/40 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/85 dark:shadow-none">
        <header className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
            Productivity Hub
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-violet-950 to-violet-600 dark:from-white dark:via-violet-200 dark:to-violet-400 bg-clip-text text-transparent">
            Your Workspace
          </h1>

          {totalTasks > 0 ? (
            <div className="mt-6 max-w-md mx-auto bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/50">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <span>Progress Tracker</span>
                <span className="text-violet-600 dark:text-violet-400">
                  {completedTasks} of {totalTasks} completed (
                  {completionPercentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
              Create a task below to start organizing your day.
            </p>
          )}
        </header>

        <div className="space-y-6">
          <ToDoForm onAddTodo={(todo) => dispatch(addTask(todo))} />

          <div className="border-t border-slate-100/80 dark:border-slate-900/80 pt-2">
            <TodoFilters filter={filter} onFilterChange={setFilter} />

            <ToDosList
              taskList={filteredTasks}
              handleDelete={(id) => dispatch(deleteTask(id))}
              handleToggle={(id) => dispatch(toggleTask(id))}
              handleEdit={(id, text) => dispatch(editTask({ id, text }))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

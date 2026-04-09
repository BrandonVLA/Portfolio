import ToDoItem from "./ToDoItem";

function ToDosList({ taskList, handleToggle, handleDelete }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <span className="font-medium text-slate-900">Your Todos</span>
        <span>
          {taskList.length} item{taskList.length === 1 ? "" : "s"}
        </span>
      </div>
      {taskList.map((task) => (
        <ToDoItem
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          onDelete={handleDelete}
          handleToggle={handleToggle}
        />
      ))}
    </section>
  );
}

export default ToDosList;

import { useState, useEffect } from "react";
import ToDoForm from "../components/ToDoForm";
import ToDosList from "../components/TodosList";
import TodoFilters from "../components/TodoFilters";

function Home() {
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");
  const handleAddToDo = (todo) => {
    const newTask = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
  };

  const handleToggle = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDelete = (id) => {
    console.log("Handling deletion:", id);
    setTaskList(taskList.filter((task) => task.id !== id));
  };
  //Get previous tasks on the session
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved && JSON.parse(saved).length > 0) {
      setTaskList(JSON.parse(saved));
    }
  }, []);
  //Save tasks created on the session
  useEffect(() => {
    if (taskList.length > 0 || localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }, [taskList]);

  const filteredTasks = taskList.filter((tarea) => {
    if (filter === "pending") {
      return tarea.completed === false;
    }
    if (filter === "completed") {
      return tarea.completed === true;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white/95 p-6 shadow-lg shadow-slate-200 ring-1 ring-slate-200">
        <header className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            Simple ToDo App
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            Your ToDo List
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Tasks total:{" "}
            <span className="font-semibold text-slate-900">
              {taskList.length}
            </span>
          </p>
        </header>

        <div className="space-y-6">
          <ToDoForm onAddTodo={handleAddToDo} />
          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            filteredTasks={filteredTasks}
          />
          <ToDosList
            taskList={filteredTasks}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;

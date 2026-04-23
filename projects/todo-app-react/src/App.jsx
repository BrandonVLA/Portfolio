import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import TaskDetail from "./pages/TaskDetail";
function App() {
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
    const numId = Number(id);
    setTaskList(taskList.filter((task) => task.id !== numId));
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

  const handleEditTask = (id, newText) => {
    console.log('HandleEdittask:',{id,newText});
    setTaskList(
      taskList.map((task) =>
        task.id === Number(id) ? { ...task, text: newText } : task,
      ),
    );
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              taskList={taskList}
              filteredTasks={filteredTasks}
              handleAddToDo={handleAddToDo}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              filter={filter}
              setFilter={setFilter}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/task/:id"
          element={
            <TaskDetail
              taskList={taskList}
              onDelete={handleDelete}
              onEdit={handleEditTask}
              onToggle={handleToggle}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

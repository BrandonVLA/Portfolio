import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import ToDoForm from "./components/ToDoForm";
import ToDoItem from "./components/ToDoItem";
import ToDosList from "./components/TodosList";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([]);

  const handleAddToDo = (todo) => {
    const newTask = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    setTaskList([...taskList, newTask]);
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
  return (
    <>
      <section id="center">
        <h1>Your ToDo List</h1>
        <h2>Tasks Total: {taskList.length}</h2>
        <section>
          <ToDoForm onAddTodo={handleAddToDo}></ToDoForm>
        </section>
        <section>
          <ToDosList
            taskList={taskList}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        </section>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;

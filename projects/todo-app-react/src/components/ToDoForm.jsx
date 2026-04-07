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
    <form onSubmit={handleTaskSubmit}>
      <label htmlFor="task">Task Name: </label>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default ToDoForm;

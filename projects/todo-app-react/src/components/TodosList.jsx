import ToDoItem from "./ToDoItem";

function ToDosList({ taskList, handleToggle, handleDelete }) {
  return (
    <section>
      <h1>Your Todos: </h1>
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

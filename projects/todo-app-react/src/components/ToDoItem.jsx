import { ImCheckboxUnchecked } from "react-icons/im";
import { BiSolidCheckboxChecked } from "react-icons/bi";
function ToDoItem({ id, text, completed, onDelete, handleToggle }) {
  return (
    <section
      style={{
        border: "1px solid #fff",
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h2>Task: {text}</h2>
      <h3>
        Is Completed?{" "}
        {completed ? <BiSolidCheckboxChecked /> : <ImCheckboxUnchecked />}
      </h3>
      <button onClick={() => onDelete(id)}>Delete</button>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleToggle(id)}
      />
    </section>
  );
}

export default ToDoItem;

function TodoFilters({ filter, onFilterChange,filteredTasks }) {
  return (
    <div className="flex gap-2 justify-center my-4 ">
      <button
        onClick={() => onFilterChange("all")}
        className={
          filter === "all"
            ? `bg-blue-500 rounded p-2 m-2 text-white w-auto`
            : `bg-gray-200 rounded p-2 m-2 text-black w-auto`
        }
      >
        All
      </button>
      <button
        onClick={() => onFilterChange("pending")}
        className={
          filter === "pending"
            ? `bg-blue-500 rounded p-2 m-2 text-white w-auto`
            : `bg-gray-200 rounded p-2 m-2 text-black w-auto`
        }
      >
        Pending
      </button>
      <button
        onClick={() => onFilterChange("completed")}
        className={
          filter === "completed"
            ? `bg-blue-500 rounded p-2 m-2 text-white w-auto`
            : `bg-gray-200 rounded p-2 m-2 text-black w-auto`
        }
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;

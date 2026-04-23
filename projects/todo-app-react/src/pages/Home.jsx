import { useState, useEffect } from "react";
import ToDoForm from "../components/ToDoForm";
import ToDosList from "../components/TodosList";
import TodoFilters from "../components/TodoFilters";

function Home({
  taskList,
  filteredTasks,
  handleAddToDo,
  handleDelete,
  handleToggle,
  filter,
  setFilter,
}) {
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

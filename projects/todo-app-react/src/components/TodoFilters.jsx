function TodoFilters({ filter, onFilterChange }) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="flex justify-center my-6">
      <div className="inline-flex p-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 w-full max-w-sm">
        {tabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TodoFilters;

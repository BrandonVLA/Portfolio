import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 backdrop-blur-md bg-transparent">
      <nav className="mx-auto max-w-2xl rounded-full border border-slate-200/80 bg-white/75 p-2 shadow-sm shadow-slate-100/50 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75 dark:shadow-none flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
            SmartToDo
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Link
            to="/"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-250 ${
              isActive("/")
                ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25 dark:bg-violet-500"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-250 ${
              isActive("/about")
                ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25 dark:bg-violet-500"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
            }`}
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

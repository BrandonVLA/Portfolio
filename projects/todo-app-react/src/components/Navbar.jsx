import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 backdrop-blur-md bg-transparent">
      <nav className="mx-auto max-w-2xl rounded-full border border-slate-200/80 bg-white/75 p-2 shadow-sm shadow-slate-100/50 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75 dark:shadow-none flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
            SmartToDo
          </span>
        </Link>

        {isAuthenticated ? (
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

            <div className="flex items-center gap-2.5 border-l border-slate-200/60 dark:border-slate-800/60 pl-2.5">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-150/40 dark:border-slate-800/40">
                {/* Círculo con la inicial del usuario */}
                <div className="w-5 h-5 rounded-full bg-violet-600 dark:bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center uppercase select-none">
                  {user?.username?.charAt(0) || "U"}
                </div>
                {/* Nombre de usuario */}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-350 max-w-[80px] truncate">
                  {user?.username}
                </span>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="rounded-full bg-red-50 text-red-650 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-250 ${
              isActive("/login")
                ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25 dark:bg-violet-500"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

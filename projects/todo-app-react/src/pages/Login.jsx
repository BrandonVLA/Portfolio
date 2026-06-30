import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    //basic validation
    if (username.trim() === "" || password.trim() === "") {
      setError("Por favor,completa todos los campos");
      return;
    }
    setIsLoading(true);

    // Simulation that the server is processing our login
    setTimeout(() => {
      dispatch(login({ username: username.trim() }));
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <main className="min-h-[85vh] bg-slate-50/50 dark:bg-slate-950/20 px-4 flex items-center justify-center transition-colors duration-250">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/50 bg-white/95 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/85 dark:shadow-none transition-all">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
            Acceso al Sistema
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            Bienvenido de nuevo
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Ingresa cualquier usuario y contraseña para entrar
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 p-3.5 text-xs font-semibold border border-red-150/40 dark:border-red-900/40 animate-pulse">
              ⚠️ {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-950/40 transition-all"
              placeholder="Ej: brandon"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-950/40 transition-all"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-2xl bg-violet-600 hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400 py-3 text-sm font-semibold text-white transition-all shadow-md shadow-violet-500/10 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;

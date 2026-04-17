import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <main className="min-h-screen bg-slate-500 px-4 py-8">
        <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white/95 p-6 text-center shadow-lg">
          <h1 className="min-h-screen bg-slate-500 px-4 py-8">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-slate-700">
            Page not Found
          </h2>
          <p className="mt-2 text-slate-500">
            The page your looking does not exist or it changed
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-2xl bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-700"
          >
            Go Home
          </button>
        </div>
      </main>
    </>
  );
}

export default NotFound;

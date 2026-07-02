import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[85vh] bg-slate-50/50 dark:bg-slate-950/20 px-4 py-10 flex items-center justify-center transition-colors duration-250">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200/50 bg-white/90 p-6 sm:p-8 shadow-xl shadow-slate-200/40 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/85 dark:shadow-none">
        <header className="mb-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
            About the Project
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-violet-950 to-violet-600 dark:from-white dark:via-violet-200 dark:to-violet-400 bg-clip-text text-transparent">
            SmartToDo App
          </h1>
        </header>

        <div className="space-y-4 text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
          <p>
            <strong>SmartToDo</strong> is a highly interactive task manager integrated with an intelligent AI chatbot that leverages the power of **Google Gemini 2.5 Flash** with Function Calling.
          </p>
          <p>
            This allows you to converse naturally with the bot to create, update, complete, or delete your tasks directly, showing the potential of modern agentic workflows on the web.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/50 mt-4">
            <h3 className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-2">Key Tech Used:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li>React 19 & Redux Toolkit</li>
              <li>Google Generative AI SDK</li>
              <li>Tailwind CSS v4</li>
              <li>React Router v7</li>
              <li>LocalStorage Persistence</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 dark:from-violet-500 dark:to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}

export default About;

import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  return (
    <main>
      <div>
        <h1>About:</h1>
        <p>
          This is a to-do app built with React, Tailwind CSS, and localStorage.
        </p>
        <p>
          Features: add, delete, mark as completed, and filter tasks by their
          completion status.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-2xl bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-700"
        >
          Go Home
        </button>
      </div>
    </main>
  );
}

export default About;

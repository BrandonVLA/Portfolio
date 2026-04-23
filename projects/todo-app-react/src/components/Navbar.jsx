import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-slate-900 text-white mb-4">
      <div className="mx-auto flex max-w-3xl justify-center gap-6">
        <Link
          to="/"
          className="rounded-sm px-3 py-2 transition-colors duration-200 hover:bg-white hover:text-slate-900"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="rounded-sm px-3 py-2 transition-colors duration-200 hover:bg-white hover:text-slate-900"
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

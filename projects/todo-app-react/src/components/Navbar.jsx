import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="mx-auto flex max-w-3xl justify-center gap-6">
        <Link to="/" className="hover:text-slate-300 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-slate-300 transition">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

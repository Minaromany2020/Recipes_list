import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ input, setInput, handleEnter, show }) => {
  const navigate = useNavigate();
  const handleInput = () => {
    handleEnter();
    navigate("/");
  };
  return (
    <div className="flex justify-center">
      <div className="shadow-slate-200 shadow-md navbar bg-base-100 rounded-2xl w-11/12">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Recipes</a>
        </div>
        <div className="navbar-center">
          {show ? (
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search for Item"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? handleInput() : null)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          ) : null}
        </div>
        <div className="navbar-end">
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6 shadow-md">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-blue-400"
            : "hover:text-gray-300"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/watchlist"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-blue-400"
            : "hover:text-gray-300"
        }
      >
        Watchlist
      </NavLink>
    </nav>
  );
}

export default Navbar;
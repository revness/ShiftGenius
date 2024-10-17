import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-500 px-2 sm:px-6 lg:px-8  flex h-16 items-center justify-between mb-1">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        }
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        }
        to="/dashboard"
      >
        Dashboard
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        }
        to="/profile"
      >
        Profile
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        }
        to="/sign-in"
      >
        Sign-in
      </NavLink>

      {/* <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        }
        to="/sign-up"
      >
        Sign-up
      </NavLink> */}
    </nav>
  );
};

export default Navbar;

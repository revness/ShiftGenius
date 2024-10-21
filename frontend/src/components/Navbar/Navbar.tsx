import { NavLink } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlideOut = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gray-500 px-2 sm:px-6 lg:px-8  flex h-16 items-center justify-between mb-1">
      <div>
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

        <button
          onClick={toggleSlideOut}
          className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 ml-2"
        >
          Me
        </button>

        {/* Slide-out panel */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-orange-100 p-4 transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0 z-50" : "-translate-x-full "
          }`}
        >
          <button
            onClick={toggleSlideOut}
            className="text-white absolute top-4 right-4"
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          <ProfileCard />
        </div>
      </div>
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

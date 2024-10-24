import { useContext } from "react";
import calendarImage1 from "../../assets/homepageImage/Calender1.webp";
import calendarImage2 from "../../assets/homepageImage/Calender2.webp";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within a UserProvider");
  }
  const { isAuthenticated } = authContext;

  const handleNavigationToSignIn = () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center px-20 pb-20 pt-10 font-cambria">
        <h1 className="text-4xl font-bold text-center">
          Manage Your Work Roster with ShiftGenius
        </h1>
        <h4 className="text-lg text-gray-500 text-center mt-4">
          Simplify scheduling and streamline your workflow with ease
        </h4>
        {!isAuthenticated ? (
          <button
            className="w-1/5 p-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-pink-600"
            onClick={handleNavigationToSignIn}
          >
            Sign In
          </button>
        ) : (
          <div className=" p-4 mt-2"></div>
        )}

        {/* Cards container */}
        <div className="flex justify-evenly items-stretch w-full mt-12 gap-6">
          {/* Each card */}
          <div className="bg-white shadow-md rounded-lg p-6 w-1/4 flex flex-col min-h-[300px]">
            <h5 className="text-sm text-gray-500">MANAGER STAFF TIME SHEET</h5>
            <h3 className="text-xl font-bold mt-2">Create Shifts</h3>
            <div className="flex-grow mt-4">
              <img
                src={calendarImage2}
                alt="Calender2"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 w-1/4 flex flex-col min-h-[300px]">
            <h5 className="text-sm text-gray-500">SUBMIT YOUR TIME TABLE</h5>
            <h3 className="text-xl font-bold mt-2">Add Your Own Time Sheet</h3>
            <div className="flex-grow mt-4">
              <img
                src={calendarImage1}
                alt="Calender1"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 w-1/4 flex flex-col min-h-[300px]">
            <h5 className="text-sm text-gray-500">MANAGE TIME SHEET STATUS</h5>
            <h3 className="text-xl font-bold mt-2">Approved</h3>
            <div className="flex-grow mt-4">
              <img
                src={calendarImage1}
                alt="Calender3"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

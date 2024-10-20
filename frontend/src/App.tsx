import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/profile";
import UserContextProvider from "./context/UserContextProvider";
function App() {
  return (
    <div className="mx-auto max-w-7xl ">
      <BrowserRouter>
        <UserContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
          {/* <Footer /> */}
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

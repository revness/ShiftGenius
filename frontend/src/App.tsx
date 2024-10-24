import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";

import UserContextProvider from "./context/UserContextProvider";
import PositionContextProvider from "./context/ProfileUserProvider";
import { AuthContextProvider } from "./context/AuthContextProvider";
import ProfileForm from "./pages/Profile/ProfileForm";

function App() {
  return (
    <div className="mx-auto">
      <BrowserRouter>
        <AuthContextProvider>
          <PositionContextProvider>
            <UserContextProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
              {/* <Footer /> */}
            </UserContextProvider>
          </PositionContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

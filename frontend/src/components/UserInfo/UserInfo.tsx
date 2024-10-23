import { useContext, useEffect, useState } from "react";

// import { UserContext } from "../../context/UserContextProvider";

const UserInfo = () => {
  // const userContext = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");
    if (userName && email) {
      setUserName(userName);
      setEmail(email);
    }
  });

  //it is a safeguard, TypeScript knows that after this check, userContext is no longer undefined
  // if (!userContext) {
  //   throw new Error("useContext must be used within a UserProvider");
  // }

  // const { user } = userContext;

  return (
    <div className="bg-white shadow-md px-9 py-4 max-w-sm mx-auto mt-10 ">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{userName}</h2>
      <div className="flex items-center">
        <span className="text-gray-800">{email}</span>
      </div>
    </div>
  );
};

export default UserInfo;

import { useContext, useEffect, useState } from "react";

// import { UserContext } from "../../context/UserContextProvider";

const UserInfo = () => {
  // const userContext = useContext(UserContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUserName(userName);
    }
  });

  //it is a safeguard, TypeScript knows that after this check, userContext is no longer undefined
  // if (!userContext) {
  //   throw new Error("useContext must be used within a UserProvider");
  // }

  // const { user } = userContext;

  return (
    <div className=" shadow-md px-4 py-2 max-w-sm mx-auto ml-20">
      <h2 className="text-l mb-2 text-gray-800">Welcome, {userName}</h2>
    </div>
  );
};

export default UserInfo;

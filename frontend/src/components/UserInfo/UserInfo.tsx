import { useContext } from "react";

import { UserContext } from "../../context/UserContextProvider";

const UserInfo = () => {
  const userContext = useContext(UserContext);

  //it is a safeguard, TypeScript knows that after this check, userContext is no longer undefined
  if (!userContext) {
    throw new Error("useContext must be used within a UserProvider");
  }

  const { user } = userContext;

  return (
    <div className="bg-white shadow-md px-9 py-4 max-w-sm mx-auto mt-10 ">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{user?.userName}</h2>
      <div className="flex items-center">
        <span className="text-gray-800">{user?.email}</span>
      </div>
    </div>
  );
};

export default UserInfo;

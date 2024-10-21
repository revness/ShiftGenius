import { useContext, useEffect, useState } from "react";
import { getProfile } from "../../services/shift";
import {
  ProfileUser,
  ProfileUserContext,
} from "../../context/ProfileUserProvider";

const ProfileCard = () => {
  const profileUserContext = useContext(ProfileUserContext);

  if (!profileUserContext) {
    throw new Error("useContext must be used within a UserProvider");
  }

  const { profileUser, setProfileUser } = profileUserContext;

  useEffect(() => {
    const fetchProfile = async () => {
      if (profileUser?.id) {
        try {
          const res = await getProfile(profileUser.id);
          if (res) {
            setProfileUser((prev: ProfileUser | null) => ({
              id: prev?.id || "",
              userName: prev?.userName || "",
              email: prev?.email || "",
              position: res.position,
              department: res.department,
              phone: res.phone,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
        }
      }
    };
    fetchProfile();
  }, [profileUser?.id, setProfileUser]);
  return (
    <div className="mt-10 font-cambria">
      <div className=" p-6 max-w-sm w-full mx-auto">
        <h1 className="top-10 left-21 text-5xl font-semibold mb-6 z-50 ">
          My Info
        </h1>
        {profileUser ? (
          <div className="space-y-4">
            <div className="text-base	 font-semibold text-gray-800">
              Username: <span className="">{profileUser.userName}</span>
            </div>
            <div className="text-base	 font-semibold text-gray-800">
              Email: <span className="">{profileUser.email}</span>
            </div>
            <div className="text-base	 font-semibold text-gray-800">
              Position: <span className="">{profileUser.position}</span>
            </div>
            <div className="text-base	 font-semibold text-gray-800">
              Department: <span className="">{profileUser.department}</span>
            </div>
            <div className="text-base	 font-semibold text-gray-800">
              Phone: <span className="">{profileUser.phone}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Please fill up your profile</p>
          </div>
        )}
      </div>

      <div className="mt-5 w-full">
        <button
          type="button"
          className="w-full p-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

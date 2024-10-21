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
    <div>
      {profileUser ? (
        <div>
          <div>Username: {profileUser.userName}</div>
          <div>Email: {profileUser.email}</div>
          <div>Position: {profileUser.position}</div>
          <div>Department: {profileUser.department}</div>
          <div>Phone: {profileUser.phone}</div>
        </div>
      ) : (
        <div>
          <p>Please fill up your profile</p>
        </div>
      )}

      <div className="mt-5 w-1/6">
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

import { createContext, ReactNode, useState } from "react";

export interface ProfileUser {
  id: string;
  userName: string;
  email: string;
  position: string;
  department: string;
  phone: string;
}

interface ProfileUserContextProps {
  profileUser: ProfileUser | null;
  setProfileUser: React.Dispatch<React.SetStateAction<ProfileUser | null>>; // Allow functional updates
}

export const ProfileUserContext = createContext<
  ProfileUserContextProps | undefined
>(undefined);

const ProfileUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);

  return (
    <ProfileUserContext.Provider value={{ profileUser, setProfileUser }}>
      {children}
    </ProfileUserContext.Provider>
  );
};

export default ProfileUserContextProvider;

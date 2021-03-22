import React, {createContext, FC, useState,useEffect} from "react";
import authService from "../auth/AuthService";

export type UserModel = {
  name?: string;
}

export type UserContextModel = {
  user?: UserModel;
  setUser?: (user?: UserModel) => void;
}

export const UserContext = createContext<UserContextModel>({
  setUser: (user?: UserModel) => {
  }
});

export const UserContextProvider: FC = ({children}) => {
  const [user, setUser] = useState<UserModel>();
  const value: UserContextModel = {user, setUser};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

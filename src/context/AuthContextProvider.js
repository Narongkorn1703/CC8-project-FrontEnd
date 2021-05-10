import { createContext } from "react";
import { useState } from "react";
import { getToken } from "../services/localStorageService";
import JwtDecode from "jwt-decode";
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(getToken());
  const [user, setUser] = useState({});
  // const [cloneUser, setCloneUser] = useState({});
  let decodeTk;
  const getUser = async () => {
    try {
      decodeTk = await JwtDecode(getToken());
      await setUser(decodeTk);
    } catch (error) {
      console.log(error);
    }
  };
  const IsAdmin = { ...user };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        getUser,
        IsAdmin,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;

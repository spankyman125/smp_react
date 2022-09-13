import { UserAPI } from "api/UserAPI";
import { AuthAPI } from "api/AuthAPI";
import * as React from 'react';
import { useState } from "react";


const AuthContext = React.createContext({
  isLogged: false,
  signin: null,
  signout: null,
  signup: null,
});

export const useAuth = () => {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [sessionRestoreTried, setSessionRestoreTried] = useState(false);

  const signin = async (username, password, rememberFlag) => {
    return AuthAPI.signin(username, password, rememberFlag)
      .then(() => {
        console.log("Signed in");
        setIsLogged(true);
      })
      .catch((error) => {
        console.log("Signin failed");
        setIsLogged(false);
        return Promise.reject(error)
      })
  }

  const signup = async (username, password) => {
    return UserAPI.create(username, password)
  }

  const signout = () => {
    AuthAPI.signout();
  }

  const trySessionRestore = () => {
    AuthAPI.restoreSession()
      .then(() => {
        console.log("Session restored");
        setSessionRestoreTried(true);
        setIsLogged(true);
      })
      .catch(() => {
        console.log("Session restore failed");
        setSessionRestoreTried(true);
      })
  }

  React.useEffect(() => trySessionRestore(), []);

  const contextValue = { isLogged, signin, signout, signup, }

  if (sessionRestoreTried)
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
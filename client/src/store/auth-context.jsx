import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  // isLoggedIn: false,
  onLogout: () => {},

  onLogin: (user_id, email, name) => {},
  userInfo: null
});

export const AuthContextProvider = (props) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    // if (storedUserLoggedInInformation === "1") {
    //   setIsLoggedIn(true);
    // }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
  };

  const loginHandler = (user_id, email, name) => {
    localStorage.setItem("userID", user_id);
    localStorage.setItem("userName", name);
    setUserInfo({ userEmail: email });
    // setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        // isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        userInfo: userInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

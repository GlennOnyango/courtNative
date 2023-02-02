import React, { useState } from "react";

const auth = {
  user: { Name: "", Phone: 0, id: 0, role: "", status: false },
  login: (formData) => {},
  logout: () => {},
};

const AuthContext = React.createContext(auth);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    Name: "",
    Phone: 0,
    id: 0,
    role: "",
    status: false,
  });

  const loginHandler = (formData) => {
    console.log(formData);
    setUser(formData);
  };

  const logoutHandler = () => {
    setUser({ Name: "", Phone: 0, id: 0, role: "", status: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

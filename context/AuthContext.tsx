import React, { useState } from "react";

const auth = {
  user: { Name: "", Phone: 0, status: false },
  login: (formData: User) => {},
  logout: () => {},
};
type Props = {
  children: JSX.Element;
};

type User = {
  Name: string;
  Phone: number;
  status: boolean;
};

const AuthContext = React.createContext(auth);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({
    Name: "",
    Phone: 0,
    status: false,
  });

  const loginHandler = (formData: User) => {
    setUser(formData);
  };

  const logoutHandler = () => {
    setUser({ Name: "", Phone: 0, status: false });
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

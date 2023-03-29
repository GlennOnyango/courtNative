import React, { useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";


const auth = {
  user: { Name: "", Phone: 0, token: "", expiry: 0 },
  login: (formData: User | any) => {},
  logout: () => {},
};
type Props = {
  children: JSX.Element;
};

type User = {
  Name: string;
  Phone: number;
  token: string;
  expiry: number;
};

const AuthContext = React.createContext(auth);

export const AuthContextProvider = ({ children }: Props) => {
  //const navigation = useNavigation();
  const [user, setUser] = useState<User>({
    Name: "",
    Phone: 0,
    token: "",
    expiry: 0,
  });

  const loginHandler = (formData: User | any) => {
    setUser(formData);
  };

  const logoutHandler = () => {
    setUser({ Name: "", Phone: 0, token: "", expiry: 0 });
  };

  async function getValueFor(key) {
    const result = await SecureStore.getItemAsync(key);

    if (result) {
      const resultData = JSON.parse(result);
      if (Date.now() >= resultData.expiry) {
        setUser(resultData);
      }
    } else {
     // navigation.navigate("Login" as never);
    }
  }

  useEffect(() => {
    getValueFor("token_exp");
  }, []);

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

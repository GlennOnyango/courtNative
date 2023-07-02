import React, { useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";
import { useFetch } from "../customHooks/useFetch";
import { useNavigation } from "@react-navigation/native";

const auth = {
  user: { Name: "", Phone: 0, token: "", expiry: 0 },
  login: () => {},
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
  const navigation = useNavigation();

  const [data, callApi, isLoading] = useFetch();

  const [user, setUser] = useState<User>({
    Name: "",
    Phone: 0,
    token: "",
    expiry: 0,
  });

  const loginHandler = async () => {
    const result = await SecureStore.getItemAsync("token_exp");

    if (result) {
      const resultData = JSON.parse(result);
      if (Date.now() < resultData.expiry) {
        callApi("user/details", false, resultData.token);
      }
    } else {
      // navigation.navigate("Login" as never);
    }
  };

  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    if (Object.keys(data)[0] !== "fetch") {
      SecureStore.getItemAsync("token_exp")
        .then((result) => {
          if (result) {
            const resultData = JSON.parse(result);
            if (Date.now() < resultData.expiry) {
              const userSpread = {
                Name: `${data.firstName} ${data.lastName}`,
                Phone: Number(data.phoneNumber),
                token: resultData.token,
                expiry: resultData.expiry,
              };
              setUser(userSpread);

              save("user", JSON.stringify(userSpread));

              navigation.navigate(`Home` as never);
            }
          }
        })
        .catch((err) => console.log("No user details found"));
    } else {
      SecureStore.getItemAsync("user")
        .then((result) => {
          if (result) {
            const resultData = JSON.parse(result);
            if (Date.now() < resultData.expiry) {
              setUser(resultData);
              navigation.navigate(`Home` as never);
            }
          }
        })
        .catch((err) => navigation.navigate(`Login` as never));
    }
  }, [data]);

  const logoutHandler = () => {
    setUser({ Name: "", Phone: 0, token: "", expiry: 0 });
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

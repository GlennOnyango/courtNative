import React, { useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";
import { useFetch } from "../customHooks/useFetch";
import { useNavigation } from "@react-navigation/native";

const auth = {
  user: { Name: "", Phone: 0, token: "", expiry: 0, role: "" },
  court: { Name: "", Code: "", courtId: "", status: false },
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
  role: string;
};

const AuthContext = React.createContext(auth);

export const AuthContextProvider = ({ children }: Props) => {
  const navigation = useNavigation();

  const { data, callApi, isLoading } = useFetch();
  const { data: courtData, callApi: callApiCourt } = useFetch();

  const [user, setUser] = useState<User>({
    Name: "",
    Phone: 0,
    token: "",
    expiry: 0,
    role: "tenant",
  });

  const [court, setCourt] = useState({
    Name: "",
    Code: "",
    courtId: "",
    status: false,
  });

  const loginHandler = async () => {
    const result = await SecureStore.getItemAsync("token_exp");

    if (result) {
      const resultData = JSON.parse(result);
      if (Date.now() < resultData.expiry) {
        callApi("user/details", resultData.token);
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
                role: data.role,
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

  useEffect(() => {
    if (user.role === "Admin") {
      callApiCourt("court/details", user.token);
    }
  }, [user]);

  useEffect(() => {
    if (Object.keys(courtData)[0] !== "fetch") {
      const courtSpread = {
        Name: courtData.Name,
        Code: courtData.Code,
        courtId: courtData._id,
        status: courtData.status,
      };
      setCourt(courtSpread);
    }
  }, [courtData]);

  const logoutHandler = () => {
    setUser({ Name: "", Phone: 0, token: "", expiry: 0, role: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        court: court,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

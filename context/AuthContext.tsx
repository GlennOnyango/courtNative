import React, { useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";
import { useFetch } from "../customHooks/useFetch";
import { useNavigation } from "@react-navigation/native";
const auth = {
  user: { Name: "", Phone: 0, token: "", expiry: 0, role: "" },
  court: { Name: "", Code: "", courtId: "", status: false },
  login: (e: Record<string, unknown>) => {},
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
  isAdmin?: boolean;
};

const AuthContext = React.createContext(auth);

export const AuthContextProvider = ({ children }: Props) => {
  const { data, callApi } = useFetch();
  const { data: courtData, callApi: callApiCourt } = useFetch();
  const navigator = useNavigation();
  const [user, setUser] = useState<User>({
    Name: "",
    Phone: 0,
    token: "",
    expiry: 0,
    role: "",
    isAdmin: false,
  });

  const [court, setCourt] = useState({
    Name: "",
    Code: "",
    courtId: "",
    status: false,
  });

  async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    if ("fetch" in data) {
      SecureStore.getItemAsync("user")
        .then((result) => {
          if (result) {
            const resultData = JSON.parse(result);
            if (Date.now() < resultData.expiry) {
              setUser(resultData);
            }
          }
        })
        .catch((err) => {
          console.log("No user details found", err);
        });
    } else {
      SecureStore.getItemAsync("token_exp")
        .then((result) => {
          if (result) {
            const resultData = JSON.parse(result);
            if (Date.now() < resultData.expiry) {
              const userSpread = {
                Name: `${data.genericUsername}`,
                Phone: Number(data.phoneNumber),
                token: resultData.token,
                expiry: resultData.expiry,
                isAdmin: data.roles[0] === "admin" ? true : false,
                role: data.roles[0],
              };
              save("user", JSON.stringify(userSpread));
              setUser(userSpread);
            }
          }
        })
        .catch((err) => console.log("No user details found", err));
    }
  }, [data]);

  useEffect(() => {
    if (user.role === "admin") {
      if ("fetch" in courtData) {
        callApiCourt("/api/v1/courts", false, user.token);
      } else {
        if (Object.keys(courtData).length > 0) {
          const courtSpread = {
            Name: courtData.Name,
            Code: courtData.Code,
            courtId: courtData._id,
            status: courtData.status,
          };
          setCourt(courtSpread);
          navigator.navigate("Home" as never);
        } else {
          navigator.navigate("Create Court" as never);
        }
      }
    } else if (user.role === "tenant") {
      navigator.navigate("Home" as never);
    }
  }, [courtData, user]);

  const loginHandler = async (e: Record<string, unknown>) => {
    save("token_exp", JSON.stringify(e));
    //callApi("/api/v1/uaa/user/details", true, String(e.token));

    const userSpread = {
      Name: `Glenn`,
      Phone: 719458873,
      token: "sadawehqew123213",
      expiry: 213123213123,
      isAdmin: true,
      role: "admin",
    };
    save("user", JSON.stringify(userSpread));
    setUser(userSpread);


      const courtSpread = {
        Name: "Glenn Court",
        Code: "123123",
        courtId: "2",
        status: true,
      };
      setCourt(courtSpread);
      navigator.navigate("Home" as never);

  };

  const logoutHandler = () => {
    setUser({ Name: "", Phone: 0, token: "", expiry: 0, role: "" });
    SecureStore.deleteItemAsync("token_exp");
    SecureStore.deleteItemAsync("user");
    navigator.navigate("Login" as never);
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

import React, { useMemo } from "react";

import AuthContext from "../context/AuthContext";
import HomeAdmin from "./admin/HomeAdmin";
import HomeTenant from "./tenant/HomeTenant";

export default function Admin({ navigation }) {
  const ctx = React.useContext(AuthContext);

  const homeType = useMemo(() => {
    if (ctx.user && ctx.user.role === "admin") {
      return <HomeAdmin navigation={navigation} />;
    } else if (ctx.user && ctx.user.role === "tenant") {
      return <HomeTenant navigation={navigation} />;
    } else {
      return null;
    }
  }, [ctx.user]);

  return <>{homeType}</>;
}

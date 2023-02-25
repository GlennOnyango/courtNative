import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { app } from "../firebaseConfig";
export const useGetUsers = () => {
  const [users, setData] = useState<any[]>([]);

  const database = getDatabase(app);
  const starCountRef = ref(database, `users/`);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const userData:any[]= [];

      if (snapshot.exists()) {
        const data:Record<string,any> = snapshot.val();

        for (const user in data) {
            userData.push(data[user]);
        }
      }

      setData(userData);
    });
  }, []);

  return [users];
};

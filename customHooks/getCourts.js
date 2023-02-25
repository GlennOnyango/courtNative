import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { app } from "../firebaseConfig";
export const useGetCourts = () => {
  const [courts, setData] = useState([]);

  const database = getDatabase(app);
  const starCountRef = ref(database, `court/`);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const userData = [];

      if (snapshot.exists()) {
        const data = snapshot.val();

        for (const user in data) {
          userData.push(data[user]);
        }
      }

      setData(userData);
    });
  }, []);

  return [courts];
};

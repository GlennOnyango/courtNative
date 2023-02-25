import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { app } from "../firebaseConfig";
export const useGetCourts = () => {
  const [courts, setCourt] = useState([]);

  const database = getDatabase(app);
  const starCountRef = ref(database, `court/`);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const courtData = [];

      if (snapshot.exists()) {
        const data = snapshot.val();

        for (const user in data) {
          courtData.push(data[user]);
        }
      }

      setData(courtrData);
    });
  }, []);

  return [courts];
};

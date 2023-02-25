import { useState, useCallback } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { app } from "../firebaseConfig";
export const useCheckPrefect = () => {
  const [prefects, setPrefects] = useState([]);

  const database = getDatabase(app);
  const starCountRef = ref(database, `court/`);

  const getPrefect = useCallback(() => {
    onValue(starCountRef, (snapshot) => {
      const courtData:any[] = [];

      if (snapshot.exists()) {
        const data:Record<string,any> = snapshot.val();

        for (const court in data) {
          courtData.push(data[court]);
        }
      }

      console.log(courtData);

    });
  }, []);

  return [getPrefect];
};

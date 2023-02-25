import { useState, useCallback } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import { app } from "../firebaseConfig";
export const useCheckPrefect = () => {
  const [isPrefects, setIsPrefects] = useState(false);

  const database = getDatabase(app);

  const getPrefect = useCallback((user: string) => {
    const starCountRef = ref(database, `prefects/${user}`);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data: Record<string, any> = snapshot.val();

        if (data) {
          setIsPrefects(true);
        }
      }
    });
  }, []);

  return [getPrefect, isPrefects] as const;
};

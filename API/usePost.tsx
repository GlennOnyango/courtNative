import { useState, useCallback } from "react";

import { main_url } from "../constants";

export const usePost = (token) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const callApi = useCallback((url, formData) => {
    setIsLoading(true);
    const url_send =`${main_url}${url}`;

    
    const extra = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch(url_send, extra)
      .then((res) => {
        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && res.json();

        if (!res.ok) {
          const error = (data && data.message) || res.status;
          console.log(url_send);

          return { error: url_send };
        }

        return data;
      })
      .then((data) => {
        setIsLoading(false);

        setData(data);
      });
  }, []);

  return [data, callApi, isLoading];
};

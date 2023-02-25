import { useState, useCallback } from "react";
import { main_url } from "../constants";

export const useFetch = (token) => {
  const [data, setData] = useState({ fetch: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const callApi = useCallback((url, formData) => {
    setIsLoading(true);
    const url_send = formData
      ? `${main_url}${url}${formData}`
      : `${main_url}${url}`;

    const extra = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url_send, extra)
      .then((res) => {
        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && res.json();

        if (!res.ok) {
          const error = (data && data.message) || res.status;
          return { error: error };
        }
        setIsLoading(false);

        return data;
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return [data, callApi, isLoading];
};

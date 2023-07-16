import { useState, useCallback } from "react";
import { main_url } from "../constants";

export const useFetch = (token?: string) => {
  const [data, setData] = useState<any>({ fetch: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);

  const callApi = useCallback(
    (url: string, formData?: any) => {
      reset();
      setIsLoading(true);
      const url_send = formData
        ? `${main_url}${url}${formData}`
        : `${main_url}${url}`;

      const extra = token
        ? {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : {};
      fetch(url_send, extra)
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            throw error;
          }

          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          setFetchSuccess(true);
          setData(data);
        })
        .catch((err) => {
          setIsLoading(false);
          setFetchError(true);
        });
    },
    [token]
  );
  const reset = useCallback(() => {
    setData({});
    setIsLoading(false);
    setFetchError(false);
    setFetchSuccess(false);
  }, []);

  return { data, callApi, isLoading, reset, fetchError, fetchSuccess };
};

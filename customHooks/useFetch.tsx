import { useState, useCallback } from "react";
import { auth_url, courts_url } from "../constants";

export const useFetch = () => {
  const [data, setData] = useState<any>({ fetch: true });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);

  const callApi = useCallback(
    (url: string, auth: boolean, token?: string, formData?: any) => {
      setIsLoading(true);
      const url_steup = `${auth ? auth_url : courts_url}${url}`;
      const url_send = formData ? `${url_steup}${formData}` : `${url_steup}`;
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
            const error = new Error(
              `An error occurred while sending data! ${url_send}`
            );
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
          console.log(err);
        });
    },
    []
  );

  return { data, callApi, isLoading, fetchError, fetchSuccess };
};

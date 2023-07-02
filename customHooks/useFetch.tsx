import { useState, useCallback } from "react";
import { main_url } from "../constants";

export const useFetch = () => {
  const [data, setData] = useState<any>({ fetch: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callApi = useCallback((url: string, formData?: any, token?: string) => {
    setIsLoading(true);
    const url_send = formData
      ? `${main_url}${url}${formData}`
      : `${main_url}${url}`;

    console.log(url_send);

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
        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");
        const data: any = isJson && res.json();

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
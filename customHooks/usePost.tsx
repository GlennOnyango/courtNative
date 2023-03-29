import { useState, useCallback } from "react";

import { main_url } from "../constants";

type Extra = {
  method: string;
  headers: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  body: string;
};

export const usePost = (token?: string, file?: boolean) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callApi = useCallback((formData: any, url: string) => {
    setIsLoading(true);
    const url_send = formData ? `${main_url}${url}` : `${url}`;
    const extra: Extra = {
      method: "POST",
      headers: token
        ? !file
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          : { Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" },
      body: file ? formData : JSON.stringify(formData),
    };

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

        return data;
      })
      .then((data) => {
        setIsLoading(false);

        setData(data);
      });
  }, []);

  return [data, callApi, isLoading] as const;
};
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
  const [postError, setPostError] = useState<boolean>(false);
  const [postsuccess, setPostSuccess] = useState<boolean>(false);

  const callApi = useCallback((formData: any, url: string) => {
    reset();
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
        if (!res.ok) {
          console.log(res);
          const error = new Error(res.statusText);
          throw error;
        }

        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setPostSuccess(true);

        setData(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setPostError(true);
      });
  }, []);

  const reset = useCallback(() => {
    setData({});
    setIsLoading(false);
    setPostError(false);
    setPostSuccess(false);
  }, []);

  return { data, callApi, isLoading, reset, postError, postsuccess };
};

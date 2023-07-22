import { useEffect, useMemo } from "react";
import { useFetch } from "./useFetch";

export const useGetBills = (token: string) => {
  const { data, callApi, fetchError, fetchSuccess } = useFetch(token);

  useEffect(() => {
    if ("fetch" in data) {
      callApi("/bills");
    }
  }, [data]);

  const items = useMemo(() => {
    if (fetchSuccess) {
      return data;
    }
    return [];
  }, [fetchError, fetchSuccess]);

  return { items, fetchError, fetchSuccess };
};

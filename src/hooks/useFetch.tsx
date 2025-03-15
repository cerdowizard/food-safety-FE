import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../services/real/api";

interface Fetch<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string, secured: boolean = false): Fetch<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = secured
          ? { Authorization: `Bearer ${Cookies.get("token")}` }
          : {};
        const response = await axiosInstance.get(url, { headers: headers });
        setData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(true);
      }
    };

    fetchData();
  }, [url, secured]);

  return { data, isLoading, error };
}

export default useFetch;

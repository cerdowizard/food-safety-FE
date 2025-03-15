import { useEffect, useState } from "react";
import axiosInstance from "../services/real/api";
import Cookies from "js-cookie";
interface Post {
  message: string;
  error: Error | null;
  loading: boolean;
}

interface PostData<T> {
  payload: T;
}

function usePost<T>(
  url: string,
  payload: PostData<T>,
  secured: boolean = true
): Post {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const abortController = new AbortController();
    const postData = async () => {
      try {
        const headers = secured
          ? { Authorization: `Bearer ${Cookies.get("token")}` }
          : {};
        const response = await axiosInstance.post(url, payload, {
          headers,
          signal: abortController.signal,
        });
        setMessage(response.data.message);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(error as Error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
      return () => {
        abortController.abort();
      };
    };

    postData();
  }, [url, payload, secured]);
  return { message, loading, error };
}

export default usePost;

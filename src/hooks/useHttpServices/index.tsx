import axios from "axios";
import { useState } from "react";
import baseURL from "../../config/baseURL";
export const useHttpServices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({});

  const postData = async (path: string, body: object) => {
    const thePath = `${baseURL}${path}`;

    try {
      setIsLoading(true);
      const { data } = await axios.post(thePath, body);

      return data;
    } catch (error) {
      //  error?.response
      //@ts-ignore
      console.log(error?.response?.data?.error?.message);
      //@ts-ignore
      return error?.response?.data;
    } finally {
      setIsLoading(false);
    }
  };
  const patchData = async (path: string, body: object) => {
    const thePath = `${baseURL}${path}`;

    try {
      setIsLoading(true);
      const { data } = await axios.patch(thePath, body);

      return data;
    } catch (error) {
      //  error?.response
      //@ts-ignore
      console.log(error?.response?.data?.error?.message);
      //@ts-ignore
      return error?.response?.data;
    } finally {
      setIsLoading(false);
    }
  };
  const deleteData = async (path: string, body: object) => {
    const thePath = `${baseURL}${path}`;

    try {
      setIsLoading(true);
      const { data } = await axios.delete(thePath, body);

      return data;
    } catch (error) {
      //  error?.response
      //@ts-ignore
      console.log(error?.response?.data?.error?.message);
      //@ts-ignore
      return error?.response?.data;
    } finally {
      setIsLoading(false);
    }
  };
  const getData = async (path: string) => {
    const thePath = `${baseURL}${path}`;

    try {
      setIsLoading(true);
      const { data } = await axios.get(thePath);
      console.log(data);
      return data;
    } catch (error) {
      //  error?.response
      //@ts-ignore
      console.log(error?.response?.data?.error?.message);
      //@ts-ignore
      return error?.response?.data;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postData, getData, payload, patchData, deleteData };
};

import { useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    onReset,
  };
};

export const useResource = (baseUrl) => {
  let token = null;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const create = async (newObject) => {
    // set authorization headers
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  };

  const update = async (id, updatedObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
    return response.data;
  };

  const remove = async (id) => {
    const config = {
      headers: { Authorization: token },
    };

    axios.delete(`${baseUrl}/${id}`, config);
  };

  const service = {
    create,
    getAll,
    update,
    setToken,
    remove,
  };

  return service;
};

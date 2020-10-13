import { useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    clear,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  let token = null;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return setResources(response.data);
  };

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return setResources([...resources, response.data]);
  };

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl} /${id}`, newObject);
    return request.then((response) => response.data);
  };

  const service = {
    create,
    getAll,
    update,
    setToken,
  };

  return [resources, service];
};

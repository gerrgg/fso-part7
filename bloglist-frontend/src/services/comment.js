import axios from "axios";

const create = async (blogID, comment) => {
  const endpoint = `/api/blogs/${blogID}/comments`;
  const response = await axios.post(endpoint, comment);

  return response.data;
};

export default { create };

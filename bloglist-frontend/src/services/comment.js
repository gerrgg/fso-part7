import axios from "axios";
const baseUrl = "http://localhost:3003/api/comments";

const create = async (blogID, comment) => {
  const endpoint = `http://localhost:3003/api/blogs/${blogID}/comments`;
  const response = await axios.post(endpoint, comment);

  return response.data;
};

export default { create };

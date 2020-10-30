import axios from "axios";
<<<<<<< HEAD
=======
// const baseUrl = "http://localhost:3003/api/comments";
>>>>>>> b54605d6690823bc18086168d62ca8abdedec9aa

const create = async (blogID, comment) => {
  const endpoint = `/api/blogs/${blogID}/comments`;
  const response = await axios.post(endpoint, comment);

  return response.data;
};

export default { create };

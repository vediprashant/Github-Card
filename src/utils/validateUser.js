import API_URL from "../Constants/urlConstants";

const validateUser = async (token) => {
  const data = await fetch(`${API_URL.validateUrl}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

export default validateUser;

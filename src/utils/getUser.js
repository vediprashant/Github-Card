import API_URL from "../Constants/urlConstants";

const validateUser = async (user) => {
  const data = await fetch(`${API_URL.userCardUrl}/${user}`);
  const jsonData = await data.json();
  return jsonData;
};

export default validateUser;

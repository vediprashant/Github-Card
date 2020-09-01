import API_URL from "../Constants/urlConstants";

const suggestedUsers = async () => {
  const data = await fetch(`${API_URL.suggestionsUrl()}`);
  const jsonData = await data.json();
  return jsonData;
};

export default suggestedUsers;

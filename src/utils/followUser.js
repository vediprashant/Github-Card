import API_URL from "../Constants/urlConstants";
import handleTokens from "./handleTokens";

const followUser = async (user) => {
  const success = await fetch(`${API_URL.followUrl}/${user}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${handleTokens.getToken("token")}`,
    },
  });
  return success;
};

export default followUser;

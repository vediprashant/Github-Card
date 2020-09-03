import API_URL from "../Constants/urlConstants";
import handleTokens from "./handleTokens";

const checkFollowing = async (user) => {
  const data = await fetch(`${API_URL.followUrl}/${user}`, {
    headers: {
      Authorization: `token ${handleTokens.getToken("token")}`,
    },
  });
  if (data.status === 204) {
    return true;
  }
  return false;
};

export default checkFollowing;

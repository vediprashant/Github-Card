const BASE_URL = "https://api.github.com";

const API_URL = {
  validateUrl: `${BASE_URL}/user`,
  userCardUrl: `${BASE_URL}/users`,
  suggestionsUrl: () =>
    `${BASE_URL}/users?since=${Math.floor(Math.random() * 20000)}&per_page=3`,
  randomUserUrl: () =>
    `${BASE_URL}/users?since=${Math.floor(Math.random() * 20000)}&per_page=1`,
  followUrl: `${BASE_URL}/user/following`,
};

export default API_URL;

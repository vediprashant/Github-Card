import API_URL from "../Constants/urlConstants";

const getRandomUser = async () => {
  const data = await fetch(`${API_URL.randomUserUrl()}`);
  console.log(API_URL.randomUserUrl());
  const jsonData = await data.json();
  return jsonData;
};

export default getRandomUser;

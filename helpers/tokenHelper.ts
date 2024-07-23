import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  const tokenDataString = await AsyncStorage.getItem("access_token");
  if (!tokenDataString) return null;
  
  const tokenData = JSON.parse(tokenDataString);
  const expirationDate = new Date(tokenData.expirationDate);

  if (new Date() > expirationDate) {
    // Token has expired
    await AsyncStorage.removeItem("access_token");
    return null;
  }
  // Token is valid
  return tokenData.token;
};

export const setToken = async (token: string) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);

  const tokenData = {
    token: token,
    expirationDate: expirationDate.toISOString(),
  };

  await AsyncStorage.setItem("access_token", JSON.stringify(tokenData));
};

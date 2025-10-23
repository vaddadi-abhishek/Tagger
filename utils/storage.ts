import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};
export const getToken = async () => {
  return AsyncStorage.getItem("token");
};
export const clearToken = async () => {
  await AsyncStorage.removeItem("token");
};

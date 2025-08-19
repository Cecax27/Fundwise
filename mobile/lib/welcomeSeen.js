import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkWelcomeSeen = async () => {
  const seen = await AsyncStorage.getItem("welcome_seen");
  return seen === "true";
};

export const setWelcomeSeen = async () => {
  await AsyncStorage.setItem("welcome_seen", "true");
};
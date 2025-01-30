import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};
export const login = async (username, password) => {
  try {
    let value = await AsyncStorage.getItem("users");
    value = JSON.parse(value);

    if (Array.isArray(value) && value.length != 0) {
      const user = value?.find((user) => user.userName === username);
      if (!user || user.password != password) {
        return { error: "wrong username or password" };
      } else {
        await AsyncStorage.setItem(
          "logged",
          JSON.stringify({ username, isLoged: true })
        );

        return { message: "login succefuly" };
      }
    } else {
      return { error: "no user found" };
    }
  } catch (error) {
    return Error(error);
  }
};
export const getCodes = async (user) => {
  try {
    let value = await AsyncStorage.getItem("codes");
    value = JSON.parse(value);

    if (Array.isArray(value) && value.length != 0) {
      const codes = value?.filter((code) => code.user === user);

      return codes;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);

    return Error(error);
  }
};
export const deleteCodes = async (createdAt) => {
  try {
    let value = await AsyncStorage.getItem("codes");
    value = JSON.parse(value);
    if (Array.isArray(value) && value.length != 0) {
      const codes = value?.filter((code) => code.createdAt != createdAt);
      await AsyncStorage.setItem("codes", JSON.stringify(codes));
      return codes;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);

    return Error(error);
  }
};


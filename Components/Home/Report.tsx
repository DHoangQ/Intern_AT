import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { LoginList } from "../../Types/Type";

const Report = () => {
  const navigation = useNavigation<StackNavigationProp<LoginList>>();
  const [username, setUsername] = useState<string>("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUsername(userData.userName || userData.email || "");
        } else {
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        navigation.replace("Login");
      }
    };

    getUserData();
  }, [isFocused, navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userLoggedIn");
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("accountId");
      navigation.replace("Login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Xin chào, {username}!
      </Text>
      <Text>Report</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginTop: 20, padding: 10, backgroundColor: "red", borderRadius: 25 }}>
        <Text style={{ color: "white", fontSize: 16 }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Report;
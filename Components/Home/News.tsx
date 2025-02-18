import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { LoginList } from "../../Types/Type";

const News = () => {
  const navigation = useNavigation<StackNavigationProp<LoginList>>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userLoggedIn");
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>News</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginTop: 20, padding: 10, backgroundColor: "red", borderRadius: 25,}}>
        <Text style={{ color: "white", fontSize: 16 }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default News;

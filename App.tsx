import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LoginList, BottomTabList } from "./Types/Type";
import Splash from "./Components/Splash";
import StartScreen from "./Components/StartScreen";
import Register from "./Components/RegisterAccount/Register";
import Login from "./Components/Login";
import ForgotPassWord from "./Components/ForgotPassWord";
import News from "./Components/Home/News";
import Jobs from "./Components/Home/Jobs";
import Report from "./Components/Home/Report";
import Account from "./Components/Home/Account";

const Stack = createStackNavigator<LoginList>();
const Tab = createBottomTabNavigator<BottomTabList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case "News":
              iconName = "document-text-outline";
              break;
            case "Jobs":
              iconName = "briefcase-outline";
              break;
            case "Report":
              iconName = "bar-chart-outline";
              break;
            case "Account":
              iconName = "person-circle-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgba(254, 144, 26, 0.89)",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          borderTopWidth: 1,
          paddingBottom: 7,
          paddingTop: 5,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarShowLabel: true,
        headerShown: false,
      })}>
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Jobs" component={Jobs} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem("userLoggedIn");
      setIsLoggedIn(userLoggedIn ? true : false);
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;

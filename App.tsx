import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginList } from './Types/Type';
import Splash from './Components/Splash';
import StartScreen from './Components/StartScreen';
import Register from './Components/RegisterAccount/Register';
import Login from './Components/Login';
import ForgotPassWord from './Components/ForgotPassWord';
import BottomTabNavigator from './Components/Home/BottomTabNavigator';

const Stack = createStackNavigator<LoginList>();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;
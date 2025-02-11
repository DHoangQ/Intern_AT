import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabList } from '../../Types/Type';
import News from './News';
import Jobs from './Jobs';
import Report from './Report';
import Account from './Account';


const Tab = createBottomTabNavigator<BottomTabList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'News':
              iconName = 'document-text-outline';
              break;
            case 'Jobs':
              iconName = 'briefcase-outline';
              break;
            case 'Report':
              iconName = 'bar-chart-outline';
              break;
            case 'Account':
              iconName = 'person-circle-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgba(254, 144, 26, 0.89)',
        tabBarInactiveTintColor: 'gray',
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
      <Tab.Screen name="News">{() => <News/>}</Tab.Screen>
      <Tab.Screen name="Jobs">{() => <Jobs/>}</Tab.Screen>
      <Tab.Screen name="Report">{() => <Report/>}</Tab.Screen>
      <Tab.Screen name="Account">{() => <Account/>}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

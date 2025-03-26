import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NewsScreens } from '../../Types/Type';
import All from '../Home/NewsScreen/All';
import LearnMakeMoney from '../Home/NewsScreen/LearnMakeMoney';
import CaseStudy from '../Home/NewsScreen/CaseStudy';
import styles from '../../Styles/style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator<NewsScreens>();

const News = () => {

  return (
    <View style={styles.News}>
      <View style={styles.headerNews}>
        <Image source={require('../../assets/image/logo.png')} style={styles.logoNews} />
        <Text style={styles.headerNewstxt}>ACCESSTRADE</Text>
        <TouchableOpacity style={styles.btnsearch}><Ionicons name="search-outline" size={40} color="black" style={styles.iconNews1} /></TouchableOpacity>
        <TouchableOpacity style={styles.btnplus}><Ionicons name="add-circle" size={40} color="black" style={styles.iconNews2} /></TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabBarIndicatorStyle: {
            backgroundColor: 'rgba(233, 132, 24, 0.99)',
            height: 3,
            width: 0.2,
          },
          tabBarItemStyle: {
            width: 'auto',
            height: 55,
          },
        }}>
        <Tab.Screen name="All" component={All} options={{ tabBarLabel: "Tất cả" }} />
        <Tab.Screen name="LearnMakeMoney" component={LearnMakeMoney} options={{ tabBarLabel: "Học kiếm tiền" }} />
        <Tab.Screen name="CaseStudy" component={CaseStudy} options={{ tabBarLabel: 'Case Study' }} />
      </Tab.Navigator>
    </View>
  );
};

export default News;
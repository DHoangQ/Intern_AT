import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from '../Styles/style';
import Icon from 'react-native-vector-icons/Ionicons';
import { Screen } from '@react-navigation/elements';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  return (
    <View style={styles.register}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('StartScreen')}>
          <Icon name="close-outline" size={40} style={{ marginRight: '85%', marginTop: '7%' }} color={'grey'} />
        </TouchableOpacity>
        <Image source={require('../assets/image/logo3.png')} style={styles.logo3} />
      </View>

      <Text style={styles.titleLogin}>Đăng Nhập</Text>

      <View style={styles.input}>
            <Icon name="person-outline" size={25} color="grey" />
            <TextInput placeholder="Điện thoại/email/tên đăng nhập" style={{ fontSize: 18 }}/>
      </View>

      <View style={styles.input}>
        <Icon name="lock-closed-outline" size={25} color="grey" />
        <TextInput placeholder="Mật khẩu" style={{ fontSize: 18, flex: 1 }} secureTextEntry={!isPasswordVisible}/>
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={25} color="grey" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassWord')}><Text style={styles.txtloginscr}>Quên mật khẩu</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.regisbutton]}>
        <Text style={styles.startbuttonText} onPress={() => navigation.navigate('BottomTabNavigator')}>Đăng Nhập</Text>
      </TouchableOpacity>

      <Text style={styles.textregis}>Hoặc đăng nhập với</Text>

      <View style={styles.btnauth}>
        <TouchableOpacity style={styles.loginauth}>
          <Image source={{uri: 'https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1',}} style={styles.googleIcon}/>
          <Text style={styles.txtauth}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginauth}>
        <Icon name="logo-apple" size={35} />
          <Text style={styles.txtauth}>Apple ID</Text>
        </TouchableOpacity>  
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ width: 80, height: 1, backgroundColor: 'black' }} />
        <Text style={{ margin: 10, fontSize: 17}}>Bạn chưa có tài khoản?</Text>
        <View style={{ width: 80, height: 1, backgroundColor: 'black' }} />
      </View>
      <TouchableOpacity style={styles.registerbtn}>
        <Text style={styles.textregis2} onPress={() => navigation.navigate('Register')}>Đăng ký tài khoản</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login
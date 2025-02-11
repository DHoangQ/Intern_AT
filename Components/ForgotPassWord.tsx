import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../Styles/style'
import Icon from 'react-native-vector-icons/Ionicons'

const ForgotPassWord: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.register}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Icon name="arrow-back-outline" size={40} style={{ marginRight: '85%', marginTop: '7%' }}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 27, fontWeight: 'bold', marginTop: '5%', marginRight: '25%' }}>Khôi Phục Mật Khẩu</Text>
        <Text style={styles.textregis3}>Vui lòng nhập địa chỉ email bạn đã đăng ký để tiến hành khôi phục lại mật khẩu</Text>
        <View style={styles.input}>
            <TextInput placeholder="Địa chỉ email" style={{ fontSize: 18 }}/>
        </View>
        <View>
            <TouchableOpacity style={[styles.regisbutton]}>
                <Text style={styles.startbuttonText}>Khôi phục lại mật khẩu</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
export default ForgotPassWord
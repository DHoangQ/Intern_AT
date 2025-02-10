import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../Styles/style';

interface Step1Props {
  navigation: any;
  email: string;
  setemail: (text: string) => void;
  midName: string;
  setmidName: (text: string) => void;
  name: string;
  setname: (text: string) => void;
  phone: string;
  setphone: (text: string) => void;
  handleNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ navigation, email, setemail, midName, setmidName, name, setname, phone, setphone, handleNext }) => {
  const isValidGmail = (email: string) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const isDisabled = !email.trim() || !isValidGmail(email) || !midName.trim() || !name.trim() || !phone.trim();
  
  return (
    <>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('StartScreen')}>
                <Icon name="close-outline" size={40} style={{ marginRight: '85%', marginTop: '7%' }} color={'grey'} />
            </TouchableOpacity>
            <Image source={require('../../assets/image/logo3.png')} style={styles.logo3} />
        </View>
        <Text style={{ fontSize: 27, fontWeight: 'bold', marginTop: '40%' }}>Đăng Ký Tài Khoản</Text>
        <View style={styles.input}>
            <Icon name="at-outline" size={25} color="grey" />
            <TextInput placeholder="Địa chỉ email" keyboardType="email-address" style={{ fontSize: 18 }}
            value={email} onChangeText={(text) => setemail(text)} />
        </View>
        {!isValidGmail(email) && email.trim() !== '' && (
            <Text style={{ color: 'red', fontSize: 14, marginTop: 5 }}>
                Vui lòng nhập đúng định dạng Gmail (example@gmail.com)
            </Text>
        )}

        <View style={styles.regisname}>
            <View style={styles.input2}>
                <Icon name="person-outline" size={25} color="grey" />
                <TextInput placeholder="Họ Tên Đệm" style={{ fontSize: 18 }}
                value={midName} onChangeText={(text) => setmidName(text)}/>
            </View>
            <View style={styles.input3}>
                <TextInput placeholder="Tên" style={{ fontSize: 18 }}
                value={name} onChangeText={(text) => setname(text)}/>
            </View>
        </View>
        <View style={styles.input}>
            <Icon name="phone-portrait-outline" size={25} color="grey" />
            <TextInput placeholder="Số điện thoại" keyboardType="numeric" style={{ fontSize: 18 }}
            value={phone} onChangeText={(text) => setphone(text)}/>
        </View>

        <TouchableOpacity style={[styles.regisbutton, isDisabled && { backgroundColor: 'gray' }]} 
            onPress={handleNext} disabled={isDisabled}>
            <Text style={styles.startbuttonText}>Tiếp Tục</Text>
        </TouchableOpacity>

        <Text style={styles.textregis}>Bằng việc đăng ký, bạn đã đồng ý với
            <TouchableOpacity>
                <Text style={styles.clause}>Điều khoản dịch vụ</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 17, paddingTop: 10, paddingLeft: 2, paddingRight: 2 }}>và</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.clause}>Chính sách bảo mật</Text>
            </TouchableOpacity>
        </Text>
        <TouchableOpacity style={styles.registerbtn}>
            <Text style={styles.textregis2} onPress={() => navigation.navigate('Login')}>Đã có tài khoản? Đăng nhập ngay</Text>
        </TouchableOpacity>
    </>
  );
};

export default Step1;

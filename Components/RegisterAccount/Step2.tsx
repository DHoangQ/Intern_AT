import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../../Styles/style';

interface Step2Props {
  userName: string;
  setuserName: (text: string) => void;
  handleNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ userName, setuserName, handleNext }) => {
  const isValidUserName = (userName: string) => {
    const userNameRegex = /^[a-zA-Z0-9_]{6,}$/;
    return userNameRegex.test(userName);
  };

  const isDisabled = !userName.trim() || !isValidUserName(userName);

  return (
    <>
      <Text style={{ fontSize: 27, fontWeight: 'bold', marginTop: '15%', marginRight: '25%' }}>Chọn Tên Đăng Nhập</Text>
      <View style={styles.input}>
        <TextInput placeholder="Tên đăng nhập" style={{ fontSize: 18 }} value={userName} onChangeText={(text) => setuserName(text)}/>
      </View>

      {!isValidUserName(userName) && userName.trim() !== '' && (
        <Text style={{ color: 'red', fontSize: 14, marginTop: 5, marginLeft: "10%", marginRight: "10%"}}>
          Tên đăng nhập phải có ít nhất 6 ký tự, không dấu, không chứa khoảng trắng.
        </Text>
      )}

      <Text style={styles.textregis3}>Tên đăng nhập là đại diện cho tên của bạn trên ONE ACCESSTRADE, tối thiểu 6 ký tự không dấu,
        không chứa khoảng cách và không chứa ký tự đặc biệt.</Text>
      <View>
        <TouchableOpacity style={[styles.regisbutton, isDisabled && { backgroundColor: 'gray' }]} 
          onPress={handleNext} disabled={isDisabled}>
          <Text style={styles.startbuttonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Step2;

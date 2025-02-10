import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../Styles/style';

interface Step3Props {
  passWord: string;
  setpassWord: (text: string) => void;
  isPasswordVisible: boolean;
  setIsPasswordVisible: (visible: boolean) => void;
  RegisAccount: () => void;
  navigation: any;
}

const Step3: React.FC<Step3Props> = ({ passWord, setpassWord, isPasswordVisible, setIsPasswordVisible, RegisAccount, navigation }) => {
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState<string>(""); 
  const [modalVisible, setModalVisible] = useState(false);

  const hasSpace = (text: string) => /\s/.test(text);

  const validatePassword = (text: string) => {
    setpassWord(text);
    if (text.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
    } else if (hasSpace(text)) {
      setError("Mật khẩu không được chứa dấu cách.");
    } else {
      setError("");
    }
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text !== passWord) {
      setError("Mật khẩu xác nhận không khớp!");
    } else {
      setError("");
    }
  };

  const isDisabled = passWord.length < 8 || hasSpace(passWord) || confirmPassword !== passWord;
  const handleRegister = async () => {
    await RegisAccount();
    setModalVisible(true);
  };

  return (
    <>
      <Text style={{ fontSize: 27, fontWeight: 'bold', marginTop: '15%', marginRight: '40%' }}>Chọn Mật Khẩu</Text>
      <View style={styles.input}>
        <Icon name="lock-closed-outline" size={25} color="grey" />
        <TextInput placeholder="Mật khẩu" style={{ fontSize: 18, flex: 1 }} secureTextEntry={!isPasswordVisible} 
          value={passWord} onChangeText={validatePassword}/>
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={25} color="grey" />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 16, color: 'grey', marginTop: '3%', marginRight: '45%' }}>Nhập tối thiểu 8 ký tự.</Text>

      <View style={styles.input}>
        <Icon name="lock-closed-outline" size={25} color="grey" />
        <TextInput placeholder="Xác thực mật khẩu" style={{ fontSize: 18, flex: 1 }} secureTextEntry={!isPasswordVisible} 
          value={confirmPassword} onChangeText={validateConfirmPassword}/>
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={25} color="grey" />
        </TouchableOpacity>
      </View>

      {error !== "" && (
        <Text style={{ color: 'red', fontSize: 14, marginTop: 5 }}>
          {error}
        </Text>
      )}

      <TouchableOpacity style={[styles.regisbutton, isDisabled && { backgroundColor: 'gray' }]} 
        onPress={handleRegister} disabled={isDisabled}>
        <Text style={styles.startbuttonText}>Hoàn tất đăng ký</Text>
      </TouchableOpacity>

      <Text style={styles.textregis}>
        Bằng việc đăng ký, bạn đã đồng ý với
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

      <Modal animationType="slide" transparent={true} visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle-outline" size={60} color="green" />
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>Đăng ký thành công!</Text>
            <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>
              Tạo tài khoản thành công. Hãy đăng nhập ngay để bắt đầu sử dụng.
            </Text>
            <TouchableOpacity style={styles.modalButton} 
                onPress={() => {setModalVisible(false);
                navigation.navigate('Login');
            }}>
              <Text style={{ fontSize: 18, color: 'white' }}>Đăng nhập ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Step3;

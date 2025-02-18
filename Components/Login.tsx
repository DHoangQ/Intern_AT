import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../Styles/style";
import Icon from "react-native-vector-icons/Ionicons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const LoginAccount = async () => {
    try {
      if (!email || !passWord) {
        showError("Chưa nhập đầy đủ tài khoản và mật khẩu");
        return;
      }

      const logmail = query(collection(db, "account"), where("email", "==", email));
      const querySnapshot = await getDocs(logmail);

      if (querySnapshot.empty) {
        showError("Sai tài khoản");
        return;
      }

      let isPasswordCorrect = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().passWord === passWord) {
          isPasswordCorrect = true;
        }
      });

      if (!isPasswordCorrect) {
        showError("Sai mật khẩu");
        return;
      }

      await AsyncStorage.setItem("userLoggedIn", "true");

      setPassWord("");
      navigation.replace("BottomTabNavigator");

    } catch (error) {
      console.error("Lỗi:", error);
      showError("Đăng nhập lỗi, hãy thử lại");
    }
  };

  return (
    <View style={styles.register}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("StartScreen")}>
          <Icon name="close-outline" size={40} style={{ marginRight: "85%", marginTop: "7%" }} color={"grey"} />
        </TouchableOpacity>
        <Image source={require("../assets/image/logo3.png")} style={styles.logo3} />
      </View>

      <Text style={styles.titleLogin}>Đăng Nhập</Text>

      <View style={styles.input}>
        <Icon name="person-outline" size={25} color="grey" />
        <TextInput placeholder="Điện thoại/email/tên đăng nhập" style={{ fontSize: 18 }}
        value={email} onChangeText={(text) => setEmail(text)}/>
      </View>

      <View style={styles.input}>
        <Icon name="lock-closed-outline" size={25} color="grey" />
        <TextInput placeholder="Mật khẩu" style={{ fontSize: 18, flex: 1 }}
          secureTextEntry={!isPasswordVisible}
          value={passWord} onChangeText={(text) => setPassWord(text)}/>
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={25} color="grey" />
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassWord")}>
        <Text style={styles.txtloginscr}>Quên mật khẩu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.regisbutton} onPress={LoginAccount}>
        <Text style={styles.startbuttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <Text style={styles.textregis}>Hoặc đăng nhập với</Text>

      <View style={styles.btnauth}>
        <TouchableOpacity style={styles.loginauth}>
          <Image source={{ uri: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" }}
          style={styles.googleIcon}/>
          <Text style={styles.txtauth}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginauth}>
          <Icon name="logo-apple" size={35} />
          <Text style={styles.txtauth}>Apple ID</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 80, height: 1, backgroundColor: "black" }} />
        <Text style={{ margin:  10, fontSize: 17 }}>Bạn chưa có tài khoản?</Text>
        <View style={{ width: 80, height: 1, backgroundColor: "black" }} />
      </View>

      <TouchableOpacity style={styles.registerbtn} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.textregis2}>Đăng ký tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
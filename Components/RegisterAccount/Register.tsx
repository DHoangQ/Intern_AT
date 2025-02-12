import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Step1 from '../RegisterAccount/Step1';
import Step2 from '../RegisterAccount/Step2';
import Step3 from '../RegisterAccount/Step3';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../Config/firebaseConfig';
import styles from '../../Styles/style';

const Register: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setemail] = useState<string>("");
  const [midName, setmidName] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [phone, setphone] = useState<string>("");
  const [userName, setuserName] = useState<string>("");
  const [passWord, setpassWord] = useState<string>("");

  const RegisAccount = async () => {
    try { 
      await addDoc(collection(db, "account"), {
        email, midName, name, phone, userName, passWord
      });
      console.log("Đăng ký thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <ScrollView>
      <View style={styles.register}>
        {step === 1 && <Step1 navigation={navigation} email={email} setemail={setemail} midName={midName} setmidName={setmidName} name={name} setname={setname} phone={phone} setphone={setphone} handleNext={handleNext} />}
        {step === 2 && <Step2 userName={userName} setuserName={setuserName} handleNext={handleNext} />}
        {step === 3 && <Step3 navigation={navigation} passWord={passWord} setpassWord={setpassWord} isPasswordVisible={isPasswordVisible} setIsPasswordVisible={setIsPasswordVisible} RegisAccount={RegisAccount} />}
      </View>
    </ScrollView>
  );
};

export default Register;

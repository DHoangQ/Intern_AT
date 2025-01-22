import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Background } from '@react-navigation/elements';
import styles from '../Styles/style';
 
const StartScreen = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = [
      { id: 1, text: 'Kiếm 1 triệu dễ dàng chỉ với chiếc điện thoại' },
      { id: 2, text: 'Nhận thưởng và rút tiền theo tuần' },
      { id: 3, text: 'Chính sách hoa hồng số 1 thị trường' },
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <Background style={styles.start}>
          <View>
            <Image source={require('../assets/image/logo2.png')} style={styles.logo2} />
          </View>
          <View>
            <Image source={require('../assets/image/img1.png')} style={styles.img1} />
          </View>
          <View style={styles.slideContainer}>
            <Text style={styles.slideText}>{slides[activeSlide].text}</Text>
          </View>
          <View style={styles.dotContainer}>
            {slides.map((_, index) => (
            <View key={index} style={[styles.dot, activeSlide === index ? styles.activeDot : styles.inactiveDot,]}/>
            ))}
          </View>
          <TouchableOpacity style={styles.loginscr}><Text style={styles.txtloginscr}>Đăng nhập</Text></TouchableOpacity>
          <TouchableOpacity style={styles.registerscr}><Text style={styles.textscr}>Đăng ký tài khoản</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.textscr}>Tôi sẽ đăng nhập hoặc đăng ký sau</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.textscr}>Tiếng Việt</Text></TouchableOpacity>
      </Background>
    );
  };

export default StartScreen;

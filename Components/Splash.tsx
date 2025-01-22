import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../Styles/style';

const Splash: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headcontainer}>
          <Image source={require('../assets/image/headimage.jpg')} style={styles.headimg} />
          <Image source={require('../assets/image/logo.png')} style={styles.logo} />
          <Text style={styles.texthead}> Thông điệp từ CEO ACCESSTRADE</Text>
        </View> 
        <View>
          <Text style={styles.texts}>Các bạn thân mến,</Text>
          <Text  style={styles.texts}>Chúng ta đang sống trong kỷ nguyên của thiết bị 
            thông minh - nơi mà dự kiến năm 2023 có tới 6,8 tỷ người
             dùng smartphone. Ở đó, cơ hội kiếm tiền là như nhau, 
             nhưng khoảng cách giàu nghèo trong xã hội cũng ngày một lớn hơn.
             <Text style={{ fontWeight: 'bold' }}> Bạn muốn giàu hay nghèo?</Text></Text>
          <Text  style={styles.texts}>Với <Text style={{ fontWeight: 'bold' }}>20 năm</Text> kinh nghiệm trên thế giới và 7 năm phát triển tại Việt Nam,
             ACCESSTRADE tự hào đã giúp hơn <Text style={{ fontWeight: 'bold' }}>1,7 triệu</Text> thành viên (publishers) tại Việt Nam
              kiếm được tiền, tổng số tiền tới hơn <Text style={{ fontWeight: 'bold' }}>1000 tỷ</Text> đồng.</Text>
          <Text  style={styles.texts}>Bạn đã sẵn sàng để trở thành thành viên tiếp theo của ACCESSTRADE? Hãy bắt đầu ngay hôm nay!</Text>
          <Text  style={styles.texts}>Năm cũ sắp qua, năm mới đang đến, mến chúc bạn và gia đình một năm mới bình an!</Text>
        </View>
        <Image source={require('../assets/image/signature.png')} style={styles.signature} />
        <TouchableOpacity style={styles.startbutton}><Text style={styles.startbuttonText} onPress={() => navigation.navigate('StartScreen')}>Bắt đầu ngay</Text></TouchableOpacity>
      </ScrollView>
    );
  };

export default Splash;
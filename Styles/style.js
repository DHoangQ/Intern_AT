import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //Splash Screen
  container: {
    alignItems: 'center',
  },
  headcontainer: {
    position: 'relative',
    width: '100%',
    height: 275,
  },
  headimg: {
    width: '100%',
    height: 275,
    transform: [{ rotate: '180deg' }],
  },
  logo: {
    position: 'absolute',
    marginTop: 130,
    left: '40%',
    width: 100,
    height: 55,
  },
  texthead: {
    position: 'absolute',
    left: '10%',
    marginTop: 220,
    fontSize: 23,
    fontFamily: 'Charm-Regular',
  },
  texts: {
    fontSize: 17,
    marginLeft: 23,
    marginRight: 23,
    marginTop: 20,
  },
  signature: {
    marginTop: 30,
    width: 200,
    height: 100,
    marginLeft: '55%',
    marginBottom: 15,
  },
  startbutton: {
    backgroundColor: 'rgba(233, 132, 24, 0.99)',
    width: 400,
    borderRadius: 10,
  },
  startbuttonText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    color: 'white',
  },

  //StartScreen
  start: {
    backgroundColor: 'rgba(239, 104, 32, 0.99)',
    alignItems: 'center',
  },
  logo2: {
    marginTop: '13%',
    width: 275,
    height: 130,
    marginLeft: '5%',
  },
  img1: {
    marginTop: 30,
    width: 400,
    height: 260,
  },
  slideContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  slideText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: '15%',
    marginRight: '15%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.99)',
  },
  inactiveDot: {
    backgroundColor: 'rgba(228, 226, 225, 0.99)',
  },
  loginscr: {
    marginTop: 20,
    width: 375,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  txtloginscr: {
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    color: 'rgba(239, 104, 32, 0.99)',
    fontWeight: 'bold',
  },
  registerscr: {
    marginTop: 10,
    width: 375,
    borderWidth: 1.2,
    borderColor: 'white',
    borderRadius: 10,
  },
  textscr: {
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    color: 'rgba(255, 255, 255, 0.99)',
  },

  //Register
  logo3: {
    position: 'absolute',
    width: 300,
    height: 200,
    marginTop: '12%',
  },
  register: {
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 160, 160, 0.48)',
    borderRadius: 8,
    paddingHorizontal: 13,
    width: '80%',
    height: 55,
    fontSize: 18,
    marginTop: 22,
  },
  regisname: {
    flexDirection: 'row',
    width: '80%',
  },
  input2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 160, 160, 0.48)',
    borderRadius: 8,
    paddingHorizontal: 13,
    width: '60%',
    height: 55,
    fontSize: 18,
    marginTop: 22,
  },
  input3: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 160, 160, 0.48)',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '35%',
    height: 55,
    fontSize: 18,
    marginTop: 22,
    marginLeft: '5%',
  },
  regisbutton: {
    backgroundColor: 'rgba(233, 132, 24, 0.99)',
    width: '80%',
    borderRadius: 10,
    marginTop: 10,
  },
  textregis: {
    textAlign: 'center',
    fontSize: 17,
    marginLeft: 23,
    marginRight: 23,
    marginTop: 20,
    width: '80%',
  },
  clause: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  registerbtn: {
    marginTop: 10,
    width: 375,
    borderWidth: 1.2,
    borderColor: 'rgba(233, 132, 24, 0.99)',
    borderRadius: 10,
    width: '80%',
  },
  textregis2: {
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    color: 'rgba(233, 132, 24, 0.99)',
  },
  textregis3: {
    fontSize: 16,
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
    color: 'grey',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: 'rgba(233, 132, 24, 0.99)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  //Login
  titleLogin: {
    fontSize: 27, 
    fontWeight: 'bold', 
    marginTop: '43%',
    textAlign: 'center',
  },
  btnauth: {
    flexDirection: 'row',
  },
  googleIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  loginauth: {
    width: '39%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: '6%',
    paddingRight: '6%',
    borderWidth: 1,
    borderColor: 'rgba(167, 160, 160, 0.48)',
    borderRadius: 10,
    margin: 8,
  },
  txtauth: {
    fontSize: 18,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },  
});

export default styles;

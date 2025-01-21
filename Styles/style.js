import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //Start Screen  
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

  //Login
  login: {
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF6347',
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  
});

export default styles;

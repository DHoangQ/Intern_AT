import { relative } from 'path';
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
    width: '40%',
    borderRadius: 10,
    marginTop: 10,
    margin: 10,
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

  //Account
  WidthScroll: {
    flexDirection: "row",
    width: 'auto',
    marginTop: '2%',
  },
  HeightScroll: {
    flexGrow: 1,
  },
  Table: {
    flexDirection: "row",
    backgroundColor: "rgba(167, 160, 160, 0.48)",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.74)",
  },
  cell: {
    width: 180,
    textAlign: "center",
    alignItems: "center",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderColor: "rgba(167, 160, 160, 0.48)",
  },
  TableText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(86, 78, 78, 0.71)",
    paddingVertical: 10,
  },
  ChangeAccount: {
    backgroundColor: 'rgba(233, 132, 24, 0.99)',
    width: '40%',
    borderRadius: 10,
    margin: 10,
  },
  ChangeAccounttxt: {
    fontSize: 16,
    textAlign: 'center',
    padding: 1,
    color: 'white',
  },

  //News
  News: {
    flex: 1,
  },
  headerNews: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 3,
    paddingBottom: 20,
    paddingTop: 20,
  },
  logoNews: {
    width: 60,
    height: 40,
    marginLeft: '3%',
  },
  headerNewstxt: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
    marginTop: 4,
  },
  btnsearch: {
    marginLeft: '32%',
  },
  iconNews1: {
    fontSize: 32,
    marginTop: 5,
  },
  btnplus: {
    marginLeft: '2%',
  },
  iconNews2: {
    color: 'rgba(233, 132, 24, 0.99)',
    fontSize: 33,
    marginTop: 5,
  },
  //CaseStudy
  containercasestudy: {
    flex: 1,
    padding: 10,
  },
  cardcasestudy: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageCaseStudy: {
    height: 400,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  info: {
    fontSize: 20,
    marginTop: 5,
  },
  timecase: {
    fontSize: 14,
  },
  description: {
    fontSize: 17,
    marginTop: 3,
    marginBottom: 5,
  },
  statstudy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2.5%',
  },
  iconcase: {
    fontSize: 25,
    marginTop: 3,
  },
  icontxts: {
    fontSize: 23,
  },
  staticon: {
    flexDirection: "row",
  },

  avatarImage: {
    width: 55,
    height: 55,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userTextInfo: {
    flex: 1,
  },
  
  modalContainer2: {
    padding: 16,
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentListContainer: {
    flex: 1,
    height: 480,
  },
  commentItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentAvatarPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentUserName: {
    fontWeight: 'bold',
  },
  commentTime: {
    color: '#888',
    fontSize: 12,
  },
  commentText: {
    marginTop: 5,
  },
  commentInputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 10, 
    borderTopWidth: 1, 
    borderColor: '#ddd', 
    paddingTop: 10,
  },
  commentInput: {
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 20, 
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
  },
});
  
export default styles;

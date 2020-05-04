import {Platform, StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes/';
const styles = StyleSheet.create({
  imgContainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
  },
  header: {
    height: Metrics.HEIGHT * 0.1,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
    ...Platform.select({
      ios: {
        marginTop: 0,
      },
      android: {
        marginTop: Metrics.HEIGHT * 0.03,
      },
    }),
  },
  screenBg: {
    width: Metrics.WIDTH,
    height: '100%',
    backgroundColor: 'black',
  },
  left: {
    backgroundColor: 'transparent',
  },
  backArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    alignItems: 'stretch',
  },
  textTitle: {
    color: Colors.txtgrey,
    fontSize: Fonts.moderateScale(12),
    marginTop: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  right: {},
  logostyle: {
    marginTop: Fonts.moderateScale(10),
    marginBottom: Fonts.moderateScale(10),
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.35,
    height: Metrics.WIDTH * 0.28,
  },
  inputFieldSec: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itememail: {
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.85,
    height: Metrics.HEIGHT * 0.08,
  },
  inputemail: {
    marginLeft: Fonts.moderateScale(-15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: 'black',
  },
  itempassword: {
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.85,
    height: Metrics.HEIGHT * 0.08,
  },
  inputpassword: {
    marginLeft: Fonts.moderateScale(-15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: 'black',
  },
  signInSec: {
    width: Metrics.WIDTH,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    position: 'absolute',
    bottom: 0,
  },
  buttondialogsignup: {
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.WIDTH * 0.8,
  },
  buttonsignin: {
    alignSelf: 'center',
    fontSize: Fonts.moderateScale(16),
    fontWeight: 'bold',
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: Colors.black,
    padding: Fonts.moderateScale(13),
  },
  forgotpass: {
    marginTop: Fonts.moderateScale(10),
    fontSize: Fonts.moderateScale(17),
    color: '#9b9fa2',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },
  back: {
    fontSize: 12,
    marginLeft: 15,
  },
  backView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {},
  btnMdpVisible: {
    position: 'absolute',
    right: 0,
    bottom: Metrics.HEIGHT * 0.025,
  },
  Container: {
    flex: 1,
    width: '100%',
  },
  imagesPicker: {flex: 10},
  buttons: {flex: 4},
  textBottom: {
    flex: 2,
    width: Metrics.WIDTH * 0.7,
    alignSelf: 'center',
  },
  proimg: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  profileImgs: {
    width: Metrics.WIDTH * 0.6,
    height: Metrics.WIDTH * 0.6,
    borderRadius: Metrics.WIDTH * 0.6,
    alignSelf: 'center',
    marginTop: Metrics.HEIGHT * 0.02,
    backgroundColor: 'grey',
  },
  cameraIcon: {
    width: Metrics.WIDTH * 0.2,
    height: Metrics.WIDTH * 0.2,
    borderRadius: Metrics.WIDTH * 0.1,
    alignSelf: 'flex-end',
    marginLeft: -(Metrics.WIDTH * 0.2),
    marginBottom: Metrics.WIDTH * 0.23,
    backgroundColor: 'rgb(57,90,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    backgroundColor: 'rgb(57,90,255)',
    width: Metrics.WIDTH * 0.018,
    height: Metrics.WIDTH * 0.018,
    borderRadius: Metrics.WIDTH * 0.009,
    marginLeft: Metrics.WIDTH * 0.004,
    marginRight: Metrics.WIDTH * 0.004,
    ...Platform.select({
      ios: {
        marginBottom: Metrics.HEIGHT * 0.08,
      },
      android: {
        marginBottom: Metrics.HEIGHT * 0.06,
      },
    }),
  },
  buttonlogin: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    height: Metrics.HEIGHT * 0.06,
    width: Metrics.WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 3},
    shadowColor: Colors.shadows,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: Metrics.HEIGHT * 0.03,
  },
  buttonsignup: {
    backgroundColor: Colors.yellow,
    alignSelf: 'center',
    height: Metrics.HEIGHT * 0.06,
    width: Metrics.WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 3},
    shadowColor: Colors.shadows,
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  dot: {
    backgroundColor: 'rgb(212,216,224)',
    width: Metrics.WIDTH * 0.018,
    height: Metrics.WIDTH * 0.018,
    borderRadius: Metrics.WIDTH * 0.009,
    marginLeft: Metrics.WIDTH * 0.004,
    marginRight: Metrics.WIDTH * 0.004,
    ...Platform.select({
      ios: {
        marginBottom: Metrics.HEIGHT * 0.08,
      },
      android: {
        marginBottom: Metrics.HEIGHT * 0.06,
      },
    }),
  },
  publishBotton: {
    backgroundColor: 'rgb(255,213,0)',
    width: Metrics.WIDTH * 0.35,
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.05,
      },
      android: {
        height: Metrics.HEIGHT * 0.06,
      },
    }),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  publishText: {
    fontFamily: Fonts.type.sfuiDisplayMedium,
    fontSize: Fonts.moderateScale(15),
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
   publishBotton2: {
    backgroundColor: 'rgb(57,90,255)',
    width: Metrics.WIDTH * 0.35,
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.05,
      },
      android: {
        height: Metrics.HEIGHT * 0.06,
      },
    }),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  publishText2: {
    fontFamily: Fonts.type.sfuiDisplayMedium,
    fontSize: Fonts.moderateScale(15),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnText: {
    fontFamily: 'SFUIDisplay-Medium',
    color: 'black',
    fontWeight: 'bold',
    fontSize: Fonts.moderateScale(17),
  },
  textBottomTxt: {
    fontFamily: 'SFUIDisplay-Medium',
    color: 'black',
    fontSize: Fonts.moderateScale(15),
    textAlign: 'center',
  },
});
export default styles;

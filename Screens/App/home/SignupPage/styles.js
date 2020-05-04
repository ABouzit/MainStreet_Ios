import {Platform, StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes/';
const styles = StyleSheet.create({
  imgContainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
  },
  header: {
    backgroundColor: '#fff',
    height: Metrics.HEIGHT * 0.1,
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
  itemeNom: {
    marginRight: 10,
    flex: 0.5,
  },
  itemePrenom: {
    flex: 0.5,
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
  btnMdpVisible2: {
    position: 'absolute',
    right: 40,
    bottom: Metrics.HEIGHT * 0.025,
  },
  nomPrenom: {
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.85,
    height: Metrics.HEIGHT * 0.08,
    justifyContent: 'center',
  },
});
export default styles;

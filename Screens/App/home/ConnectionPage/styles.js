import {Platform, StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes/';

const styles = StyleSheet.create({
  screenBg: {
    width: Metrics.WIDTH,
    height: '100%',
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.1,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25),
      },
    }),
    elevation: 0,
  },
  backArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  left: {
    flex: 0.5,
    backgroundColor: 'transparent',
  },
  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modelMain: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logostyle: {
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.18,
    height: Metrics.WIDTH * 0.18,
    marginBottom: Metrics.HEIGHT * 0.02,
  },
  headertext: {
    fontFamily: Fonts.PlayfairDisplayBold,
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 30,
    width: Metrics.WIDTH * 0.9,
    color: 'white',
    marginTop: Metrics.HEIGHT * 0.08,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  desctext: {
    fontFamily: Fonts.Bariol,
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    width: Metrics.WIDTH * 0.65,
    color: 'white',
    marginTop: Metrics.HEIGHT * 0.04,
  },
  form: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 20,
    marginTop: Metrics.HEIGHT * 0.05,
  },
  buttonlogin: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor:'#fed227',
    height: Metrics.HEIGHT * 0.06,
    width: Metrics.WIDTH * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.HEIGHT * 0.15,
  },

  buttonsignup: {
    backgroundColor: Colors.yellow,
    alignSelf: 'center',
    height: Metrics.HEIGHT * 0.08,
    width: Metrics.WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.HEIGHT * 0.03,
  },
  buttondialogsignup: {
    backgroundColor: '#4cd964',
    alignSelf: 'center',
    borderRadius: 40,
    height: Metrics.HEIGHT * 0.07,
    width: Metrics.WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.HEIGHT * 0.03,
  },
  btnText: {
    fontFamily: 'SFUIDisplay-Medium',
    color: '#fed227',
    fontWeight: 'bold',
  },
  modelCenter: {
    borderRadius: 5,
    height: Metrics.HEIGHT * 0.48,
    width: Metrics.WIDTH * 0.95,
    backgroundColor: 'white',
    padding: 10,
  },
  close: {
    alignItems: 'flex-end',
  },
  txtsingIn: {
    fontSize: 25,
    fontFamily: Fonts.SFUIDisplayRegular,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  item: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    width: Metrics.WIDTH * 0.8,
    height: 40,
  },
  input: {
    fontFamily: 'SFUIDisplay-Regular',
    color: '#b7b7b7',
  },
  rememView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: Metrics.WIDTH * 0.8,
    alignSelf: 'center',
  },
  remem: {
    marginLeft: 5,
    fontSize: 15,
    fontFamily: 'SFUIDisplay-Regular',
  },
  forgot: {
    alignSelf: 'flex-end',
    fontSize: 15,
    justifyContent: 'flex-end',
    fontFamily: 'SFUIDisplay-Regular',
  },
  modelSignUp: {
    alignSelf: 'center',
    fontFamily: 'SFUIDisplay-Regular',
    color: 'white',
  },
});
export default styles;

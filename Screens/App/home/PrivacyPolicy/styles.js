import {Platform, StyleSheet, I18nManager} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes/';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: Metrics.HEIGHT * 0.1,
    backgroundColor: '#fff',
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
  backArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },

  body: {
    flex: 2,
    alignItems: 'center',
  },

  textTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(20),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    fontFamily: Fonts.type.helveticaNeueLight,
  },

  right: {
    flex: 1,
    alignItems: 'center',
  },

  bagIcon: {
    marginLeft: Metrics.WIDTH * 0.04,
    color: Colors.snow,
  },

  heartIcon: {
    color: Colors.snow,
    alignSelf: 'center',
  },
  txt: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#362f2d',
    fontWeight: 'bold',
    fontFamily: Fonts.type.helveticaRegular,
    fontSize: Fonts.moderateScale(15),
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingTop: Metrics.HEIGHT * 0.02,
    paddingBottom: Metrics.HEIGHT * 0.01,
  },
  qus: {
    fontWeight: 'bold',
    paddingTop: Metrics.HEIGHT * 0.01,
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.helveticaNeueLight,
    color: '#111111',
  },
  qus2: {
    paddingTop: Metrics.HEIGHT * 0.01,
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.helveticaNeueLight,
    color: '#111111',
  },
  arrowView: {
    width: Metrics.HEIGHT * 0.024,
    height: Metrics.HEIGHT * 0.024,
    backgroundColor: '#ffc700',
    borderRadius: Metrics.HEIGHT * 0.012,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: I18nManager.isRTL ? 0 : Metrics.HEIGHT * 0.003,
    marginRight: I18nManager.isRTL ? 0 : Metrics.HEIGHT * 0.022,
    paddingRight: I18nManager.isRTL ? Metrics.HEIGHT * 0.003 : 0,
    marginLeft: Metrics.WIDTH * 0.09,
    marginTop: Metrics.HEIGHT * 0.025,
  },

  firstQueView: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },

  searchViewBg: {
    backgroundColor: '#e9e9e9',
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchView: {
    backgroundColor: Colors.snow,
    borderRadius: 5,
    width: Metrics.WIDTH * 0.95,
    height: Metrics.HEIGHT * 0.06,
    alignItems: 'center',
    flexDirection: 'row',
  },

  searchInput: {
    color: '#6d6d71',
    fontSize: Fonts.moderateScale(15),
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
  buttonsView: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonlogin: {
    borderWidth: 2,
    borderColor: Colors.yellow,
   backgroundColor: Colors.yellow,
    alignSelf: 'center',
    height: Metrics.HEIGHT * 0.04,
    paddingLeft:15,
    paddingRight:15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsignup: {
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: Metrics.HEIGHT * 0.04,
    paddingLeft:15,
    paddingRight:15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  btnText: {
    fontWeight: 'bold',
    color: Colors.txtgrey,
    zIndex:100,
    fontSize:15,
    textAlignVertical:'center'
  },
  btnText2: {
    fontWeight: 'bold',
    color: Colors.black,
    zIndex:100,
    fontSize:15,
    textAlignVertical:'center'
  },
});

export default styles;

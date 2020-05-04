import {Platform, StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes/';

const styles = StyleSheet.create({
  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.transparent,
    flexDirection: 'column',
  },
  header: {
    zIndex: 1000,
    height: Metrics.HEIGHT * 0.07,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
    elevation: 0,
  },
  linearGradient: {
    borderRadius: 100,
    position: 'absolute',
    top: Metrics.HEIGHT * 0.022,
    width: Metrics.WIDTH * 0.9,
    height: Metrics.HEIGHT * 0.003,
  },
  slider: {
    zIndex: 1000,
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH * 0.9,
    alignSelf: 'center',
    marginBottom: Metrics.HEIGHT * 0.02,
    backgroundColor: 'transparent',
  },
  sliderTrack: {
    height: Metrics.HEIGHT * 0.003,
    backgroundColor: 'transparent',
  },
  distanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.WIDTH * 0.9,
    height: Metrics.HEIGHT * 0.05,
    marginTop: Metrics.HEIGHT * 0.03,
    marginBottom: Metrics.HEIGHT * 0.01,
    paddingRight: 10,
    paddingLeft: 10,
  },
  left: {
    flex: 0.25,
  },
  inputRecherche: {
    width: '100%',
  },
  body: {
    flex: 0.75,
    alignItems: 'center',
  },
  textTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(20),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    fontFamily: Fonts.type.helveticaNeueLight,
  },
  backArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    fontSize: 12,
    marginLeft: 15,
  },
  tabIcon: {
    height: Metrics.HEIGHT * 0.03,
    width: Metrics.HEIGHT * 0.03,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  activeButton: {width: '28%', justifyContent: 'center'},
  desactiveButton: {
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabText: {
    fontSize: Fonts.moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
  },

  normalTabText: {
    fontSize: Fonts.moderateScale(12),
    color: '#929292',
  },

  searchInput: {
    color: '#a0a0a0',
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    width: Metrics.WIDTH * 0.75,
    marginLeft: Metrics.WIDTH * 0.02,
    textAlignVertical: 'top',
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 5,
        paddingBottom: 0,
      },
    }),
  },

  searchIcon: {
    marginLeft: Metrics.WIDTH * 0.02,
  },

  cartImgBg: {
    width: Metrics.WIDTH * 0.15,
    marginBottom: Metrics.HEIGHT * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartImage: {
    width: Metrics.WIDTH * 0.075,
    height: Metrics.WIDTH * 0.075,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  searcgBarBg: {
    alignItems: 'center',
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.82,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginLeft: Metrics.WIDTH * 0.03,
    marginBottom: Metrics.HEIGHT * 0.01,
  },

  footerTabBg: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    height: Metrics.HEIGHT * 0.1,
    width: Metrics.WIDTH,
  },
});

export default styles;

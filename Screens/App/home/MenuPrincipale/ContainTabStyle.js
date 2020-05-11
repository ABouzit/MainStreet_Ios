import {Platform, StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes/';

const styles = StyleSheet.create({
  btnsec: {
    backgroundColor: 'transparent',
    height: Metrics.HEIGHT * 0.09,
    justifyContent: 'center',
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.85,
    alignSelf: 'center',
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
  dot2: {
    backgroundColor: 'rgb(212,216,224)',
    width: Metrics.WIDTH * 0.03,
    height: Metrics.WIDTH * 0.03,
    borderRadius: Metrics.WIDTH * 0.03,
    marginLeft: Metrics.WIDTH * 0.006,
    marginRight: Metrics.WIDTH * 0.006,
    ...Platform.select({
      ios: {
        marginBottom: Metrics.HEIGHT * 0.08,
      },
      android: {
        marginBottom: Metrics.HEIGHT * 0.06,
      },
    }),
  },
  carousel: {
    marginTop: 0,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
  carouselContainer: {
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.4,
      },
      android: {
        height: Metrics.HEIGHT * 0.43,
      },
    }),
    width: Metrics.WIDTH,
  },
  slide: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  slide2: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: Metrics.HEIGHT * 0.38,
    // flex: 1,
  },
  sliderImage: {
    backgroundColor: 'white',
    position: 'relative',
    resizeMode: 'contain',
    height: Metrics.HEIGHT * 0.4,
    width: Metrics.WIDTH * 0.9,
    alignSelf: 'flex-end',
  },
  screenBg: {
    flex: 1,
    backgroundColor: 'white',
  },

  headertext: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    backgroundColor: Colors.transparent,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: Fonts.moderateScale(30),
    width: Metrics.WIDTH * 0.85,
    color: Colors.black,
    fontWeight: 'bold',
    marginTop: Metrics.HEIGHT * 0.05,
  },

  desctext: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    backgroundColor: Colors.transparent,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: Fonts.moderateScale(12),
    width: Metrics.WIDTH * 0.7,
    color: 'rgb(212,216,224)',
    marginTop: Metrics.HEIGHT * 0.03,
  },

  steptext: {
    fontFamily: Fonts.type.sfuiDisplayMedium,
    backgroundColor: Colors.transparent,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: Fonts.moderateScale(15),
    width: Metrics.WIDTH * 0.7,
    color: Colors.snow,
    marginTop: Metrics.HEIGHT * 0.04,
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
  activeDot2: {
    backgroundColor: 'rgb(57,90,255)',
    width: Metrics.WIDTH * 0.03,
    height: Metrics.WIDTH * 0.03,
    borderRadius: Metrics.WIDTH * 0.05,
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
  nextBotton: {
    backgroundColor: 'white',
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
    borderWidth: 2,
    borderColor: 'rgb(255,213,0)',
  },
  addNewPhotoBotton: {
    backgroundColor: 'transparent',
    width: Metrics.WIDTH * 0.45,
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
  publishBotton: {
    backgroundColor: 'rgb(255,213,0)',
    width: Metrics.WIDTH * 0.25,
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
  nextText: {
    fontFamily: Fonts.type.sfuiDisplayMedium,
    fontSize: Fonts.moderateScale(15),
    color: 'rgb(255,213,0)',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  publishText: {
    fontFamily: Fonts.type.sfuiDisplayMedium,
    fontSize: Fonts.moderateScale(15),
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  skipText: {
    fontFamily: Fonts.type.sfuiDisplayMedium,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
    fontSize: Fonts.moderateScale(15),
    textAlign: 'right',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginBottom: 0,
  },
  containerMap: {
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.9,
      },
      android: {
        height: Metrics.HEIGHT * 0.96,
      },
    }),
  },
  map: {
    width: Metrics.WIDTH,
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.5,
      },
      android: {
        height: Metrics.HEIGHT * 0.53,
      },
    }),
  },
  containerNew: {
    alignItems: 'center',
    height: '100%',
    marginBottom: 20,
  },
  buttonImage: {
    borderRadius: 50,
    backgroundColor: 'rgb(254,213,0)',
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -25,
  },
  villeView: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  villeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  distanceView: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  distanceText2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(254,213,0)',
  },
  containTxt: {
    color: '#00bff3',
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    textAlign: 'center',
    marginTop: -Metrics.HEIGHT * 0.1,
  },
  txtBg: {
    // marginBottom: Metrics.HEIGHT * 0.01,
    marginHorizontal: Metrics.WIDTH * 0.01,
    borderRadius: Metrics.HEIGHT * 0.001,
    paddingVertical: Metrics.HEIGHT * 0.01,
    paddingHorizontal: Metrics.WIDTH * 0.02,
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  followTxtNotSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: 'rgb(57,90,255)',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  followBgNotSelected: {
    width: Metrics.WIDTH * 0.18,
    height: Metrics.HEIGHT * 0.04,
    borderRadius: Metrics.HEIGHT * 0.045,
    borderWidth: 2,
    borderColor: 'rgb(57,90,255)',
    marginLeft: Metrics.WIDTH * 0.03,
    justifyContent: 'center',
  },
  followBgSelected: {
    width: Metrics.HEIGHT * 0.04,
    height: Metrics.HEIGHT * 0.04,
    borderRadius: Metrics.HEIGHT * 0.045,
    backgroundColor: 'rgb(57,90,255)',
    marginLeft: Metrics.WIDTH * 0.03,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  followTxtSelected: {
    fontSize: Fonts.moderateScale(11),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: Colors.snow,
    alignSelf: 'center',
  },
  rowDesignationTxt: {
    color: '#b7b7b7',
    fontSize: Fonts.moderateScale(13),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left',
  },
  rowNameTxt2: {
    color: '#6f6f6f',
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    textAlign: 'left',
  },
  namePostView: {
    flexDirection: 'column',
    marginLeft: Metrics.WIDTH * 0.045,
    width: Metrics.WIDTH * 0.5,
    justifyContent: 'center',
  },
  profileImg2: {
    width: Metrics.WIDTH * 0.15,
    height: Metrics.WIDTH * 0.15,
    borderRadius: Metrics.WIDTH * 0.1,
    alignSelf: 'flex-start',
  },
  profileImg3: {
    width: Metrics.WIDTH * 0.15,
    height: Metrics.WIDTH * 0.15,
    borderRadius: Metrics.WIDTH * 0.1,
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    marginBottom: Metrics.HEIGHT * 0.015,
  },
  listMainView: {
    width: Metrics.WIDTH,
  },
  rowBg2: {
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    marginLeft: Metrics.WIDTH * 0.045,
    marginTop: Metrics.HEIGHT * 0.015,
  },
  markerStyle: {
    height: Metrics.HEIGHT * 0.035,
    width: Metrics.HEIGHT * 0.035,
    backgroundColor: '#f87362',
    borderWidth: 0.5,
    borderColor: '#fa6982',
  },
  trackStyle: {
    height: Metrics.HEIGHT * 0.005,
    borderRadius: 4,
  },
  sliderStyle: {
    backgroundColor: '#fff',
    height: Metrics.WIDTH * 0.008,
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
  rowBg: {
    width: Metrics.WIDTH * 0.95,
    alignSelf: 'center',
    backgroundColor: Colors.snow,
    marginBottom: Metrics.HEIGHT * 0.015,
    justifyContent: 'center',
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    marginTop: Metrics.HEIGHT * 0.045,
  },
  rowMainView: {
    width: Metrics.WIDTH,
    backgroundColor: 'white',
  },
  rowHeaderView: {
    flexDirection: 'row',
    marginTop: Metrics.HEIGHT * 0.015,
  },
  profileImg: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    alignSelf: 'flex-start',
    marginLeft: Metrics.WIDTH * 0.03,
  },
  rowNameTxt: {
    color: '#6f6f6f',
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium,
  },

  rowTimeTxt: {
    color: '#b7b7b7',
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left',
  },
  moreIcon: {
    marginTop: -Metrics.HEIGHT * 0.018,
    marginRight: Metrics.HEIGHT * 0.015,
  },
  dividerHorizontal: {
    width: Metrics.WIDTH * 0.85,
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: '#F2F2F2',
    alignSelf: 'center',
    marginTop: Metrics.HEIGHT * 0.02,
  },
  rowDescriptionView: {
    width: Metrics.WIDTH * 0.85,
    alignSelf: 'center',
    marginTop: 20,
  },
  rowDescTxt: {
    color: '#6f6f6f',
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginTop: Metrics.HEIGHT * 0.015,
    textAlign: 'left',
  },
  postDescImage: {
    width: Metrics.WIDTH * 0.95,
    height: Metrics.HEIGHT * 0.3,
    alignSelf: 'stretch',
    resizeMode: 'stretch',
  },
  likeCommentShareView: {
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.85,
    height: 40,
    flexDirection: 'row',
    paddingLeft: Metrics.WIDTH * 0.02,
    paddingRight: Metrics.WIDTH * 0.03,
    marginTop: Metrics.HEIGHT * 0.01,
    marginBottom: Metrics.HEIGHT * 0.01,
  },
  likeView: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  shareView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.WIDTH * 0.08,
  },
  likeCommentShareText: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(16),
    marginLeft: Metrics.WIDTH * 0.03,
    color: '#6f6f6f',
  },
  dividerVertical: {
    width: Metrics.WIDTH * 0.003,
    height: Metrics.HEIGHT * 0.04,
    backgroundColor: '#F2F2F2',
    alignSelf: 'flex-end',
  },
  likeCommentShareImage: {
    width: Metrics.WIDTH * 0.06,
    height: Metrics.HEIGHT * 0.03,
    resizeMode: 'contain',
  },
  rowHeaderNameView: {
    flexDirection: 'column',
    marginLeft: Metrics.WIDTH * 0.03,
  },
  distanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerStyle2: {
    alignSelf: 'center',
    height: 5,
  },
  header: {
    ...Platform.select({
      ios: {
        marginTop: Metrics.HEIGHT * -0.03,

        height: Metrics.HEIGHT * 0.1,
      },
      android: {
        marginTop: Metrics.HEIGHT * 0.03,

        height: Metrics.HEIGHT * 0.13,
      },
    }),
    zIndex: 1000,
    width: Metrics.WIDTH,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
    elevation: 0,
  },
  linearGradient: {
    borderRadius: 100,
    position: 'absolute',
    top: Metrics.HEIGHT * 0.011,
    width: Metrics.WIDTH * 0.9,
    height: Metrics.HEIGHT * 0.003,
  },
  slider: {
    zIndex: 1000,
    height: Metrics.HEIGHT * 0.03,
    width: Metrics.WIDTH * 0.9,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginBottom: Metrics.HEIGHT * 0.02,
  },
  sliderTrack: {
    height: Metrics.HEIGHT * 0.025,
  },
  left: {
    flex: 0.1,
  },
  inputRecherche: {
    width: '100%',
  },
  body: {
    flex: 0.9,
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

  selectedButton: {
    backgroundColor: 'rgb(57,90,255)',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: Metrics.HEIGHT * 0.005,
    },
    elevation: Fonts.moderateScale(8),
  },
  musicname: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.moderateScale(15),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  content: {
    width: Metrics.WIDTH,
    height: '100%',
    backgroundColor: 'transparent',
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.WIDTH * 0.05,
    height: Metrics.HEIGHT * 0.06,
    paddingRight: Metrics.WIDTH * 0.1,
  },
  listContent2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.WIDTH * 0.1,
    height: Metrics.HEIGHT * 0.15,
    paddingRight: Metrics.WIDTH * 0.1,
  },
  itememail: {
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.8,
    height: Metrics.HEIGHT * 0.08,
    marginBottom: Metrics.HEIGHT * 0.02,
  },
  itemAddress: {
    alignSelf: 'center',
    color: 'white',
    width: Metrics.WIDTH * 0.8,
    height: Metrics.HEIGHT * 0.02,
    marginVertical: Metrics.HEIGHT * 0.01,
    marginLeft: -Metrics.WIDTH * 0.1,
  },
  flatListStyle: {
    marginTop: Metrics.HEIGHT * 0,
    height: Metrics.HEIGHT * 0.1,
  },
  backtxt: {
    color: '#00bff3',
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    textAlign: 'center',
  },
});

export default styles;

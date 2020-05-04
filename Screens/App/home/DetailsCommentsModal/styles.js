import {StyleSheet} from 'react-native';

// Screen Styles
import {Fonts, Metrics, Colors} from './../../Themes/';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
  },

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent,
  },
  backArrow: {
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.001,
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  right: {
    flex: 0.5,
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: 'white',
    flexDirection: 'column',
  },

  rowBg: {
    width: Metrics.WIDTH,
    backgroundColor: '#ecedeb',
    flexDirection: 'column',
  },

  lastRowBg: {
    width: Metrics.WIDTH,
    backgroundColor: '#ecedeb',
    flexDirection: 'column',
  },

  ratingTextBg: {
    width: Metrics.WIDTH * 0.14,

    borderRadius: Metrics.WIDTH * 0.03,
    height: Metrics.WIDTH * 0.14,
    backgroundColor: '#0691ce',
    justifyContent: 'center',
  },
  ratingTextBg2: {
    width: Metrics.WIDTH * 0.2,

    borderRadius: Metrics.WIDTH * 0.03,
    height: Metrics.WIDTH * 0.2,
    backgroundColor: '#0691ce',
    justifyContent: 'center',
  },
  ratingText: {
    width: Metrics.WIDTH * 0.14,
    height: Metrics.WIDTH * 0.14,
    borderRadius: Metrics.WIDTH * 0.03,
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    alignSelf: 'center',
  },

  ratingText2: {
    width: Metrics.WIDTH * 0.2,
    height: Metrics.WIDTH * 0.2,
    borderRadius: Metrics.WIDTH * 0.03,
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    alignSelf: 'center',
  },
  rowNameTxt: {
    color: '#363636',
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(18),
    marginLeft: Metrics.WIDTH * 0.015,
  },

  rowDateTxt: {
    color: '#adadad',
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  dividerHorizontal: {
    width: Metrics.WIDTH * 0.95,
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: '#e6e6e6',
    marginTop: Metrics.HEIGHT * 0.022,
    marginBottom: Metrics.HEIGHT * 0.022,
    alignSelf: 'center',
  },

  rowPostText: {
    color: '#0691ce',
    marginLeft: Metrics.WIDTH * 0.06,
    marginRight: Metrics.WIDTH * 0.06,
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left',
  },

  rowDescTxt: {
    color: '#6f6f6f',
    marginLeft: Metrics.WIDTH * 0.06,
    marginRight: Metrics.WIDTH * 0.06,
    marginBottom: Metrics.HEIGHT * 0.022,
    marginTop: Metrics.HEIGHT * 0.018,
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left',
  },

  listMainView: {
    width: Metrics.WIDTH,
  },

  ratingBarView: {
    flexDirection: 'row',
    marginLeft: Metrics.WIDTH * 0.06,
    marginRight: Metrics.WIDTH * 0.06,
    marginTop: Metrics.HEIGHT * 0.022,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  ratingBarView2: {
    marginTop: Metrics.HEIGHT * 0.02,
    marginBottom: Metrics.HEIGHT * 0.02,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  ratingView: {
    flexDirection: 'column',
  },
  likeCommentShareView: {
    flexDirection: 'row',
    paddingLeft: Metrics.WIDTH * 0.02,
    paddingRight: Metrics.WIDTH * 0.03,
  },
  likeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.WIDTH * 0.08,
  },
  shareView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.WIDTH * 0.08,
  },
  commentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.WIDTH * 0.08,
  },
  ratingDateView: {
    flexDirection: 'row',
    marginLeft: Metrics.WIDTH * 0.06,
    justifyContent: 'flex-start',
    width: Metrics.WIDTH * 0.75,
    marginTop: Metrics.HEIGHT * 0.01,
  },
  ratingDateView2: {
    flexDirection: 'row',
    marginLeft: Metrics.WIDTH * 0,
    justifyContent: 'space-between',
    width: Metrics.WIDTH * 0.9,
    marginTop: Metrics.HEIGHT * 0.02,
  },
  ratingStar: {
    alignItems: 'center',
  },

  reviewerNameView: {
    flexDirection: 'row',
    marginLeft: Metrics.WIDTH * 0.045,
    height: Metrics.WIDTH * 0.14,
    alignItems: 'center',
  },
  reviewerNameView2: {
    flexDirection: 'row',
    marginLeft: Metrics.WIDTH * 0.045,
    height: Metrics.WIDTH * 0.2,
    width: Metrics.WIDTH * 0.7,
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: 'rgb(57,90,255)',
    width: Metrics.WIDTH * 0.018,
    height: Metrics.WIDTH * 0.018,
    borderRadius: Metrics.WIDTH * 0.009,
    marginLeft: Metrics.WIDTH * 0.004,
    marginRight: Metrics.WIDTH * 0.004,
    marginBottom: Metrics.HEIGHT * 0.06,
  },
  dot: {
    backgroundColor: 'rgb(212,216,224)',
    width: Metrics.WIDTH * 0.018,
    height: Metrics.WIDTH * 0.018,
    borderRadius: Metrics.WIDTH * 0.009,
    marginLeft: Metrics.WIDTH * 0.004,
    marginRight: Metrics.WIDTH * 0.004,

    marginBottom: Metrics.HEIGHT * 0.06,
  },
  by: {
    color: '#adadad',
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },
});

export default styles;

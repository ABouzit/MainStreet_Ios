import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors, Metrics} from './../../../Themes';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.41;
const sliderHeight2 = viewportHeight * 0.5;
const slideHeightRecherche = viewportHeight * 0.6;
const slideHeightFavorite = viewportHeight * 0.4;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 0;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    // needed for shadow
  },

  slideInnerContainerRecherche: {
    width: itemWidth,
    height: slideHeightRecherche,
    paddingHorizontal: itemHorizontalMargin,
    marginVertical: 30,
    // needed for shadow
  },
  slideInnerContainerRecherche2: {
    width: itemWidth,
    height: sliderHeight2,
    paddingHorizontal: itemHorizontalMargin,
    marginVertical: 30,
    // needed for shadow
  },
  slideInnerContainerFavorite: {
    width: itemWidth,
    height: slideHeightFavorite,
    paddingHorizontal: itemHorizontalMargin,
    marginVertical: 30,
    // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    height: slideHeight,
    width: sliderWidth,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerI: {
    height: Metrics.HEIGHT * 0.5,
    width: Metrics.WIDTH * 0.98,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageContainerMap: {
    height: Metrics.HEIGHT * 0.96,
    width: Metrics.WIDTH * 0.98,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageContainerRecherche: {
    height: slideHeightRecherche,
    width: sliderWidth,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerFavorite: {
    height: slideHeightFavorite,
    width: sliderWidth,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerPreference: {
    height: Metrics.HEIGHT * 0.45,
    width: Metrics.WIDTH * 0.9,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: Colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,

    resizeMode: 'cover',
    backgroundColor: 'white',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageI: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  viewDescVille: {
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.6,
  },
  description: {
    width: Metrics.WIDTH * 0.4,
    color: 'white',
  },
  ville: {fontSize: 16, fontWeight: 'bold', color: 'rgb(254,213,0)'},
  distance: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: Colors.black,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: itemWidth,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    paddingVertical: 15,

    height: Metrics.HEIGHT * 0.15,
  },
  textContainerRecherche: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: itemWidth,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    paddingVertical: 15,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    height: Metrics.HEIGHT * 0.15,
  },
  textContainerEven: {
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: Colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

import {Dimensions} from 'react-native';
const deviceScreen = Dimensions.get('window');

module.exports = {
  material: ratio => {
    var drawerShadow = ratio < 0.2 ? ratio * 5 * 5 : 5;
    return {
      drawer: {
        shadowRadius: drawerShadow,
      },
      main: {
        opacity: (2 - ratio) / 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
    };
  },
  rotate: ratio => {
    var r0 = -ratio / 8;
    var r1 = 1 - ratio / 2;
    var t = [r1, r0, 0, 0, -r0, r1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    return {
      main: {
        transformMatrix: t,
        left: ratio * 300,
      },
    };
  },
  parallax: ratio => {
    var r1 = 1;
    var t = [r1, 0, 0, 0, 0, r1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    return {
      main: {
        left: (deviceScreen.width * ratio) / 2,
        transformMatrix: t,
        opacity: 1 - ratio * 0.3,
        
      },
    };
  },
};

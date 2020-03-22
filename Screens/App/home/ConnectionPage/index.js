import React, {Component} from 'react';
import {
  TouchableHighlight,
  Modal,
  ImageBackground,
  Image,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
} from 'react-native';
import {Text, Form, Item, Input, Body, Header, Left, Right} from 'native-base';
// Screen Styles
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';

export default class ConnexionPage extends Component {
  state = {
    modalVisible: false,
    isChecked: false,
  };

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.navigate('Home');
      return true;
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    StatusBar.setBarStyle('light-content', true);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    let pic = {
      uri: require('./../../images/Bg2.png'),
    };

    let logo13 = {
      uri: require('./../../images/Logo2.png'),
    };
    return (
      <ImageBackground source={pic.uri} style={styles.screenBg}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate('Home')}>
              <FontAwesome
                name={I18nManager.isRTL ? 'angle-right' : 'angle-left'}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle} />
          </Body>
          <Right style={styles.right} />
        </Header>
        <View style={styles.container}>
          <Image source={logo13.uri} style={styles.logostyle} />
          <TouchableOpacity
            info
            style={styles.buttonlogin}
            onPress={() => alert('Sign Up')}>
            <Text autoCapitalize="words" style={styles.btnText}>
             CONNEXION
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

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
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
class ConnexionPage extends Component {
  state = {
    modalVisible: false,
    isChecked: false,
  };

  componentGracefulUnmount() {
    window.removeEventListener('beforeunload', this.componentGracefulUnmount);
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
    this.props.navigation.addListener('focus', () => {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          var starCountRef = firebase
            .database()
            .ref('/NEWDEV/users/' + user.uid);
          starCountRef.once('value', snapshot => {
            console.log('//' + JSON.stringify(snapshot));
            if (!snapshot.val().policyPrivacyAccepted) {
              this.props.navigation.navigate('Home');
            } else if (
              !snapshot.val().preferences ||
              snapshot.val().preferences == []
            ) {
              this.props.navigation.navigate('PreferencePage');
            } else {
              this.props.navigation.navigate('MenuPrincipale', {
                screen: 'ContainTabRecherche',
              });
            }
          });
        }
      });
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
          <Left style={styles.left} />
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
            onPress={() => this.props.navigation.navigate('LoginPage')}>
            <Text autoCapitalize="words" style={styles.btnText}>
              CONNEXION
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
export default ConnexionPage;

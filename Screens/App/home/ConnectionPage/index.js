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
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Text, Form, Item, Input, Body, Header, Left, Right} from 'native-base';
// Screen Styles
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import withGracefulUnmount from 'react-graceful-unmount';
import {Metrics} from './../../Themes';
class ConnexionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isChecked: false,
      uploading: false,
    };
  }

  componentGracefulUnmount() {
    // if (window && window.removeEventListener) {
    //   window.removeEventListener('beforeunload', this.componentGracefulUnmount);
    // }
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
    this.props.navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content', true);

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent', true);
        StatusBar.setTranslucent(true);
      }
      let user = firebase.auth().currentUser;
      console.log(user + 'asd');
      if (user) {
        this.setState({uploading: true});

        firebase
          .database()
          .ref('/NEWDEV/users/' + user.uid)
          .once('value', snapshot => {
            if (!snapshot.val().policyPrivacyAccepted) {
              AsyncStorage.setItem(
                'authentifiedUser',
                JSON.stringify({
                  uid: user.uid,
                  pseudo: snapshot.val().pseudo,
                  prenom: snapshot.val().prenom,
                  preferences: [],
                  policyPrivacyAccepted: false,
                  photoUrl: '',
                  nom: snapshot.val().nom,
                  email: snapshot.val().email,
                }),
              ).then(() =>
                this.setState(
                  {
                    uploading: false,
                    submit: false,
                  },
                  () => {
                    this.props.navigation.navigate('Home');
                    this.componentGracefulUnmount();
                  },
                ),
              );
            } else if (
              !snapshot.val().preferences ||
              snapshot.val().preferences == []
            ) {
              AsyncStorage.setItem(
                'authentifiedUser',
                JSON.stringify({
                  uid: user.uid,
                  pseudo: snapshot.val().pseudo,
                  prenom: snapshot.val().prenom,
                  preferences: [],
                  policyPrivacyAccepted: snapshot.val().policyPrivacyAccepted,
                  photoUrl: snapshot.val()?.photoUrl,
                  nom: snapshot.val().nom,
                  email: snapshot.val().email,
                }),
              ).then(() =>
                this.setState(
                  {
                    uploading: false,
                    submit: false,
                  },
                  () => {
                    this.props.navigation.navigate('PreferencePage');
                    this.componentGracefulUnmount();
                  },
                ),
              );
            } else {
              AsyncStorage.setItem(
                'authentifiedUser',
                JSON.stringify({
                  uid: user.uid,
                  pseudo: snapshot.val().pseudo,
                  prenom: snapshot.val().prenom,
                  preferences: snapshot.val().preferences,
                  policyPrivacyAccepted: snapshot.val().policyPrivacyAccepted,
                  photoUrl: snapshot.val()?.photoUrl,
                  nom: snapshot.val().nom,
                  email: snapshot.val().email,
                }),
              ).then(() =>
                this.setState(
                  {
                    uploading: false,
                    submit: false,
                  },
                  () => {
                    this.props.navigation.navigate('MenuPrincipale', {
                      screen: 'ContainTabRecherche',
                    });
                    this.componentGracefulUnmount();
                  },
                ),
              );
            }
          })
          .catch(error => {
            console.log(error + 'hana hna awld l9hba');
          });
        // else {
        //   console.log('hana wslt lhna');
        //   this.setState({
        //     uploading: false,
        //     submit: false,
        //   });
        // }
      } else {
        console.log('hana wslt lhna');
        this.setState({
          uploading: false,
          submit: false,
        });
      }
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
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
        {this.state.uploading ? (
          <View
            style={{
              height: Metrics.HEIGHT * 1.05,
              width: Metrics.WIDTH,
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              elevation: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              animating={true}
              color="#fff"
              size="large"
              style={{
                activityIndicator: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 80,
                },
              }}
            />
          </View>
        ) : (
          <View />
        )}
      </ImageBackground>
    );
  }
}
export default ConnexionPage;

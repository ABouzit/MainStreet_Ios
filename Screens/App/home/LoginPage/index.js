import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  BackHandler,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import withGracefulUnmount from 'react-graceful-unmount';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {Container, Right, Item, Input, Header, Left, Body} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {validate} from 'validate.js';
import {Metrics} from './../../Themes';
import AsyncStorage from '@react-native-community/async-storage';
// Screen Styles
import styles from './styles';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordNotVisible: true,
      email: '',
      password: '',
      submit: false,
      uploading: false,
    };
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
  }

  onClick(data) {
    data.checked = !data.checked;
    data.checked ? 'you checked ' : 'you unchecked ';
  }
  componentGracefulUnmount() {
    // if (window) {
    //   window.removeEventListener('beforeunload', this.componentGracefulUnmount);
    // }
  }
  login() {
    this.setState({uploading: true}, () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          console.log(res);
          let user = firebase.auth().currentUser;
          console.log(user);
          var starCountRef = firebase
            .database()
            .ref('/NEWDEV/users/' + user.uid);
          starCountRef.once('value', snapshot => {
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
                    password: '',
                    email: '',
                  },
                  () => {
                    this.props.navigation.navigate('Home'),
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
                    password: '',
                    email: '',
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
                    password: '',
                    email: '',
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
          });
        })
        .catch(error => {
          console.log(error.Error);
          this.setState({uploading: false});
          if (error.code === 'auth/user-not-found') {
            alert("Cet utilisateur n'existe pas, essayer avec un email");
          }

          if (error.code === 'auth/wrong-password') {
            alert('Mot de passe erroné');
          }
        });
    });
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    const imageUri =
      'https://antiqueruby.aliansoftware.net/Images/signin/image_bg_signin_eight.jpg';
    let logo13 = {
      uri:
        'https://antiqueruby.aliansoftware.net/Images/signin/ic_logo_mountifysthirteen.png',
    };
    const validation = validate(
      {
        nom: this.state.nom,
        email: this.state.email,
        prenom: this.state.prenom,
        pseudo: this.state.pseudo,
        password: this.state.password,
      },
      constraint,
    );
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={styles.left} />
          <Body style={styles.body}>
            <Text style={styles.textTitle} />
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity
              info
              onPress={() => this.props.navigation.replace('SignupPage')}>
              <Text style={styles.textTitle}>Sign up</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <View>
          <View style={styles.inputFieldSec}>
            <Item
              underline
              style={styles.itememail}
              error={
                validation && this.state.submit && validation.email
                  ? true
                  : false
              }>
              <Input
                placeholderTextColor="#000"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                placeholder="Email"
                keyboardType="email-address"
                style={styles.inputemail}
                value={this.state.email}
                onChange={value => {
                  this.setState({
                    email: value.nativeEvent.text,
                  });
                }}
              />
              {validation && this.state.submit && validation.email ? (
                <TouchableOpacity
                  info
                  style={styles.btnMdpVisible}
                  onPress={() => {
                    alert(validation.email[0]);
                  }}>
                  <FontAwesome5
                    name="info-circle"
                    type="FontAwesome"
                    size={25}
                    color="#d9534f"
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </Item>
            <View>
              <Item
                underline
                style={styles.itempassword}
                error={
                  validation && this.state.submit && validation.password
                    ? true
                    : false
                }>
                <Input
                  placeholderTextColor="#000"
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  placeholder="Password"
                  secureTextEntry={this.state.passwordNotVisible}
                  style={styles.inputpassword}
                  value={this.state.password}
                  onChange={value => {
                    this.setState({
                      password: value.nativeEvent.text,
                    });
                  }}
                />
                {validation && this.state.submit && validation.password ? (
                  <TouchableOpacity
                    info
                    style={styles.btnMdpVisible}
                    onPress={() => {
                      alert(validation.password[0]);
                    }}>
                    <FontAwesome5
                      name="info-circle"
                      type="FontAwesome"
                      size={25}
                      color="#d9534f"
                      style={styles.arrow}
                    />
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </Item>
              <TouchableOpacity
                info
                style={
                  validation && this.state.submit && validation.password
                    ? styles.btnMdpVisible2
                    : styles.btnMdpVisible
                }
                onPress={() => {
                  if (this.state.passwordNotVisible === true) {
                    this.setState({passwordNotVisible: false});
                  } else {
                    this.setState({passwordNotVisible: true});
                  }
                }}>
                <FontAwesome5
                  name={this.state.passwordNotVisible ? 'eye' : 'eye-slash'}
                  type="FontAwesome"
                  size={25}
                  color="black"
                  style={styles.arrow}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.signInSec}>
          <TouchableOpacity
            info
            style={styles.buttondialogsignup}
            onPress={() => {
              this.setState({submit: true});
              if (!validation) {
                this.login();
              }
            }}>
            <Text autoCapitalize="words" style={styles.buttonsignin}>
              LOG IN
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
      </Container>
    );
  }
}
const constraint = {
  email: {
    presence: {
      allowEmpty: false,
      message: '^Veuillez entrer votre Email',
    },
    email: {
      message:
        '^Votre email doit correspande au format standard exp: "exp@exp.exp"',
    },
    length: {
      maximum: 50,
      message: '^Votre email ne doit pas dépasser 50 caractères',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Veuillez entrer votre Mot de passe',
    },
    length: {
      minimum: 6,
      message: '^Votre Mot de passe doit contenire plus de 6 caractèrese',
    },
    format: {
      pattern: '^(?=.*?[0-9])[a-zA-Z0-9]+',
      message: '^Votre Mot de passe doit contenir au moins un nombre"',
    },
  },
};
export default LoginPage;

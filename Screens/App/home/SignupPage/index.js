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
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import {Metrics} from '../../Themes';
import {Container, Right, Item, Input, Header, Left, Body} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {validate} from 'validate.js';
import AsyncStorage from '@react-native-community/async-storage';
// Screen Styles
import styles from './styles';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordNotVisible: false,
      nom: '',
      prenom: '',
      email: '',
      pseudo: '',
      password: '',
      uid: '',
      submit: false,
      uploading: false,
    };
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.navigate('Home');
      return true;
    });
  }

  onClick(data) {
    data.checked = !data.checked;
    data.checked ? 'you checked ' : 'you unchecked ';
  }
  ///fonctionnalitee page
  createUser() {
    this.setState({uploading: true}, () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          console.log('test' + JSON.stringify(res));
          let us = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            pseudo: this.state.pseudo,
            email: this.state.email,
            password: this.state.password,
            uid: res.user.uid,
            photoUrl: '',
            preferences: [],
          };

          //Create user
          firebase
            .database()
            .ref('NEWDEV/users/' + us.uid)
            .set({
              nom: us.nom,
              prenom: us.prenom,
              pseudo: us.pseudo,
              email: us.email,
              password: us.password,
              policyPrivacyAccepted: false,
              photoUrl: '',
              preferences: [],
            })
            .then(res => {
              AsyncStorage.setItem(
                'authentifiedUser',
                JSON.stringify({
                  uid: us.uid,
                  nom: us.nom,
                  prenom: us.prenom,
                  pseudo: us.pseudo,
                  email: us.email,
                  password: us.password,
                  policyPrivacyAccepted: false,
                  photoUrl: '',
                  preferences: [],
                }),
              ).then(resss => {
                console.log('ress' + JSON.stringify(resss));
                this.setState(
                  {
                    uploading: false,
                    nom: '',
                    prenom: '',
                    pseudo: '',
                    email: '',
                    password: '',
                    policyPrivacyAccepted: false,
                    photoUrl: '',
                    preferences: [],
                  },
                  () => {
                    this.props.navigation.navigate('Home');
                  },
                );
              });
            })
            .catch(error => console.log(error));
          //   );
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
        });
    });
  }
  render() {
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
    return (
      <Container>
        <Header androidStatusBarColor={'#000'} style={styles.header}>
          <Left style={styles.left} />
          <Body style={styles.body}>
            <Text style={styles.textTitle} />
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity
              info
              onPress={() => this.props.navigation.navigate('LoginPage')}>
              <Text style={styles.textTitle}>Log in</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <View>
          <View style={styles.inputFieldSec}>
            <View style={styles.nomPrenom}>
              <Item
                underline
                style={styles.itemeNom}
                error={
                  validation && this.state.submit && validation.nom
                    ? true
                    : false
                }>
                <Input
                  placeholderTextColor="#000"
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  placeholder="Nom"
                  keyboardType="default"
                  style={styles.inputemail}
                  value={this.state.nom}
                  onChange={value => {
                    this.setState({
                      nom: value.nativeEvent.text,
                    });
                  }}
                />
                {validation && this.state.submit && validation.nom ? (
                  <TouchableOpacity
                    info
                    style={styles.btnMdpVisible}
                    onPress={() => {
                      alert(validation.nom[0]);
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
              <Item
                underline
                style={styles.itemePrenom}
                error={
                  validation && this.state.submit && validation.prenom
                    ? true
                    : false
                }>
                <Input
                  placeholderTextColor="#000"
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  placeholder="Prenom"
                  keyboardType="default"
                  style={styles.inputemail}
                  value={this.state.prenom}
                  onChange={value => {
                    this.setState({
                      prenom: value.nativeEvent.text,
                    });
                  }}
                />
                {validation && this.state.submit && validation.prenom ? (
                  <TouchableOpacity
                    info
                    style={styles.btnMdpVisible}
                    onPress={() => {
                      alert(validation.prenom[0]);
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
            </View>
            <View>
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
            </View>
            <View>
              <Item
                underline
                style={styles.itememail}
                error={
                  validation && this.state.submit && validation.pseudo
                    ? true
                    : false
                }>
                <Input
                  placeholderTextColor="#000"
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  placeholder="Pseudo"
                  keyboardType="default"
                  style={styles.inputemail}
                  value={this.state.pseudo}
                  onChange={value => {
                    this.setState({
                      pseudo: value.nativeEvent.text,
                    });
                  }}
                />
              </Item>
              {validation && this.state.submit && validation.pseudo ? (
                <TouchableOpacity
                  info
                  style={styles.btnMdpVisible}
                  onPress={() => {
                    alert(validation.pseudo[0]);
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
            </View>
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
              </Item>
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
                this.createUser();
              }
            }}>
            <Text autoCapitalize="words" style={styles.buttonsignin}>
              SIGN UP
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
  nom: {
    presence: {
      allowEmpty: false,
      message: '^Veuillez entrer votre Nom',
    },
    format: {
      pattern: '[A-Za-z]+',
      message: '^Le champ Nom doit contenire que des lettres',
    },
    length: {
      maximum: 20,
      message: '^Le champ Nom ne doit pas dépasser 20 caractères',
    },
  },
  prenom: {
    presence: {
      allowEmpty: false,
      message: '^Veuillez entrer votre Prenom',
    },
    format: {
      pattern: '[A-Za-z]+',
      message: '^Le champ Prenom doit contenire que des lettres',
    },
    length: {
      maximum: 20,
      message: '^Le champ Prenom ne doit pas dépasser 20 caractèrese',
    },
  },
  pseudo: {
    presence: {
      allowEmpty: false,
      message: '^Veuillez entrer votre Pseudo',
    },
    length: {
      maximum: 20,
      minimum: 5,
      message: '^Votre Pseudo doit avoir entre 5 et 20 caractèrese',
    },
    format: {
      pattern: '^[a-zA-Z]+[a-z0-9]{0,4}$',
      message:
        '^Votre Pseudo doit correspande au format standard exp: "Pseudo30',
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
export default SignupPage;

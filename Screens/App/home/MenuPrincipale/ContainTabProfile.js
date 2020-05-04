import React, {Component} from 'react';
import {
  TouchableHighlight,
  ImageBackground,
  Image,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  ListView,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Text,
  Form,
  Item,
  Input,
  Body,
  Header,
  Left,
  Right,
  Container,
  Content,
  DatePicker,
  Icon,
  Switch,
} from 'native-base';
import {validate} from 'validate.js';
// Screen Styles
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import MyControlPanel from './../Components/Drawer/ControlPanel';
import Drawer from 'react-native-drawer';
import SwitchToggle from 'react-native-switch-toggle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ApplicationStyles, Metrics, Fonts} from '../../Themes';
import MaterialTabs from 'react-native-material-tabs';
import styles from './ContainTabProfilStyle';
import {CommonActions} from '@react-navigation/native';
import tweens from './../Components/Drawer/tweens';
import stylesDrawer from './../Components/Drawer/styles';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';
import {
  subscriber,
  subscriberRedirect,
  messageService,
  subscriberDrawerProfil,
} from './../../services/messageService';
const activeindicator = 0;
const profileImg =
  'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
};
class ContainTabProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: true,
      submit: false,
      imageHeight: '',
      imageData: '',
      imageWidth: '',
      imagePath: '',
      index: '',
      user: {},
      validationPref: true,
      activeindicator: 0,
      modalVisible: false,
      isChecked: false,
      isLoading: true,
      selectedTab: 0,
      passwordNotVisible: true,
      oldPasswordNotVisible: true,
      pseudoValue: '',
      nomValue: '',
      prenomValue: '',
      EmailValue: '',
      PasswordValue: '',
      oldPasswordValue: '',
      drawerType: 'overlay',
      openDrawerOffset: 50,
      closedDrawerOffset: 0,
      panOpenMask: 0.1,
      relativeDrag: false,
      panThreshold: 0.25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: true,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: 'right',
      open: false,
      backgroundColor: 'transparent',
      isVisible: false,
      spots: [],
      preferences: [
        {
          nom: 'BMX',
          selected: false,
        },
        {
          nom: 'SKATEBOARD',
          selected: false,
        },
        {
          nom: 'ROLLER',
          selected: false,
        },
        {
          nom: 'SCOOTERS',
          selected: false,
        },
        {
          nom: 'AUTRE',
          selected: false,
        },
      ],
      validation: [],
      tabValidation: [],
      numberLikes: 0,
      options: {
        title: 'Choisir Votre photo de profil.',
        noData: true,
        takePhotoButtonTitle: 'Prendre une Photo.',
        chooseFromLibraryButtonTitle: 'Choisir depuis la gallery.',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },

        maxWidth: 720,
        quality: 0.8,
      },
      profil: {
        pseudo: 'AlexIV',
        nbrFolowers: 0,
        nbrFolowing: 0,
        likes: 0,
        spots: [
          {
            id: 1,
            pic:
              'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg',
          },
          {
            id: 2,
            pic:
              'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg',
          },
          {
            id: 3,
            pic:
              'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg',
          },
        ],
      },
    };
    this.props.navigation.addListener('focus', () => {
      if (this.drawer) {
        this.drawer.close();
      }
      subscriber.next(true);
      this.getUserWithSpots();
    });
  }
  // functionValidation() {
  //   let object = {};
  //   return Promise.all(
  //     this.state.tabValidation.map((objectAttribut, index) => {
  //       if (objectAttribut == 'preferences') {
  //         this.preferencesFromObjToTab().then(
  //           res => (object[objectAttribut] = res),
  //         );
  //       } else {
  //         object[objectAttribut] = this.state[objectAttribut];
  //       }
  //     }),
  //   ).then(() => {
  //     return validate(object, constraint);
  //   });
  // }
  updateUser() {
    const validationEmail = validate(
      {EmailValue: this.state.EmailValue},
      constraintEmail,
    );
    const validationNom = validate(
      {nomValue: this.state.nomValue},
      constraintNom,
    );
    const validationPrenom = validate(
      {prenomValue: this.state.prenomValue},
      constraintPrenom,
    );
    const validationPseudo = validate(
      {pseudoValue: this.state.pseudoValue},
      constraintPseudo,
    );
    const validationNewPwd = validate(
      {PasswordValue: this.state.PasswordValue},
      constraintNewPwd,
    );
    const validationOldPwd = validate(
      {oldPasswordValue: this.state.oldPasswordValue},
      constraintOldPwd,
    );

    if (
      !(
        (this.state.tabValidation.indexOf('PasswordValue') === -1 &&
          this.state.tabValidation.indexOf('oldPasswordValue') === -1) ||
        (this.state.tabValidation.indexOf('PasswordValue') !== -1 &&
          this.state.tabValidation.indexOf('oldPasswordValue') !== -1)
      )
    ) {
      console.log('ASKJN');
      alert("rempliser l'ancient mot de passe et aussi le nouveau");
    }
    if (
      !validationEmail &&
      !validationNom &&
      !validationPrenom &&
      !validationPseudo &&
      this.state.validationPref &&
      ((this.state.tabValidation.indexOf('PasswordValue') === -1 &&
        this.state.tabValidation.indexOf('oldPasswordValue') === -1) ||
        (this.state.tabValidation.indexOf('PasswordValue') !== -1 &&
          this.state.tabValidation.indexOf('oldPasswordValue') !== -1 &&
          !validationOldPwd &&
          !validationNewPwd))
    ) {
      this.setState({uploading: true}, () => subscriber.next(true));
      this.updatePasswordAuth().then(() => {
        this.updateImageProfil().then(() => {
          this.updateInfoPerso().then(() => {
            this.updatePreference().then(() => {
              firebase
                .database()
                .ref('NEWDEV/users/' + this.state.user.uid)
                .once('value', snapshot => {
                  console.log(snapshot);
                  AsyncStorage.setItem(
                    'authentifiedUser',
                    JSON.stringify({
                      uid: this.state.user.uid,
                      nom: snapshot.val().nom,
                      prenom: snapshot.val().prenom,
                      pseudo: snapshot.val().pseudo,
                      email: snapshot.val().email,
                      password: snapshot.val().password,
                      policyPrivacyAccepted: snapshot.val()
                        .policyPrivacyAccepted,
                      photoUrl: snapshot.val().photoUrl,
                      preferences: snapshot.val().preferences,
                    }),
                  ).then(() => {
                    this.getUserWithSpots();
                  });
                });
            });
          });
        });
      });
    }
  }
  drawerClose() {
    this.drawer.close();
    this.setState(
      {
        pseudoValue: this.state.user.pseudo,
        nomValue: this.state.user.nom,
        prenomValue: this.state.user.prenom,
        EmailValue: this.state.user.email,
        PasswordValue: '',
        oldPasswordValue: '',
        passwordNotVisible: true,
        oldPasswordNotVisible: true,
        user: this.state.user,
        imagePath: '',
        tabValidation: [],
      },
      () => {
        this.preferencesFromTabToObj().then(() => {
          console.log(this.state.preferences);
          this.forceUpdate();
        });
      },
    );
  }
  preferencesFromObjToTab() {
    let tab = [];
    return Promise.all(
      this.state.preferences.map((sport, index) => {
        if (sport.selected) {
          tab.push(sport.nom);
        }
      }),
    ).then(() => {
      console.log(tab);
      return Promise.resolve(tab);
    });
  }
  preferencesFromTabToObj() {
    let tab = [false, false, false, false, false];
    console.log(this.state.user.preferences);
    return Promise.all(
      this.state.user.preferences.map((sport, index) => {
        if (sport === 'BMX') {
          tab[0] = true;
        } else if (sport === 'SKATEBOARD') {
          tab[1] = true;
        } else if (sport === 'ROLLER') {
          tab[2] = true;
        } else if (sport === 'SCOOTERS') {
          tab[3] = true;
        } else if (sport === 'AUTRE') {
          tab[4] = true;
        }
      }),
    ).then(() => {
      return Promise.all(
        tab.map((sport, index) => {
          this.state.preferences[index].selected = sport;
        }),
      ).then(() => {
        return Promise.resolve(true);
      });
    });
  }

  PrendrePhoto(type) {
    if (type == 'galery') {
      ImagePicker.showImagePicker(this.state.options, response => {
        if (!response.didCancel) {
          this.setState({
            imagePath: response.uri,
            imageHeight: response.height,
            imageWidth: response.width,
            imageData: response.data,
          });
          if (this.state.tabValidation.indexOf('imagePath') === -1) {
            this.state.tabValidation.push('imagePath');
          }
        }
      });
    }
  }
  getUserWithSpots() {
    console.log('///dkhl Pref');
    AsyncStorage.getItem('authentifiedUser').then(user => {
      if (user) {
        console.log('getUser()');
        console.log('getfin');
        console.log('user' + JSON.stringify(user));
        this.setState(
          {
            pseudoValue: JSON.parse(user).pseudo,
            nomValue: JSON.parse(user).nom,
            prenomValue: JSON.parse(user).prenom,
            EmailValue: JSON.parse(user).email,
            user: JSON.parse(user),
            PasswordValue: '',
            oldPasswordValue: '',
            passwordNotVisible: true,
            oldPasswordNotVisible: true,
            tabValidation: [],
            imagePath: '',
            numberLikes: 0,
          },
          () => {
            firebase
              .database()
              .ref('/NEWDEV/spots/')
              .orderByChild('uid')
              .equalTo(this.state.user.uid)
              .once('value', snapshot => {
                this.setState({spots: Object.entries(snapshot.val())}, () =>
                  console.log(this.state.spots),
                );
              })
              .then(() => {
                this.preferencesFromTabToObj().then(() => {
                  console.log(this.state.preferences);
                  this.setState({uploading: false}, () => {
                    subscriber.next(false);
                    let num = 0;
                    Promise.all(
                      this.state.spots.map((spot, index) => {
                        if (spot[1].likesNumbers) {
                          num = num + spot[1].likesNumbers;
                        }
                      }),
                    ).then(() =>
                      this.setState(
                        {
                          numberLikes: num,
                        },
                        () => console.log(this.state.numberLikes + 'hana'),
                      ),
                    );
                  });
                });
              });
          },
        );
      }
    });
  }
  updatePreference() {
    if (this.state.tabValidation.indexOf('preferences') !== -1) {
      return this.preferencesFromObjToTab().then(tab => {
        if (tab.length != 0 && tab != this.state.user.preferences) {
          return firebase
            .database()
            .ref('NEWDEV/users/' + this.state.user.uid)
            .update({preferences: tab})
            .then(() => {
              return Promise.resolve();
            });
        } else {
          console.log('tab=user preferences');
          return Promise.resolve();
        }
      });
    } else {
      console.log('preference passe');
      return Promise.resolve();
    }
  }
  updateInfoPerso() {
    let object = {};

    if (this.state.tabValidation.indexOf('pseudoValue') != -1) {
      object.pseudo = this.state.pseudoValue;
    }
    if (this.state.tabValidation.indexOf('prenomValue') != -1) {
      object.prenom = this.state.prenomValue;
    }
    if (this.state.tabValidation.indexOf('nomValue') != -1) {
      object.nom = this.state.nomValue;
    }
    if (
      this.state.tabValidation.indexOf('pseudoValue') != -1 ||
      this.state.tabValidation.indexOf('prenomValue') != -1 ||
      this.state.tabValidation.indexOf('nomValue') != -1
    ) {
      return firebase
        .database()
        .ref('NEWDEV/users/' + this.state.user.uid)
        .update(object)
        .then(() => {
          return Promise.resolve();
        });
    } else {
      console.log('Info passe');
      return Promise.resolve();
    }
  }
  updateImageProfil() {
    if (this.state.tabValidation.indexOf('imagePath') !== -1) {
      const ext = this.state.imagePath.split('.').pop(); // Extract image extension
      // const filename = `${uuidv5()}.${ext}`; // Generate unique name
      return firebase
        .storage()
        .ref('gallery/imgProfil/imgProfil_' + uuidv4() + '.' + ext)
        .putFile(this.state.imagePath)
        .then(
          snapshot => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              return firebase
                .storage()
                .ref(snapshot.metadata.fullPath)
                .getDownloadURL()
                .then(res =>
                  firebase
                    .database()
                    .ref('NEWDEV/users/' + this.state.user.uid)
                    .update({
                      photoUrl: res,
                    })
                    .then(() => {
                      return Promise.resolve();
                    }),
                );
            }
          },
          error => {
            alert('Sorry, Try again.' + error);
          },
        );
    } else {
      console.log('Photo passe');
      return Promise.resolve();
    }
  }
  functionAlertPreference(index) {
    let valide = false;
    this.state.preferences[index].selected = !this.state.preferences[index]
      .selected;
    Promise.all(
      this.state.preferences.map((sport, index) => {
        if (sport.selected === true) {
          valide = true;
        }
      }),
    ).then(() => {
      if (valide === true) {
        this.setState({validationPref: true}, () => this.forceUpdate());
        console.log(true);
      } else {
        this.setState({validationPref: false}, () => {
          this.forceUpdate();
          alert('Vos preferences doivent au moins contenir un sport!');
        });
        console.log(false);
      }
    });
  }
  updatePasswordAuth() {
    if (
      this.state.tabValidation.indexOf('PasswordValue') !== -1 &&
      this.state.tabValidation.indexOf('oldPasswordValue') !== -1
    ) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(
          this.state.user.email,
          this.state.oldPasswordValue,
        )
        .then(res => {
          return firebase
            .auth()
            .currentUser.updatePassword(this.state.PasswordValue)
            .then(() => {
              firebase
                .database()
                .ref('NEWDEV/users/' + this.state.user.uid)
                .update({
                  password: this.state.PasswordValue,
                })
                .then(() => {
                  return Promise.resolve();
                });
            });
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            alert('Ancient Mot de passe erroné');
          }
        });
    } else {
      console.log('PWD PASS');
      return Promise.resolve();
    }
    // if(this.state.oldPasswordValue==user.password)
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
  }
  componentDidMount() {}
  setDrawerType(type) {
    this.setState({
      drawerType: type,
    });
  }
  onSwipeLeft(gestureState) {
    this.openDrawer();
  }

  onSwipeRight(gestureState) {
    this.drawerClose();
  }
  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) {
      return {};
    }
    return tweens[this.state.tweenHandlerPreset](ratio);
  }

  noopChange() {
    this.setState({
      changeVal: Math.random(),
    });
  }

  openDrawer() {
    this.drawer.open();
  }

  setStateFrag(frag) {
    this.setState(frag);
  }
  // validationConstraint() {
  //   let cont = {};
  //   return Promise.all(
  //     this.state.tabValidation.map((c, index) => {
  //       if (c != 'imagePath' && c != 'preferences') {
  //         cont[c] = constraint[c];
  //       }
  //     }),
  //   ).then(() => {
  //     return this.functionValidation().then(res => {
  //       return Promise.resolve(validate(res, cont));
  //     });
  //   });
  // }
  render() {
    const validationEmail = validate(
      {EmailValue: this.state.EmailValue},
      constraintEmail,
    );
    const validationNom = validate(
      {nomValue: this.state.nomValue},
      constraintNom,
    );
    const validationPrenom = validate(
      {prenomValue: this.state.prenomValue},
      constraintPrenom,
    );
    const validationPseudo = validate(
      {pseudoValue: this.state.pseudoValue},
      constraintPseudo,
    );
    const validationNewPwd = validate(
      {PasswordValue: this.state.PasswordValue},
      constraintNewPwd,
    );
    const validationOldPwd = validate(
      {oldPasswordValue: this.state.oldPasswordValue},
      constraintOldPwd,
    );
    console.log(this.state.tabValidation);
    console.log(validationPseudo);
    StatusBar.setBarStyle('dark-content', true);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    let pic = {
      uri: require('./../../images/BackGround-Profil.png'),
    };

    let logo13 = {
      uri: require('./../../images/Logo1.png'),
    };
    const {selectedTab} = this.state;
    var controlPanel = (
      <MyControlPanel
        closeDrawer={() => {
          this.drawer.close();
        }}
      />
    );
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        onSwipeLeft={state => this.onSwipeLeft(state)}
        onSwipeRight={state => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
        }}>
        <Drawer
          ref={c => (this.drawer = c)}
          type={this.state.drawerType}
          animation={this.state.animation}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag={this.state.relativeDrag}
          panThreshold={this.state.panThreshold}
          content={
            <View
              style={{
                backgroundColor: 'white',
                height: Metrics.HEIGHT,
                width: Metrics.WIDTH,
                marginLeft: Metrics.WIDTH * 0.05,
                elevation: 10,
              }}>
              <Content style={{width: Metrics.WIDTH * 0.85}}>
                <View style={styles.proimg}>
                  {this.state.imagePath !== '' ? (
                    <TouchableOpacity
                      style={styles.cameraCancel}
                      onPress={() => this.setState({imagePath: ''})}>
                      <FontAwesome5
                        name="times"
                        size={20}
                        color="red"
                        style={{
                          backgroundColor: 'transparent',
                          justifyContent: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
                  <Image
                    style={styles.profileImgs}
                    source={
                      this.state.imagePath != ''
                        ? {uri: this.state.imagePath}
                        : this.state.user.photoUrl
                        ? {uri: this.state.user.photoUrl}
                        : require('./../../images/defautProfil.jpg')
                    }
                  />
                  <TouchableOpacity
                    style={styles.cameraIcon}
                    onPress={() => this.PrendrePhoto('galery')}>
                    <FontAwesome5
                      name="pen"
                      size={20}
                      color="black"
                      style={{
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.followerFollwingLikeBg}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.countLabelBg}>
                      <Text style={styles.countTxt}>1434</Text>
                      <Text style={styles.labelTxt}>Followers</Text>
                    </View>
                    <View style={styles.divideVertical} />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.countLabelBg}>
                      <Text style={styles.countTxt}>1121</Text>
                      <Text style={styles.labelTxt}>Following</Text>
                    </View>
                    <View style={styles.divideVertical} />
                  </View>
                  <View style={styles.countLabelBg}>
                    <Text style={styles.countTxt}>
                      {this.state.numberLikes}
                    </Text>
                    <Text style={styles.labelTxt}>Likes</Text>
                  </View>
                </View>
                <View style={styles.TabsView}>
                  <View style={styles.materialTabsView}>
                    <MaterialTabs
                      items={['Mon compte', 'Parametre']}
                      selectedIndex={selectedTab}
                      onChange={index => {
                        if (index !== 2) {
                          this.setState({selectedTab: index});
                        }
                      }}
                      barColor="transparent"
                      indicatorColor="rgb(57,90,255)"
                      activeTextColor="#000"
                      inactiveTextColor="#959595"
                      uppercase={false}
                    />
                  </View>
                </View>
                {selectedTab === 0 ? (
                  <View>
                    <View style={styles.inputFieldSec}>
                      <Item
                        underline
                        style={styles.itememail}
                        error={
                          validationPseudo &&
                          this.state.submit &&
                          validationPseudo.pseudoValue &&
                          this.state.tabValidation.indexOf('pseudoValue') !== -1
                            ? true
                            : false
                        }>
                        {this.state.pseudoValue === '' ? (
                          <Ionicons
                            active
                            name="md-person"
                            size={35}
                            style={{
                              width: 40,
                              color: 'rgb(159,159,159)',
                            }}
                          />
                        ) : (
                          () => {
                            return '';
                          }
                        )}
                        <Input
                          placeholderTextColor="#000"
                          textAlign={I18nManager.isRTL ? 'right' : 'left'}
                          placeholder="Pseudo"
                          keyboardType="default"
                          style={styles.inputemail}
                          value={this.state.pseudoValue}
                          onChangeText={pseudoValue => {
                            this.setState({pseudoValue});
                            if (
                              this.state.tabValidation.indexOf(
                                'pseudoValue',
                              ) === -1
                            ) {
                              this.state.tabValidation.push('pseudoValue');
                            } else if (
                              this.state.tabValidation.indexOf(
                                'pseudoValue',
                              ) !== -1 &&
                              pseudoValue === this.state.user.pseudo
                            ) {
                              this.state.tabValidation.splice(
                                this.state.tabValidation.indexOf('pseudoValue'),
                                1,
                              );
                            }
                          }}
                        />
                        {validationPseudo &&
                        this.state.submit &&
                        validationPseudo.pseudoValue &&
                        this.state.tabValidation.indexOf('pseudoValue') !==
                          -1 ? (
                          <TouchableOpacity
                            info
                            style={styles.btnMdpVisible}
                            onPress={() => {
                              alert(validationPseudo.pseudoValue[0]);
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
                        style={styles.itememail}
                        error={
                          validationNom &&
                          this.state.submit &&
                          validationNom.nomValue &&
                          this.state.tabValidation.indexOf('nomValue') !== -1
                            ? true
                            : false
                        }>
                        {this.state.nomValue === '' ? (
                          <Ionicons
                            active
                            name="md-person"
                            size={35}
                            style={{
                              width: 40,
                              color: 'rgb(159,159,159)',
                            }}
                          />
                        ) : (
                          () => {
                            return '';
                          }
                        )}
                        <Input
                          placeholderTextColor="#000"
                          textAlign={I18nManager.isRTL ? 'right' : 'left'}
                          placeholder="Nom"
                          keyboardType="default"
                          style={styles.inputemail}
                          value={this.state.nomValue}
                          onChangeText={nomValue => {
                            this.setState({nomValue});
                            if (
                              this.state.tabValidation.indexOf('nomValue') ===
                              -1
                            ) {
                              this.state.tabValidation.push('nomValue');
                            } else if (
                              this.state.tabValidation.indexOf('nomValue') !==
                                -1 &&
                              nomValue === this.state.user.nom
                            ) {
                              this.state.tabValidation.splice(
                                this.state.tabValidation.indexOf('nomValue'),
                                1,
                              );
                            }
                          }}
                        />
                        {validationNom &&
                        this.state.submit &&
                        validationNom.nomValue &&
                        this.state.tabValidation.indexOf('nomValue') !== -1 ? (
                          <TouchableOpacity
                            info
                            style={styles.btnMdpVisible}
                            onPress={() => {
                              alert(validationNom.nomValue[0]);
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
                        style={styles.itememail}
                        error={
                          validationPrenom &&
                          this.state.submit &&
                          validationPrenom.prenomValue &&
                          this.state.tabValidation.indexOf('prenomValue') !== -1
                            ? true
                            : false
                        }>
                        {this.state.prenomValue === '' ? (
                          <Ionicons
                            active
                            name="md-person"
                            size={35}
                            style={{
                              width: 40,
                              color: 'rgb(159,159,159)',
                            }}
                          />
                        ) : (
                          () => {
                            return '';
                          }
                        )}
                        <Input
                          placeholderTextColor="#000"
                          textAlign={I18nManager.isRTL ? 'right' : 'left'}
                          placeholder="Prenom"
                          keyboardType="default"
                          style={styles.inputemail}
                          value={this.state.prenomValue}
                          onChangeText={prenomValue => {
                            this.setState({prenomValue});
                            if (
                              this.state.tabValidation.indexOf(
                                'prenomValue',
                              ) === -1
                            ) {
                              this.state.tabValidation.push('prenomValue');
                            } else if (
                              this.state.tabValidation.indexOf(
                                'prenomValue',
                              ) !== -1 &&
                              prenomValue === this.state.user.prenom
                            ) {
                              this.state.tabValidation.splice(
                                this.state.tabValidation.indexOf('prenomValue'),
                                1,
                              );
                            }
                          }}
                        />
                        {validationPrenom &&
                        this.state.submit &&
                        validationPrenom.prenomValue &&
                        this.state.tabValidation.indexOf('prenomValue') !==
                          -1 ? (
                          <TouchableOpacity
                            info
                            style={styles.btnMdpVisible}
                            onPress={() => {
                              alert(validationPrenom.prenomValue[0]);
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
                        style={styles.itememail}
                        error={
                          validationEmail &&
                          this.state.submit &&
                          validationEmail.EmailValue &&
                          this.state.tabValidation.indexOf('EmailValue') !== -1
                            ? true
                            : false
                        }>
                        {this.state.EmailValue === '' ? (
                          <Ionicons
                            active
                            name="md-mail"
                            size={35}
                            style={{
                              width: 40,
                              color: 'rgb(159,159,159)',
                            }}
                          />
                        ) : (
                          () => {
                            return '';
                          }
                        )}
                        <Input
                          disabled
                          placeholderTextColor="#000"
                          textAlign={I18nManager.isRTL ? 'right' : 'left'}
                          placeholder="Email"
                          keyboardType="email-address"
                          style={styles.inputemail}
                          onEndEditing={() => console.log()}
                          value={this.state.EmailValue}
                          onChangeText={EmailValue => {
                            this.setState({EmailValue: EmailValue});
                            if (
                              this.state.tabValidation.indexOf('EmailValue') ===
                              -1
                            ) {
                              this.state.tabValidation.push('EmailValue');
                            } else if (
                              this.state.tabValidation.indexOf('EmailValue') !==
                                -1 &&
                              EmailValue === this.state.user.email
                            ) {
                              this.state.tabValidation.splice(
                                this.state.tabValidation.indexOf('EmailValue'),
                                1,
                              );
                            }
                          }}
                        />
                        {validationEmail &&
                        this.state.submit &&
                        validationEmail.EmailValue &&
                        this.state.tabValidation.indexOf('EmailValue') !==
                          -1 ? (
                          <TouchableOpacity
                            info
                            style={styles.btnMdpVisible}
                            onPress={() => {
                              alert(validationEmail.EmailValue[0]);
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
                        style={styles.itempassword}
                        error={
                          validationOldPwd &&
                          this.state.submit &&
                          validationOldPwd.oldPasswordValue &&
                          this.state.tabValidation.indexOf(
                            'oldPasswordValue',
                          ) !== -1
                            ? true
                            : false
                        }>
                        {this.state.oldPasswordValue === '' ? (
                          <Ionicons
                            active
                            name="md-lock"
                            size={35}
                            style={{
                              width: 40,
                              color: 'rgb(159,159,159)',
                            }}
                          />
                        ) : (
                          () => {
                            return '';
                          }
                        )}
                        <Input
                          placeholderTextColor="#000"
                          textAlign={I18nManager.isRTL ? 'right' : 'left'}
                          placeholder="Ancient mot de passe"
                          secureTextEntry={this.state.oldPasswordNotVisible}
                          style={styles.inputpassword}
                          value={this.state.oldPasswordValue}
                          onChangeText={oldPasswordValue => {
                            this.setState({oldPasswordValue});
                            if (
                              this.state.tabValidation.indexOf(
                                'oldPasswordValue',
                              ) === -1
                            ) {
                              this.state.tabValidation.push('oldPasswordValue');
                            } else if (
                              this.state.tabValidation.indexOf(
                                'oldPasswordValue',
                              ) !== -1 &&
                              oldPasswordValue === ''
                            ) {
                              this.state.tabValidation.splice(
                                this.state.tabValidation.indexOf(
                                  'oldPasswordValue',
                                ),
                                1,
                              );
                            }
                          }}
                        />
                        <TouchableOpacity
                          info
                          style={
                            validationOldPwd &&
                            this.state.submit &&
                            validationOldPwd.oldPasswordValue &&
                            this.state.tabValidation.indexOf(
                              'oldPasswordValue',
                            ) !== -1
                              ? styles.btnMdpVisible2
                              : styles.btnMdpVisible
                          }
                          onPress={() => {
                            if (this.state.oldPasswordNotVisible === true) {
                              this.setState({
                                oldPasswordNotVisible: false,
                              });
                            } else {
                              this.setState({
                                oldPasswordNotVisible: true,
                              });
                            }
                          }}>
                          <FontAwesome5
                            name={
                              this.state.oldPasswordNotVisible
                                ? 'eye'
                                : 'eye-slash'
                            }
                            type="FontAwesome"
                            size={25}
                            color="black"
                            style={styles.arrow}
                          />
                        </TouchableOpacity>
                        {validationOldPwd &&
                        this.state.submit &&
                        validationOldPwd.oldPasswordValue &&
                        this.state.tabValidation.indexOf('oldPasswordValue') !==
                          -1 ? (
                          <TouchableOpacity
                            info
                            style={styles.btnMdpVisible}
                            onPress={() => {
                              alert(validationOldPwd.oldPasswordValue[0]);
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
                        style={styles.itempassword}
                        error={
                          validationNewPwd &&
                          this.state.submit &&
                          validationNewPwd.PasswordValue &&
                          this.state.tabValidation.indexOf('PasswordValue') !==
                            -1
                            ? true
                            : false
                        }>
                        {this.state.PasswordValue === '' ? (
                          <Ionicons
                            active
                            name="md-lock"
                            size={35}
                            style={{
                              width: 40,
                              color: 'rgb(159,159,159)',
                            }}
                          />
                        ) : (
                          () => {
                            return '';
                          }
                        )}
                        <Input
                          placeholderTextColor="#000"
                          textAlign={I18nManager.isRTL ? 'right' : 'left'}
                          placeholder="Nouveau mot de passe"
                          secureTextEntry={this.state.passwordNotVisible}
                          style={styles.inputpassword}
                          value={this.state.PasswordValue}
                          onChangeText={PasswordValue => {
                            this.setState({PasswordValue});
                            if (
                              this.state.tabValidation.indexOf(
                                'PasswordValue',
                              ) === -1
                            ) {
                              this.state.tabValidation.push('PasswordValue');
                            } else if (
                              this.state.tabValidation.indexOf(
                                'PasswordValue',
                              ) !== -1 &&
                              PasswordValue === ''
                            ) {
                              this.state.tabValidation.splice(
                                this.state.tabValidation.indexOf(
                                  'PasswordValue',
                                ),
                                1,
                              );
                            }
                          }}
                        />
                        <TouchableOpacity
                          info
                          style={
                            validationNewPwd &&
                            this.state.submit &&
                            validationNewPwd.PasswordValue &&
                            this.state.tabValidation.indexOf(
                              'PasswordValue',
                            ) !== -1
                              ? styles.btnMdpVisible2
                              : styles.btnMdpVisible
                          }
                          onPress={() => {
                            if (this.state.passwordNotVisible === true) {
                              this.setState({
                                passwordNotVisible: false,
                              });
                            } else {
                              this.setState({
                                passwordNotVisible: true,
                              });
                            }
                          }}>
                          <FontAwesome5
                            name={
                              this.state.passwordNotVisible
                                ? 'eye'
                                : 'eye-slash'
                            }
                            type="FontAwesome"
                            size={25}
                            color="black"
                            style={styles.arrow}
                          />
                        </TouchableOpacity>
                        {validationNewPwd &&
                        this.state.submit &&
                        validationNewPwd.PasswordValue &&
                        this.state.tabValidation.indexOf('PasswordValue') !==
                          -1 ? (
                          <TouchableOpacity
                            info
                            style={styles.btnMdpVisible}
                            onPress={() => {
                              alert(validationNewPwd.PasswordValue[0]);
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
                    <View style={styles.preferenceView}>
                      <Text style={styles.titleText}>Mes Preference</Text>
                      <View style={styles.card}>
                        {this.state.preferences.map((sport, index) => {
                          return (
                            <View key={index} style={styles.cardLigne}>
                              <Text style={styles.cardLigneText}>
                                {sport.nom}
                              </Text>
                              <SwitchToggle
                                containerStyle={{
                                  width: Metrics.WIDTH * 0.13,
                                  height: Metrics.HEIGHT * 0.03,
                                  borderRadius: 25,

                                  padding: 0,
                                }}
                                circleStyle={{
                                  width: Metrics.HEIGHT * 0.04,
                                  height: Metrics.HEIGHT * 0.04,
                                  borderRadius: Metrics.HEIGHT * 0.06,
                                  borderColor: '#e5e5e5',
                                  borderWidth: 1,
                                  shadowOffset: {width: 0, height: 0},
                                  shadowColor: 'black',
                                  shadowOpacity: 1,
                                  shadowRadius: 5,
                                  elevation: 2,
                                }}
                                switchOn={sport.selected}
                                onPress={() => {
                                  this.functionAlertPreference(index);
                                  if (
                                    this.state.tabValidation.indexOf(
                                      'preferences',
                                    ) === -1
                                  ) {
                                    this.state.tabValidation.push(
                                      'preferences',
                                    );
                                  }
                                }}
                                circleColorOff="white"
                                circleColorOn="rgb(4,170,24)"
                                backgroundColorOn="rgb(255,214,78)"
                                backgroundColorOff="rgb(159,159,159)"
                                duration={500}
                              />
                            </View>
                          );
                        })}
                      </View>
                      <TouchableOpacity
                        info
                        style={styles.buttonlogin2}
                        onPress={() => {
                          this.setState({submit: true});
                          this.updateUser();
                        }}>
                        <Text autoCapitalize="words" style={styles.btnText}>
                          Save Changes
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.inputFieldSec} />
                    <View style={styles.card2}>
                      <View style={styles.cardLigne}>
                        <TouchableOpacity
                          info
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                          }}
                          onPress={() => alert('Sign Up')}>
                          <Text style={styles.cardLigneText}>
                            Mentions légales
                          </Text>
                          <FontAwesome
                            name="angle-right"
                            type="FontAwesome"
                            size={20}
                            color="rgb(159,159,159)"
                            style={{width: 30}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.cardLigne}>
                        <TouchableOpacity
                          info
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                          }}
                          onPress={() => alert('Sign Up')}>
                          <Text style={styles.cardLigneText}>
                            Réinitialiser le mot de passe
                          </Text>
                          <FontAwesome
                            name="angle-right"
                            type="FontAwesome"
                            size={20}
                            color="rgb(159,159,159)"
                            style={{width: 30}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.cardLigne}>
                        <TouchableOpacity
                          info
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                          }}
                          onPress={() => alert('Sign Up')}>
                          <Text style={styles.cardLigneText}>
                            Termes of service
                          </Text>
                          <FontAwesome
                            name="angle-right"
                            type="FontAwesome"
                            size={20}
                            color="rgb(159,159,159)"
                            style={{width: 30}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.cardLigne}>
                        <TouchableOpacity
                          info
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                          }}
                          onPress={() => alert('Sign Up')}>
                          <Text style={styles.cardLigneText}>About</Text>
                          <FontAwesome
                            name="angle-right"
                            type="FontAwesome"
                            size={20}
                            color="rgb(159,159,159)"
                            style={{width: 30}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.cardLigneLast}>
                        <Text style={styles.cardLigneText}>Deconnecter</Text>
                        <SwitchToggle
                          containerStyle={{
                            width: Metrics.WIDTH * 0.13,
                            height: Metrics.HEIGHT * 0.03,
                            borderRadius: 25,
                            padding: 0,
                          }}
                          circleStyle={{
                            width: Metrics.HEIGHT * 0.04,
                            height: Metrics.HEIGHT * 0.04,
                            borderRadius: Metrics.HEIGHT * 0.06,
                            borderColor: '#e5e5e5',
                            borderWidth: 1,
                            shadowOffset: {width: 0, height: 0},
                            shadowColor: 'black',
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            elevation: 2,
                          }}
                          switchOn={true}
                          onPress={this.onPress1}
                          circleColorOff="white"
                          circleColorOn="white"
                          backgroundColorOn="rgb(255,214,78)"
                          backgroundColorOff="rgb(159,159,159)"
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      info
                      style={styles.suppCompte}
                      onPress={() => alert('Sign Up')}>
                      <Text autoCapitalize="words" style={styles.btnText2}>
                        Supprimer le compte
                      </Text>
                      <FontAwesome
                        name="angle-right"
                        type="FontAwesome"
                        size={20}
                        color="rgb(159,159,159)"
                        style={styles.arrow}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      info
                      style={styles.buttonlogin3}
                      onPress={() => alert('Sign Up')}>
                      <Text autoCapitalize="words" style={styles.btnText}>
                        Save Changes
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Content>
            </View>
          }
          styles={drawerStyles}
          disabled={this.state.disabled}
          tweenHandler={ratio => ({
            mainOverlay: {
              backgroundColor: 'rgba(0,0,0,' + ratio / 1.5 + ')',
            },
          })}
          tweenDuration={this.state.tweenDuration}
          tweenEasing={this.state.tweenEasing}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptTap={this.state.acceptTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          changeVal={this.state.changeVal}
          side={this.state.side}
          onClose={() => this.setState({backgroundColor: 'transparent'})}
          onOpenStart={() =>
            this.setState({backgroundColor: 'rgba(0,0,0,0.5)'})
          }>
          <Container style={styles.container}>
            <Content style={styles.content}>
              <View
                style={{
                  alignSelf: 'center',
                  width: Metrics.WIDTH * 0.9,
                  marginTop: Metrics.HEIGHT * 0.1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: Metrics.HEIGHT * 0.03,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialIcons
                    name="add-a-photo"
                    size={150}
                    color="rgb(234,234,234)"
                    style={{
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                    }}
                  />
                  <View
                    style={{
                      height: '100%',
                      paddingLeft: Metrics.WIDTH * 0.05,
                      paddingTop: Metrics.WIDTH * 0.1,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>
                      {this.state.user.pseudo}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: 'rgb(248,223,81)',
                        }}>
                        {this.state.profil.spots.length}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginLeft: 10,
                        }}>
                        SPOTS
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.openDrawer();
                  }}>
                  <FontAwesome name="bars" size={30} color="black" style={{}} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  width: Metrics.WIDTH * 0.9,
                  flexDirection: 'row',
                  marginBottom: Metrics.HEIGHT * 0.03,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: 'rgb(248,223,81)',
                    paddingHorizontal: 5,
                  }}>
                  {this.state.profil.nbrFolowers}
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  FOLLOWERS,
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: 'rgb(248,223,81)',
                    paddingHorizontal: 5,
                  }}>
                  {this.state.profil.nbrFolowing}
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  FOLLOWING,
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: 'rgb(248,223,81)',

                    paddingHorizontal: 5,
                  }}>
                  {this.state.numberLikes}
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>LIKES</Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  width: Metrics.WIDTH * 0.9,
                  flexDirection: 'row',
                  marginBottom: Metrics.HEIGHT * 0.03,
                }}>
                <FlatList
                  data={this.state.spots}
                  renderItem={({item}) => (
                    <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('MyModal', {
                            detailSpot: item,
                          })
                        }>
                        <Image
                          style={{
                            height: Metrics.WIDTH * 0.43,
                            width: Metrics.WIDTH * 0.43,
                            marginLeft: Metrics.WIDTH * 0.015,
                            marginBottom: Metrics.WIDTH * 0.015,
                          }}
                          source={{uri: item[1].photos[0]}}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  //Setting the number of column
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </Content>
          </Container>
        </Drawer>
      </GestureRecognizer>
    );
  }
}
export default ContainTabProfile;
const constraintPseudo = {
  pseudoValue: {
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
};
const constraintNom = {
  nomValue: {
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
};
const constraintPrenom = {
  prenomValue: {
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
};
const constraintEmail = {
  EmailValue: {
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
};
const constraintOldPwd = {
  oldPasswordValue: {
    presence: {
      allowEmpty: false,
      message: '^Veuillez entrer votre Mot de passe',
    },
    length: {
      minimum: 6,
      message: 'Votre ancient Mot de passe est errone',
    },
    format: {
      pattern: '^(?=.*?[0-9])[a-zA-Z0-9]+',
      message: 'Votre ancient Mot de passe est errone',
    },
  },
};
const constraintNewPwd = {
  PasswordValue: {
    presence: {
      allowEmpty: false,
      message: '^Veuillez entrer votre nouveau Mot de passe',
    },
    length: {
      minimum: 6,
      message:
        '^Votre nouveau Mot de passe doit contenire plus de 6 caractèrese',
    },
    format: {
      pattern: '^(?=.*?[0-9])[a-zA-Z0-9]+',
      message: '^Votre nouveau Mot de passe doit contenir au moins un nombre"',
    },
  },
};

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
import {
  Container,
  Right,
  Form,
  Item,
  Input,
  Header,
  Left,
  Body,
} from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';
import styles from './styles';
import {Metrics, Fonts, ApplicationStyles, Colors} from '../../Themes';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
class PrendrePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      activeSports: [],
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
      uploading: true,
      index: 0,
      data: [],
    };
  }
  getUser() {
    console.log('///dkhl Pref');
    AsyncStorage.getItem('authentifiedUser').then(user => {
      if (user) {
        console.log('getUser()');
        console.log('getfin');
        this.setState(
          {
            user: JSON.parse(user),
          },
          () => console.log(this.state.user),
        );
      }
    });
  }
  getSports() {
    firebase
      .database()
      .ref('/NEWDEV/sports')
      .orderByChild('active_userUid')
      .startAt('true_')
      .endAt('true_' + '\uf8ff')
      .on('value', snapshot => {
        console.log('********1');
        if (snapshot && snapshot.val()) {
          console.log(snapshot);
          this.setState(
            {
              activeSports: Object.keys(snapshot.val()),
            },
            () =>
              Promise.all(
                this.state.activeSports.map((spo, index) => {
                  if (index === 0) {
                    this.state.data.push({
                      sportName: spo,
                      selected: true,
                    });
                  } else {
                    this.state.data.push({
                      sportName: spo,
                      selected: false,
                    });
                  }
                }),
              ).then(() => {
                console.log(this.state.data);
                this.setState({uploading: false});
              }),
          );
        }
      });
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
    this.props.navigation.addListener('focus', () => {
      this.getUser();
      this.getSports();
    });
  }
  pushPreference() {
    let selectedTab = [];

    Promise.all(
      this.state.data.map((sport, index) => {
        if (sport.selected == true) {
          selectedTab.push(sport.sportName);
        }
      }),
    ).then(() => {
      console.log(selectedTab);
      if (selectedTab.length > 0) {
        this.setState({uploading: true}, () => {
          console.log(
            JSON.stringify(this.state.user) + '/////////////////////////////',
          );
          firebase
            .database()
            .ref('NEWDEV/users/' + this.state.user.uid)
            .update({
              preferences: selectedTab,
            })
            .then(res => {
              console.log('user' + JSON.stringify(this.state.user));
              AsyncStorage.setItem(
                'authentifiedUser',
                JSON.stringify({
                  uid: this.state.user.uid,
                  nom: this.state.user.nom,
                  prenom: this.state.user.prenom,
                  pseudo: this.state.user.pseudo,
                  email: this.state.user.email,
                  password: this.state.user.password,
                  policyPrivacyAccepted: this.state.user.policyPrivacyAccepted,
                  photoUrl: this.state.user.photoUrl,
                  preferences: selectedTab,
                }),
              ).then(() =>
                this.setState(
                  {
                    index: 0,
                    user: {},
                    uploading: false,
                    data: [],
                  },
                  () => {
                    this.props.navigation.navigate('MenuPrincipale', {
                      screen: 'ContainTabRecherche',
                    });
                  },
                ),
              );
            })
            .catch(error => console.log(error));
        });
      } else {
        alert('Vos preferences doivents contenir au moin un sport');
      }
    });
  }
  onClick(data) {
    data.checked = !data.checked;
    data.checked ? 'you checked ' : 'you unchecked ';
  }
  uploadImage() {
    const ext = this.state.imagePath.split('.').pop(); // Extract image extension
    // const filename = `${uuidv5()}.${ext}`; // Generate unique name
    this.setState({uploading: true});
    firebase
      .storage()
      .ref('gallery/imgProfil/imgProfil_' + uuidv4() + '.' + ext)
      .putFile(this.state.imagePath)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log(snapshot);
          this.setState(
            {
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            },
            () => console.log(this.state.progress),
          );

          // Calculate progress percentage

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            this.setState({
              uploading: false,
              imagePath: '',
              imageHeight: '',
              imageWidth: '',
              imageData: '',
              progress: 0,
            });
          }
        },
        error => {
          alert('Sorry, Try again.' + error);
        },
      );
  }
  PrendrePhoto(type) {
    if (type == 'galery') {
      ImagePicker.showImagePicker(this.state.options, response => {
        if (!response.didCancel) {
          console.log(response);
          this.setState({
            imagePath: response.uri,
            imageHeight: response.height,
            imageWidth: response.width,
            imageData: response.data,
          });
        }
      });
    }
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    let spotImag1 = {
      illustration:
        'https://ridersincorporated.e-monsite.com/medias/album/20190831-151513.jpg',
    };
    let spotImag2 = {
      uri:
        'https://media.ouest-france.fr/v1/pictures/MjAxMzA5YzIwMjBlYzJmZjhlNDIxZDEwNDM1ZDI3NGU0OGFmZDM?width=480&height=270&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=2d209419a891f58a364f97077766b1b52ae28e146a166388d53e61e1248f566c',
    };
    let swiperImage = {
      illustration:
        'https://antiqueruby.aliansoftware.net//Images/walkthrough/light_wt14.png',
    };
    let data2 = [swiperImage, spotImag1, spotImag2];
    return (
      <Container>
        <ImageBackground
          source={require('./../../images/BackGround-Profil.png')}
          style={[styles.screenBg, ApplicationStyles.backgroundImage]}>
          <Header androidStatusBarColor={'#000'} style={styles.header}>
            <Left style={styles.left} />
            <Body style={styles.body}>
              <Text
                style={{
                  color: '#000',
                  fontSize: Fonts.moderateScale(20),
                  fontWeight: 'bold',
                  alignSelf: 'flex-end',
                  fontFamily: Fonts.type.helveticaNeueLight,
                }}>
                Préférences
              </Text>
            </Body>
          </Header>
          <View
            style={{
              ...Platform.select({
                ios: {
                  height: Metrics.HEIGHT * 0.97,
                },
                android: {
                  height: Metrics.HEIGHT * 0.91,
                },
              }),
            }}>
            <View
              style={{
                height: Metrics.HEIGHT * 0.66,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.card}>
                <ScrollView style={{paddingBottom:20}}>
                {this.state.data.map((sport, index) => {
                  return (
                    <View key={index} style={styles.cardLigne}>
                      <Text style={styles.cardLigneText}>
                        {sport.sportName}
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
                          console.log(this.state.data[index].selected);
                          console.log(!sport.selected);
                          this.state.data[index].selected = !sport.selected;
                          this.forceUpdate();
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
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                height: Metrics.HEIGHT * 0.245,
                backgroundColor: 'transparent',
                width: Metrics.WIDTH * 1,
                alignItems:"center",
                justifyContent:"center"
              }}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:"center"
                  }}>
                  <TouchableOpacity
                    onPress={() => this.pushPreference()}
                    style={styles.publishBotton}>
                    <Text style={styles.publishText}>VALIDER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
export default PrendrePhoto;

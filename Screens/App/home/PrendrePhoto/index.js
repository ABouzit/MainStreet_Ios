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
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
// Screen Styles
import styles from './styles';
import {Metrics, Fonts, Colors} from '../../Themes';

class PreferencePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      imageData: '',
      imagePath: '',
      imageHeight: '',
      imageWidth: '',
      uploading: true,
      progress: 0,
      user: {},
    };
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
    this.props.navigation.addListener('focus', () => {
      this.getUser();
    });
  }
  getUser() {
    console.log('///dkhl Photo');
    AsyncStorage.getItem('authentifiedUser').then(user => {
      if (user) {
        console.log('getUser()');
        console.log('getfin');
        this.setState(
          {
            user: JSON.parse(user),
            uploading: false,
          },
          () => console.log(this.state.user),
        );
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
            snapshot.ref.getDownloadURL().then(res =>
              firebase
                .database()
                .ref('NEWDEV/users/' + this.state.user.uid)
                .update({
                  photoUrl: res,
                })
                .then(res2 => {
                  AsyncStorage.setItem(
                    'authentifiedUser',
                    JSON.stringify({
                      uid: this.state.user.uid,
                      nom: this.state.user.nom,
                      prenom: this.state.user.prenom,
                      pseudo: this.state.user.pseudo,
                      email: this.state.user.email,
                      password: this.state.user.password,
                      policyPrivacyAccepted: true,
                      photoUrl: res,
                      preferences: this.state.user.preferences,
                    }),
                  ).then(() =>
                    this.setState(
                      {
                        uploading: false,
                        imagePath: '',
                        imageHeight: '',
                        imageWidth: '',
                        imageData: '',
                        progress: 0,
                        user: {},
                      },
                      () => this.props.navigation.navigate('PreferencePage'),
                    ),
                  );
                })
                .catch(error => console.log(error)),
            );
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
  plusTard() {
    this.props.navigation.navigate('PreferencePage');
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container>
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
              Photo de Profil
            </Text>
          </Body>
        </Header>
        <View style={styles.Container}>
          <View style={styles.imagesPicker}>
            <View style={styles.proimg}>
              <Image
                style={styles.profileImgs}
                source={
                  this.state.imagePath != ''
                    ? {uri: this.state.imagePath}
                    : require('./../../images/defautProfil.jpg')
                }
              />
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={() => this.PrendrePhoto('galery')}>
                <FontAwesome5
                  name="camera"
                  size={30}
                  color="white"
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttons}>
            <Form style={styles.form}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  info
                  style={styles.buttonsignup}
                  onPress={() => this.uploadImage()}>
                  <Text autoCapitalize="words" style={styles.btnText}>
                    Prendre la photo
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  info
                  style={styles.buttonlogin}
                  onPress={() => this.plusTard()}>
                  <Text autoCapitalize="words" style={styles.btnText}>
                    Pas maintenant
                  </Text>
                </TouchableOpacity>
              </View>
            </Form>
          </View>
          <View style={styles.textBottom}>
            <Text style={styles.textBottomTxt}>
              Une photo de profil augmente votre visibilité !
            </Text>
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
      </Container>
    );
  }
}
export default PreferencePage;

import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Container,
  Button,
  Right,
  Header,
  Left,
  Body,
  Item,
  Input,
} from 'native-base';
import Swiper from 'react-native-swiper';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './ContainTabStyle';
import {ApplicationStyles, Metrics} from '../../Themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';
import axios from 'axios';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
  subscriber,
  messageService,
  subscriberRedirect,
} from './../../services/messageService';
const activeindicator = 0;
class ContainTabNewSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      latitude: '',
      longitude: '',
      index: '',
      activeindicator: 0,
      indexSlider: '',
      LocationValue: '',
      selectedSportLots: [],
      selectedTranLots: [],
      selectedTimeLots: [],
      ville: '',
      imagePath: [],
      imageHeight: [],
      imageWidth: [],
      imageData: [],
      uploading: true,
      submit: false,
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
        quality: 0.6,
      },
    };
    this.props.navigation.addListener('focus', () => {
      this.getUser();
      this.initPositions();
      subscriber.next(true);
    });
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
  onSelectedTime(id) {
    let tmp = this.state.selectedTimeLots;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }

    this.setState({selectedTimeLots: tmp});
    console.log(tmp);
  }
  onSelectedSport(id) {
    let tmp = this.state.selectedSportLots;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    console.log(tmp);
    this.setState({selectedSportLots: tmp});
  }
  onSelectedTran(id) {
    let tmp = this.state.selectedTranLots;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    console.log(tmp);
    this.setState({selectedTranLots: tmp});
  }
  _renderSportItem = ({item}) => (
    <TouchableOpacity
      style={
        this.state.selectedSportLots.includes(item.musicname)
          ? [styles.txtBg, styles.selectedButton]
          : [styles.txtBg, {backgroundColor: 'white'}]
      }
      onPress={() => this.onSelectedSport(item.musicname)}>
      <Text
        style={
          this.state.selectedSportLots.includes(item.musicname)
            ? [styles.musicname, {color: '#fff'}]
            : [styles.musicname, {color: '#000'}]
        }>
        {' '}
        {item.musicname}
      </Text>
    </TouchableOpacity>
  );
  _renderTranItem = ({item}) => (
    <TouchableOpacity
      style={
        this.state.selectedTranLots.includes(item.musicname)
          ? [styles.txtBg, styles.selectedButton]
          : [styles.txtBg, {backgroundColor: 'white'}]
      }
      onPress={() => this.onSelectedTran(item.musicname)}>
      <Text
        style={
          this.state.selectedTranLots.includes(item.musicname)
            ? [styles.musicname, {color: '#fff'}]
            : [styles.musicname, {color: '#000'}]
        }>
        {' '}
        {item.musicname}
      </Text>
    </TouchableOpacity>
  );
  _renderTimeItem = ({item}) => (
    <TouchableOpacity
      style={
        this.state.selectedTimeLots.includes(item.musicname)
          ? [styles.txtBg, styles.selectedButton]
          : [styles.txtBg, {backgroundColor: 'white'}]
      }
      onPress={() => this.onSelectedTime(item.musicname)}>
      <Text
        style={
          this.state.selectedTimeLots.includes(item.musicname)
            ? [styles.musicname, {color: '#fff'}]
            : [styles.musicname, {color: '#000'}]
        }>
        {' '}
        {item.musicname}
      </Text>
    </TouchableOpacity>
  );
  supprimerImage(index) {
    Alert.alert(
      "Supprimer l'image",
      'etes-vous sur de vouloir supprimer cette image?',
      [
        {
          text: 'ANNULER',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OUI',
          onPress: () => {
            if (index === this.state.imagePath.length - 1) {
              this.refs.swiper.scrollBy(-1);
            }
            this.state.imagePath.splice(index, 1);
            this.state.imageHeight.splice(index, 1);
            this.state.imageWidth.splice(index, 1);
            this.state.imageData.splice(index, 1);
            this.forceUpdate();
          },
        },
      ],
      {cancelable: true},
    );
  }
  PrendrePhoto(type) {
    console.log(this.state.imagePath.length);
    if (this.state.imagePath.length > 0) {
      this.refs.swiper.scrollBy(-this.state.imagePath.length);
    }
    if (type == 'galery') {
      ImagePicker.showImagePicker(this.state.options, response => {
        if (!response.didCancel) {
          console.log(response.uri);

          Promise.all(this.state.imagePath.unshift(response.uri)).then(() => {
            console.log(this.state.imagePath);
            this.forceUpdate();
          }),
            this.state.imageHeight.unshift(response.height);
          this.state.imageWidth.unshift(response.width);
          this.state.imageData.unshift(response.data);

          console.log(this.state.imagePath);
        }
      });
    }
  }
  initPositions() {
    console.log('init');
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        axios
          .get(
            'https://api.opencagedata.com/geocode/v1/json?q=' +
              position.coords.latitude +
              '+' +
              position.coords.longitude +
              '&key=f49257833b6e423eaece277935f9ec17&language=fr',
          )
          .then(res =>
            this.setState(
              {
                LocationValue:
                  res.data.results[0].components.road +
                  ', ' +
                  res.data.results[0].components.suburb,
                ville: res.data.results[0].components.city,
                uploading: false,
              },
              () => {
                subscriber.next(false);
                this.PrendrePhoto('galery');
              },
            ),
          );

        // this.functionAnimate(
        //   {
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //   },
        //   2,
        // );
        // this.functionAnimate(data[0].region, 1);
        // if (this.map) {
        //   setTimeout(() => {
        //     this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
        //   }, 501);
        // }
      },
      error => console.log(JSON.stringify(error)),
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 1000,
      },
    );

    this.watchID = Geolocation.watchPosition(
      position => {
        console.log(position);
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        // axios
        //   .get(
        //     'https://api.opencagedata.com/geocode/v1/json?q=' +
        //       position.coords.latitude +
        //       '+' +
        //       position.coords.longitude +
        //       '&key=f49257833b6e423eaece277935f9ec17&language=fr',
        //   )
        //   .then(res =>
        //     this.setState(
        //       {
        //         LocationValue:
        //           res.data.results[0].components.road +
        //           ', ' +
        //           res.data.results[0].components.suburb,
        //         ville: res.data.results[0].components.city,
        //         uploading: false,
        //       },
        //       () => this.PrendrePhoto('galery'),
        //     ),
        //   );
        // this.functionAnimate(
        //   {
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //   },
        //   2,
        // );
        // this.functionAnimate(data[0].region, 1);
      },
      error => console.log('//' + error.message),
      {
        enableHighAccuracy: true,
        timeout: 200000,
        maximumAge: 1000,
      },
    );
  }
  addSpot() {
    console.log('console');
    let storageUrl = [];
    if (this.state.submit) {
      if (this.state.imagePath.length == 0) {
        Alert.alert(
          'Images',
          'Le Spot doit avoir au moins une image',
          [
            {
              text: 'ANNULER',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: true},
        );
      } else {
        if (this.state.LocationValue == '') {
          Alert.alert(
            'Adresse',
            'Le Spot doit avoir une adresse',
            [
              {
                text: 'ANNULER',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
        } else {
          if (this.state.selectedSportLots.length == 0) {
            Alert.alert(
              'Sports',
              'Le Spot doit avoir au moins un sport',
              [
                {
                  text: 'ANNULER',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
          } else {
            if (this.state.selectedTranLots.length == 0) {
              Alert.alert(
                'Types',
                'Le Spot doit avoir au moins un type',
                [
                  {
                    text: 'ANNULER',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              );
            } else {
              if (this.state.selectedTimeLots.length == 0) {
                Alert.alert(
                  'Horaires',
                  'Le Spot doit avoir au moins un horaire',
                  [
                    {
                      text: 'ANNULER',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ],
                  {cancelable: true},
                );
              } else {
                this.setState({uploading: true}, () => subscriber.next(true));
                this.state.imagePath.map((image, index) => {
                  const ext = image.split('.').pop();
                  firebase
                    .storage()
                    .ref('gallery/spot/spot_' + uuidv4() + '.' + ext)
                    .putFile(image)
                    .then(
                      snapshot => {
                        if (
                          snapshot.state === firebase.storage.TaskState.SUCCESS
                        ) {
                          console.log(snapshot);
                          firebase
                            .storage()
                            .ref(snapshot.metadata.fullPath)
                            .getDownloadURL()
                            .then(res => {
                              storageUrl.push(res);
                              console.log(storageUrl);
                              if (index === this.state.imagePath.length - 1) {
                                console.log('pa9');
                                firebase
                                  .database()
                                  .ref('NEWDEV/spots/')
                                  .push({
                                    adresse: this.state.LocationValue,
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                    uid: this.state.user.uid,
                                    ville: this.state.ville,
                                    trans: this.state.selectedTranLots,
                                    disponibilite: this.state.selectedTimeLots,
                                    sports: this.state.selectedSportLots,
                                    photos: storageUrl,
                                  })
                                  .then(res =>
                                    this.setState(
                                      {
                                        imagePath: [],
                                        imageHeight: [],
                                        imageWidth: [],
                                        imageData: [],
                                        uploading: false,
                                        selectedSportLots: [],
                                        selectedTranLots: [],
                                        selectedTimeLots: [],
                                        submit: false,
                                      },
                                      () => {
                                        subscriber.next(false);
                                        subscriberRedirect.next('Profile');
                                      },
                                    ),
                                  )
                                  .catch(error => console.log(error));
                              }
                            });
                        }
                      },
                      error => {
                        alert('Sorry, Try again.' + error);
                      },
                    );
                });
              }
            }
          }
        }
      }
    }
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    let pic = {
      uri: require('./../../images/BackGround-Profil.png'),
    };
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
    var data = [
      {
        id: 1,
        image: swiperImage,
        title: 'Creative Things',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        image: swiperImage,
        title: 'Creative Things',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 3,
        image: swiperImage,
        title: 'Creative Things',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 4,
        image: swiperImage,
        title: 'Creative Things',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 5,
        image: swiperImage,
        title: 'Creative Things',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ];
    let data2 = [swiperImage, spotImag1, swiperImage];

    return (
      <ImageBackground
        source={pic.uri}
        style={[styles.screenBg, ApplicationStyles.backgroundImage]}>
        <View
          style={{
            ...Platform.select({
              ios: {
                height: Metrics.HEIGHT * 0.9,
              },
              android: {
                height: Metrics.HEIGHT * 0.935,
              },
            }),
          }}>
          <Swiper
            showsButtons={false}
            autoplay={false}
            loop={false}
            ref="swiper"
            index={this.state.index}
            paginationStyle={{
              position: 'absolute',
              top: -(Metrics.HEIGHT * 0.22),
            }}
            activeDot={<View style={{}} />}
            dot={<View style={{}} />}
            onIndexChanged={index => this.setState({index})}>
            {this.state.imagePath.map((image, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                  }}
                  key={index}>
                  <SliderEntry
                    data={{illustration: image}}
                    parallax={false}
                    containerStyle={SliderEntryStyle.imageContainerMap}
                    imageStyle={SliderEntryStyle.image}
                    imageContainer={SliderEntryStyle.imageContainerMap}
                    type="Image"
                    deleteIcon="true"
                    onIconPress={() => this.supprimerImage(index)}
                  />
                </View>
              );
            })}
          </Swiper>
          <View style={styles.slide2}>
            <View
              style={{
                height: Metrics.HEIGHT * 0.08,
                width: Metrics.WIDTH,
              }}>
              <Input
                placeholderTextColor="rgb(159,159,159)"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                placeholder="Tappez l'adresse du spot"
                keyboardType="default"
                style={styles.itemAddress}
                onChangeText={LocationValue => this.setState({LocationValue})}
                value={this.state.LocationValue}
              />
            </View>
            <View
              style={{
                height: Metrics.HEIGHT * 0.3,
                width: Metrics.WIDTH,
              }}>
              <FlatList
                contentContainerStyle={styles.listContent}
                data={sportData}
                keyExtractor={sportData => sportData.id}
                renderItem={this._renderSportItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              <FlatList
                contentContainerStyle={styles.listContent}
                data={tranData}
                keyExtractor={tranData => tranData.id}
                renderItem={this._renderTranItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              <FlatList
                contentContainerStyle={styles.listContent}
                data={timingData}
                keyExtractor={timingData => timingData.id}
                renderItem={this._renderTimeItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              />

              <View style={styles.btnsec}>
                <TouchableOpacity
                  onPress={() => this.PrendrePhoto('galery')}
                  style={[
                    styles.addNewPhotoBotton,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginRight: 20,
                    },
                  ]}>
                  <MaterialIcons
                    name="add-a-photo"
                    size={25}
                    color="#rgb(255,213,0)"
                    style={{alignSelf: 'center'}}
                  />
                  <Text style={styles.nextText}>ADD NEW IMAGE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({submit: true}, () => this.addSpot())
                  }
                  style={styles.publishBotton}>
                  <Text style={styles.publishText}>PUBLISH</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
var sportData = [
  {
    id: 1,
    musicname: 'BMX',
  },
  {
    id: 2,
    musicname: 'SKATEBOARD ',
  },
  {
    id: 3,
    musicname: 'ROLLER',
  },
  {
    id: 4,
    musicname: 'SCOOTERS',
  },
  {
    id: 5,
    musicname: 'AUTRE',
  },
];
var tranData = [
  {
    id: 1,
    musicname: 'TRANSITION',
  },
  {
    id: 2,
    musicname: 'RAIL ',
  },
  {
    id: 3,
    musicname: 'GAP',
  },
];
var timingData = [
  {
    id: 1,
    musicname: 'ALLTIME',
  },
  {
    id: 2,
    musicname: 'DAY ',
  },
  {
    id: 3,
    musicname: 'NIGHT',
  },
  {
    id: 4,
    musicname: 'MONDAY',
  },
  {
    id: 5,
    musicname: 'TUESDAY',
  },
  {
    id: 6,
    musicname: 'WEDNESDAY',
  },
  {
    id: 7,
    musicname: 'THURSDAY',
  },
  {
    id: 8,
    musicname: 'FRIDAY',
  },
  {
    id: 9,
    musicname: 'SATURDAY',
  },
  {
    id: 10,
    musicname: 'SUNDAY',
  },
];
export default ContainTabNewSpot;

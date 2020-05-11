import React, {Component} from 'react';
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Input,
} from 'native-base';
// Screen Styles
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import {View} from 'react-native-animatable';
import Stars from 'react-native-stars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Images, Metrics} from './../../Themes';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';
import {Colors} from './../../Themes';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
const profileImageSix =
  'https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine.png';
const profileImageThree =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_suggested_user_three_sone.png';
const profileImageFour =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png';
const profileImageFive =
  'https://antiqueruby.aliansoftware.net//Images/social/people_five_soeighteen.png';
const postImageUri =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_post_sone.png';
/*
 *  Profile Screen
 */
class DetailsCommentsModal extends Component {
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.goBack();
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      spot: {},
      user: {},
      star: 0,
      commentaire: '',
      commentes: [],
      like: false,
      likes: [],
      uploading: true,
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
    };
    this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('authentifiedUser').then(user => {
        if (user) {
          this.setState(
            {
              uid: this.props.route.params.detailSpot[0],
              spot: this.props.route.params.detailSpot[1],

              user: JSON.parse(user),
            },
            () => {
              this.forceUpdate();
              this.state.spot.photos.push('');
              console.log(this.state.uid);
              console.log(this.state.spot);
              console.log(this.state.user);
              firebase
                .database()
                .ref('NEWDEV/comments/' + this.state.uid)
                .on('value', snapshot => {
                  if (snapshot.val()) {
                    this.setState(
                      {commentes: Object.entries(snapshot.val())},
                      () => {
                        firebase
                          .database()
                          .ref('NEWDEV/users/' + this.state.user.uid + '/likes')
                          .once('value', snapshot => {
                            console.log(snapshot);
                            if (snapshot.val() && snapshot.val().lenght != 0) {
                              this.setState(
                                {
                                  likes: snapshot.val(),
                                  uploading: false,
                                },
                                () => console.log(this.state.likes),
                              );
                            } else {
                              this.setState(
                                {
                                  likes: [],
                                  uploading: false,
                                },
                                () => console.log(this.state.likes),
                              );
                            }
                          });
                      },
                    );
                  } else {
                    firebase
                      .database()
                      .ref('NEWDEV/users/' + this.state.user.uid + '/likes')
                      .once('value', snapshot => {
                        console.log(snapshot);
                        if (snapshot.val() && snapshot.val().lenght != 0) {
                          this.setState(
                            {
                              uploading: false,
                              likes: snapshot.val(),
                            },
                            () => console.log(this.state.likes),
                          );
                        } else {
                          this.setState(
                            {
                              likes: [],
                              uploading: false,
                            },
                            () => console.log(this.state.likes),
                          );
                        }
                      });
                  }
                });
            },
          );
        }
      });
    });
  }
  pushCommentaire() {
    this.setState({uploading: true}, () =>
      firebase
        .database()
        .ref('NEWDEV/comments/' + this.state.uid)
        .push({
          userUid: this.state.user.uid,
          commentText: this.state.commentaire,
          rating: this.state.star,
          userPseudo: this.state.user.pseudo,
          userImg: this.state.user.photoUrl,
        })
        .then(() => {
          this.setState({commentaire: '', star: 0, uploading: false});
        }),
    );
  }

  submitLike(type) {
    if (type === 1) {
      firebase
        .database()
        .ref('NEWDEV/users/' + this.state.user.uid)
        .update({
          likes: this.state.likes,
        })
        .then(() => {
          console.log('salat');
          if (this.state.spot.likesNumbers) {
            firebase
              .database()
              .ref('NEWDEV/spots/' + this.state.uid)
              .update({
                likesNumbers: this.state.spot.likesNumbers + 1,
              })
              .then(() => {
                console.log('salat');
                this.forceUpdate();
              });
          } else {
            firebase
              .database()
              .ref('NEWDEV/spots/' + this.state.uid)
              .update({
                likesNumbers: 1,
              })
              .then(() => {
                console.log('salat');
                this.forceUpdate();
              });
          }
        });
    } else if (type === 2) {
      firebase
        .database()
        .ref('NEWDEV/users/' + this.state.user.uid)
        .update({
          likes: [],
        })
        .then(() => {
          if (this.state.spot.likesNumbers > 1) {
            firebase
              .database()
              .ref('NEWDEV/spots/' + this.state.uid)
              .update({
                likesNumbers: this.state.spot.likesNumbers - 1,
              })
              .then(() => {
                console.log('salat');
                this.forceUpdate();
              });
          } else {
            firebase
              .database()
              .ref('NEWDEV/spots/' + this.state.uid)
              .update({
                likesNumbers: 0,
              })
              .then(() => {
                console.log('salat');
                this.forceUpdate();
              });
          }
        });
    }
  }
  likeSpot() {
    console.log(this.state.likes);
    console.log(this.state.likes.indexOf(this.state.uid));
    console.log(this.state.uid);
    if (this.state.likes.indexOf(this.state.uid) == -1) {
      let tab = [];
      tab = tab.concat(this.state.likes);
      console.log(JSON.stringify(tab) + 'hna');
      tab.push(this.state.uid);
      console.log(tab);
      this.setState({likes: tab}, () => {
        this.submitLike(1);
      });
    } else if (this.state.likes.indexOf(this.state.uid) != -1) {
      if (this.state.likes.length > 1) {
        let tab = [];
        tab = tab.concat(this.state.likes);
        console.log(JSON.stringify(tab) + 'hna');
        tab.splice(this.state.likes.indexOf(this.state.uid), 1);
        this.setState({likes: tab}, () => this.submitLike(1));
      } else {
        this.state.likes = [];
        this.submitLike(2);
      }
    }
  }

  PrendrePhoto(type) {
    if (type == 'galery') {
      ImagePicker.showImagePicker(this.state.options, response => {
        if (!response.didCancel) {
          this.state.spot.photos.splice(this.state.spot.photos.indexOf(''), 1);
          console.log(this.state.spot);
          const ext = response.uri.split('.').pop();
          this.setState({uploading: true});
          firebase
            .storage()
            .ref('gallery/spot/spot_' + uuidv4() + '.' + ext)
            .putFile(response.uri)
            .then(snapshot => {
              if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                console.log(snapshot);
                firebase
                  .storage()
                  .ref(snapshot.metadata.fullPath)
                  .getDownloadURL()
                  .then(res => {
                    this.state.spot.photos.push(res);
                    firebase
                      .database()
                      .ref('NEWDEV/spots/' + this.state.uid)
                      .update({
                        photos: this.state.spot.photos,
                      })
                      .then(() => {
                        this.state.spot.photos = [
                          ...this.state.spot.photos,
                          '',
                        ];
                        this.forceUpdate();
                        this.setState({uploading: false});
                      });
                  });
              }
            });
        }
      });
    }
  }
  deleteImage(index) {
    console.log(this.state.spot.photos.length);
    if (this.state.spot.photos.length > 2) {
      this.setState({uploading: true});
      this.state.spot.photos.splice(this.state.spot.photos.indexOf(''), 1);
      this.state.spot.photos.splice(index, 1);
      this.forceUpdate();
      firebase
        .database()
        .ref('NEWDEV/spots/' + this.state.uid)
        .update({
          photos: this.state.spot.photos,
        })
        .then(() => {
          this.state.spot.photos = [...this.state.spot.photos, ''];
          this.forceUpdate();
          this.setState({uploading: false});
        });
    } else {
      alert('un Spot doit au moin contenir une image');
    }
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    return (
      <Container style={styles.main}>
        <ScrollView>
          <View
            style={{
              height: Metrics.HEIGHT * 0.5,
              marginBottom: 30,
            }}>
            {!this.state.user.uid && !this.state.spot.uid ? (
              <View />
            ) : (
              <Swiper
                style={{
                  height: Metrics.HEIGHT * 0.5,
                  marginBottom: 30,
                }}
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
                {this.state.spot.photos.map((image, index) => {
                  if (image != '') {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                        }}
                        key={index}>
                        <SliderEntry
                          data={{illustration: image}}
                          parallax={false}
                          containerStyle={SliderEntryStyle.imageContainerI}
                          imageStyle={SliderEntryStyle.imageI}
                          imageContainer={SliderEntryStyle.imageContainerI}
                          type="Image"
                          deleteIcon={true}
                          onIconPress={() => this.deleteImage(index)}
                        />
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: Metrics.HEIGHT * 0.5,
                        }}
                        key={this.state.spot.length}>
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
                            style={{alignSelf: 'center', marginRight: 10}}
                          />
                          <Text style={styles.nextText}>
                            ADD NEW IMAGE {this.state.spot.photos.length}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
              </Swiper>
            )}
          </View>
          <View
            style={{
              paddingLeft: Metrics.WIDTH * 0.03,
              paddingRight: Metrics.WIDTH * 0.03,
              marginTop: Metrics.HEIGHT * 0.022,
              backgroundColor: '#ecedeb',
            }}>
            <Text
              style={{
                marginTop: Metrics.HEIGHT * 0.02,
              }}>
              {this.state.spot.adresse}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.charcoal,
              }}>
              {this.state.spot.ville}
            </Text>
            <View style={styles.ratingDateView2}>
              <View style={styles.ratingStar}>
                <Stars
                  half={true}
                  rating={this.state.star}
                  update={val => {
                    console.log('rating');
                    this.setState({star: val});
                  }}
                  spacing={4}
                  starSize={30}
                  count={5}
                  disabled={false}
                  fullStar={Images.starFilled1}
                  emptyStar={Images.starEmpty1}
                  halfStar={Images.starHalf1}
                />
              </View>
              <View style={styles.likeCommentShareView}>
                <View style={styles.shareView}>
                  <TouchableOpacity onPress={() => this.likeSpot()}>
                    {console.log('hna' + JSON.stringify(this.state.likes))}
                    {console.log('lhih' + JSON.stringify(this.state.uid))}
                    <FontAwesome
                      name="heart"
                      size={25}
                      color={
                        this.state.likes.indexOf(this.state.uid) != -1
                          ? '#fe0000'
                          : Colors.charcoal
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.commentView}>
                  <TouchableOpacity
                    onPress={() => console.log(this.state.likes)}>
                    <MaterialIcons name="share" size={30} color="#000" />
                  </TouchableOpacity>
                </View>
                {this.state.commentaire != '' ? (
                  <View style={styles.likeView}>
                    <TouchableOpacity onPress={() => this.pushCommentaire()}>
                      <FontAwesome
                        name="comment"
                        size={25}
                        color="rgb(57,90,255)"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
            <View style={styles.ratingBarView2}>
              <View style={styles.ratingTextBg2}>
                <Image
                  style={styles.ratingText2}
                  source={
                    this.state.user.photoUrl == '' || !this.state.user.photoUrl
                      ? require('./../../images/defautProfil.jpg')
                      : {uri: this.state.user.photoUrl}
                  }
                />
              </View>
              <View style={styles.ratingView}>
                <View style={styles.reviewerNameView2}>
                  <Input
                    placeholderTextColor="rgb(159,159,159)"
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                    placeholder="Rédiger un commentaire"
                    keyboardType="default"
                    style={styles.rowNameTxt}
                    onChange={value => {
                      this.setState({
                        commentaire: value.nativeEvent.text,
                      });
                    }}
                    value={this.state.commentaire}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.listMainView}>
            {this.state.commentes.map((item, index) => {
              return (
                <View
                  style={
                    index === this.state.commentes.length - 1
                      ? styles.lastRowBg
                      : styles.rowBg
                  }
                  key={index}>
                  <View style={styles.ratingBarView}>
                    <View style={styles.ratingTextBg}>
                      <Image
                        style={styles.ratingText}
                        source={
                          item[1].userImg == '' || !item[1].userImg
                            ? require('./../../images/defautProfil.jpg')
                            : {uri: item[1].userImg}
                        }
                      />
                    </View>
                    <View style={styles.ratingView}>
                      <View style={styles.reviewerNameView}>
                        <Text style={styles.rowNameTxt}>
                          {item[1].userPseudo}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.ratingDateView}>
                    <View style={styles.ratingStar}>
                      <Stars
                        half={true}
                        rating={item[1].rating}
                        spacing={4}
                        starSize={20}
                        count={5}
                        disabled={true}
                        fullStar={Images.starFilled1}
                        emptyStar={Images.starEmpty1}
                        halfStar={Images.starHalf1}
                      />
                    </View>
                  </View>
                  <Text style={styles.rowDescTxt}>{item[1].commentText}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
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
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(57,90,255)',
            width: 40,
            height: 40,
            position: 'absolute',
            top: 50,
            left: 50,
            elevation: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={() => this.props.navigation.goBack()}>
          <FontAwesome
            name="chevron-left"
            size={25}
            color={'#fff'}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
      </Container>
    );
  }
}
export default DetailsCommentsModal;

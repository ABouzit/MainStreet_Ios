import React, {Component} from 'react';
import {
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  ScrollView,
  I18nManager,
} from 'react-native';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Input,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'react-native-slider';
import styles from './ContainTabStyle';
import {Metrics} from '../../Themes/';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CommonActions} from '@react-navigation/native';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';
import MaterialTabs from 'react-native-material-tabs';
const activeindicator = 0;

const profileImageOne =
  'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';
const profileImageTwo =
  'https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine.png';
const profileImageThree =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_suggested_user_three_sone.png';
const profileImageFour =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png';
const postImageUri =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_post_sone.png';
const profileImageFive =
  'https://antiqueruby.aliansoftware.net//Images/social/people_five_soeighteen.png';
const profileImageSix =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_user_one_row_sone.png';
const profileImageSeven =
  'https://antiqueruby.aliansoftware.net//Images/social/comments_profile_foursnine.png';
const profileImageEight =
  'https://antiqueruby.aliansoftware.net//Images/social/people_eight_soeighteen.png';
const profileImageNine =
  'https://antiqueruby.aliansoftware.net//Images/social/people_nine_soeighteen.png';

export default class ContainTabRecherche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
      activeindicator: 0,
      selectedLots: [],
      filterOn: false,
      filterValue: 0,
      sliderValue: 0,
      dataPeople: [
        {
          id: 1,
          profileImage: {uri: profileImageOne},
          name: 'Johnie Cornwall',
          isSelected: true,
        },
        {
          id: 2,
          profileImage: {uri: profileImageTwo},
          name: 'Renaldo Rozman',
          isSelected: false,
        },
        {
          id: 3,
          profileImage: {uri: profileImageThree},
          name: 'Argelia Bee',
          isSelected: false,
        },
        {
          id: 4,
          profileImage: {uri: profileImageFour},
          name: 'Kimiko Hoyle',
          isSelected: false,
        },
        {
          id: 5,
          profileImage: {uri: profileImageFive},
          name: 'Elene Jeppesen',
          isSelected: false,
        },
        {
          id: 6,
          profileImage: {uri: profileImageSix},
          name: 'Lyndon Benavente',
          isSelected: false,
        },
        {
          id: 7,
          profileImage: {uri: profileImageSeven},
          name: 'Elfrieda Esser',
          isSelected: false,
        },
        {
          id: 8,
          profileImage: {uri: profileImageEight},
          name: 'Devin Newberg',
          isSelected: false,
        },
        {
          id: 9,
          profileImage: {uri: profileImageNine},
          name: 'Joey Gumm',
          isSelected: false,
        },
        {
          id: 10,
          profileImage: {uri: profileImageNine},
          name: 'Joey Gumm',
          isSelected: false,
        },
        {
          id: 11,
          profileImage: {uri: profileImageNine},
          name: 'Joey Gumm',
          isSelected: false,
        },
        {
          id: 12,
          profileImage: {uri: profileImageNine},
          name: 'Joey Gumm',
          isSelected: false,
        },
      ],
    };
  }
  onSelected(id) {
    let tmp = this.state.selectedLots;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }

    this.setState({selectedLots: tmp});
  }
  multiSliderValuesChange = values => {
    this.setState({multiSliderPrice: values});
  };
  _renderItem = ({item}) => (
    <TouchableOpacity
      style={
        this.state.selectedLots.includes(item.id)
          ? [styles.txtBg, styles.selectedButton]
          : [styles.txtBg, {backgroundColor: 'white'}]
      }
      onPress={() => this.onSelected(item.id)}>
      <Text
        style={
          this.state.selectedLots.includes(item.id)
            ? [styles.musicname, {color: 'black'}]
            : [styles.musicname, {color: 'black', backgroundColor: 'white'}]
        }>
        {' '}
        {item.musicname}
      </Text>
    </TouchableOpacity>
  );
  onSlidingChange(value) {
    this.setState({sliderValue: value});
  }
  _fnChangeItem(listId) {
    // const newArray = this.state.data;

    for (var i = 0; i < this.state.dataPeople.length; i++) {
      if (this.state.dataPeople[i].id == listId) {
        // alert(listId + ' prag ' +this.state.data[i].id)
        const newArray1 = [];

        for (i = 0; i < this.state.dataPeople.length; i++) {
          if (this.state.dataPeople[i].id == listId) {
            newArray1.push({
              id: this.state.dataPeople[i].id,
              profileImage: this.state.dataPeople[i].profileImage,
              name: this.state.dataPeople[i].name,
              isSelected: !this.state.dataPeople[i].isSelected,
            });
          } else {
            newArray1.push({
              id: this.state.dataPeople[i].id,
              profileImage: this.state.dataPeople[i].profileImage,
              name: this.state.dataPeople[i].name,
              isSelected: this.state.dataPeople[i].isSelected,
            });
          }
        }

        this.setState({dataPeople: newArray1});
        console.log('pragnesh');
        console.log(newArray1);
      }
    }
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    var appData = [
      {
        id: 1,
        musicname: 'POP MUSIC',
      },
      {
        id: 2,
        musicname: 'BLUES ',
      },
      {
        id: 3,
        musicname: 'HIP HOP',
      },
      {
        id: 4,
        musicname: 'JAZZ',
      },
      {
        id: 5,
        musicname: 'ROCK & ROLL',
      },
      {
        id: 6,
        musicname: 'PUNK ROCK',
      },
      {
        id: 7,
        musicname: 'FOLK',
      },
      {
        id: 8,
        musicname: 'ALTERNATIVE ROCK',
      },
      {
        id: 9,
        musicname: 'DANCE',
      },
      {
        id: 10,
        musicname: 'HEAVY METAL',
      },
      {
        id: 11,
        musicname: 'REGGAE',
      },
      {
        id: 12,
        musicname: 'DISCO',
      },
      {
        id: 13,
        musicname: 'TECHNO',
      },
      {
        id: 14,
        musicname: 'INSTRUMENTAL',
      },
    ];
    let swiperImage =
      'https://ridersincorporated.e-monsite.com/medias/album/20190831-151513.jpg';
    var data = [
      {
        id: 1,
        illustration: swiperImage,
        ville: 'Rabat',
        distance: 3,
        nom: 'Lorem ipsum dolor ',
        sports: ['BMX', 'SKATEBOARD', 'ROLLER'],
        diponiblite: 'ANYTIME',
      },
      {
        id: 2,
        name: 'Calandra Herwig',
        illustration: postImageUri,
        distance: 12,
        ville: 'Guadaplupe',
        nom: 'Lorem ipsum dolor ',
        sports: ['BMX', 'SKATEBOARD', 'ROLLER'],
        diponiblite: 'ANYTIME',
      },
      {
        id: 3,
        name: 'Calandra Herwig',
        illustration: postImageUri,
        distance: 12,
        ville: 'Guadaplupe',
        nom: 'Lorem ipsum dolor ',
        sports: ['BMX', 'SKATEBOARD', 'ROLLER'],
        diponiblite: 'ANYTIME',
      },
    ];

    return (
      <View style={styles.container}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => {
                this.props.navigation.dispatch(CommonActions.goBack());
                console.log(JSON.stringify(this.props.navigation));
              }}>
              <View style={styles.backView}>
                <FontAwesome
                  name="angle-left"
                  type="FontAwesome"
                  size={40}
                  color="black"
                  style={styles.arrow}
                />
                <Text style={styles.back}>back</Text>
              </View>
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <View style={{flexDirection: 'row'}}>
              <Input
                placeholderTextColor="rgb(159,159,159)"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                placeholder="Search sports or people"
                keyboardType="default"
                style={styles.inputRecherche}
              />
              {this.state.filterValue === 0 ? (
                <TouchableOpacity
                  style={{justifyContent: 'center'}}
                  onPress={() =>
                    this.setState({filterOn: !this.state.filterOn})
                  }>
                  <MaterialIcons
                    name="filter-list"
                    size={30}
                    color="#000"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
          </Body>
        </Header>
        {this.state.filterOn && this.state.filterValue === 0 ? (
          <View />
        ) : (
          <View
            style={{
              position: 'absolute',
              top: Metrics.HEIGHT * 0.13,
              zIndex: 500,
              width: Metrics.WIDTH,
              backgroundColor: 'white',
              marginTop: -10,
              height: Metrics.HEIGHT * 0.07,
              justifyContent: 'flex-end',
            }}>
            <MaterialTabs
              items={['Trips', 'People']}
              selectedIndex={this.state.filterValue}
              onChange={index => {
                this.setState({filterValue: index});
                if (this.state.filterValue === 1) {
                  this.setState({filterOn: false});
                }
              }}
              barColor="transparent"
              indicatorColor="rgb(57,90,255)"
              activeTextColor="#000"
              inactiveTextColor="#959595"
              uppercase={false}
            />
            <View
              style={{
                height: 3,
                width: Metrics.WIDTH,
                backgroundColor: 'rgb(0,0,0)',
                opacity: 0.04,
              }}
            />
          </View>
        )}
        <Container style={styles.container}>
          {this.state.filterOn && this.state.filterValue === 0 ? (
            <View
              style={{
                position: 'absolute',
                top: Metrics.HEIGHT * 0,
                zIndex: 1000,
                width: Metrics.WIDTH,
                backgroundColor: 'white',
                marginTop: -10,
                height: Metrics.HEIGHT * 0.15,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View style={styles.distance}>
                <Text style={styles.distanceText}>Distance</Text>
                <Text style={styles.distanceText}>jusqu'à 10Km</Text>
              </View>

              <View>
                <LinearGradient
                  colors={[
                    'rgb(58,90,253)',
                    'rgb(128,84,143)',
                    'rgb(219,80,83)',
                  ]}
                  style={styles.linearGradient}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                />
                <Slider
                  minimumValue={0}
                  maximumValue={10}
                  onValueChange={this.onSlidingChange.bind(this)}
                  style={styles.slider}
                  trackStyle={styles.sliderTrack}
                  thumbTintColor={'rgb(57,90,255)'}
                  thumbStyle={{width: 20, height: 20}}
                  value={this.state.sliderValue}
                  minimumTrackTintColor={'transparent'}
                  maximumTrackTintColor={'transparent'}
                  onSlidingStart={() => console.log('slide')}
                />
              </View>
              <View
                style={{
                  height: 3,
                  width: Metrics.WIDTH,
                  backgroundColor: 'rgb(0,0,0)',
                  opacity: 0.04,
                }}
              />
            </View>
          ) : (
            <View />
          )}
          {this.state.filterValue === 0 ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              onScrollBeginDrag={() => console.log('scroll')}>
              <View style={{alignItems: 'center', paddingBottom: 50}}>
                <View
                  style={styles.rowMainView}
                  animation="bounceInLeft"
                  duration={1100}
                  delay={1400}>
                  {data.map((item, index) => {
                    console.log(item);
                    return (
                      <SliderEntry
                        data={item}
                        containerStyle={SliderEntryStyle.imageContainer}
                        imageStyle={SliderEntryStyle.image}
                        imageContainer={
                          SliderEntryStyle.imageContainerRecherche
                        }
                        slideInnerContainer={
                          SliderEntryStyle.slideInnerContainerRecherche
                        }
                        textContainer={SliderEntryStyle.textContainerRecherche}
                        type={'Recherche'}
                      />
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              onScrollBeginDrag={() => console.log('scroll')}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={[
                    styles.listMainView,
                    {marginTop: Metrics.HEIGHT * 0.05},
                  ]}
                  animation="zoomInDown"
                  duration={1100}
                  delay={1400}>
                  {this.state.dataPeople.map((item, index) => {
                    return (
                      <View style={styles.rowBg2} key={index}>
                        <View style={styles.rowView}>
                          <Image
                            source={item.profileImage}
                            style={styles.profileImg2}
                          />
                          <View style={styles.namePostView}>
                            <Text style={styles.rowNameTxt2}>{item.name}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              width: Metrics.WIDTH * 0.21,
                            }}>
                            {item.isSelected === true ? (
                              <TouchableOpacity
                                style={styles.followBgSelected}
                                onPress={() => this._fnChangeItem(item.id)}>
                                <MaterialIcons
                                  name="done"
                                  size={25}
                                  color="white"
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                style={styles.followBgNotSelected}
                                onPress={() => this._fnChangeItem(item.id)}>
                                <Text style={styles.followTxtNotSelected}>
                                  Follow
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          )}
        </Container>
      </View>
    );
  }
}
{
  /*
                    <View style={styles.rowBg} key={index}>
                      <View>
                        <Image
                          style={styles.postDescImage}
                          source={item.postImage}
                        />
                        <TouchableOpacity
                          style={styles.buttonImage}
                          onPress={() => alert('Comment')}>
                          <Text
                            style={[
                              styles.buttonText,
                              {fontSize: 15, fontWeight: 'bold'},
                            ]}>
                            GO NOW
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.villeView}>
                          <Text style={styles.villeText}>{item.ville}</Text>
                        </View>
                        <View style={styles.distanceView}>
                          <Text style={styles.distanceText2}>
                            Á {item.distance} Km
                          </Text>
                        </View>
                      </View>
                      <View style={styles.rowDescriptionView}>
                        <Text style={styles.rowDescTxt}>
                          {item.description}
                        </Text>
                      </View>
                      <View style={styles.dividerHorizontal} />
                      <View style={styles.likeCommentShareView}>
                        <View style={styles.likeView}>
                          <TouchableOpacity onPress={() => alert('Like')}>
                            <FontAwesome
                              name="heart"
                              size={25}
                              color="#fe0000"
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.shareView}>
                          <TouchableOpacity onPress={() => alert('Share')}>
                            <MaterialIcons
                              name="share"
                              size={30}
                              color="#000"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );*/
}

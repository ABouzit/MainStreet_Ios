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
import styles from './styles';
import {View} from 'react-native-animatable';
import Stars from 'react-native-stars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {withNavigation} from 'react-navigation';
import {Images, Metrics} from './../../Themes';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';

import Swiper from 'react-native-swiper';
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
      that.props.navigation.navigate('ContainTabProfile');
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    var that = this;
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
    let data2 = [swiperImage, spotImag1, swiperImage];
    var data = [
      {
        id: 1,
        rating: 4.0,
        name: 'Clifton Michell',
        date: 'April 28,2016',
        post: '"Good jobs, Will hire again"',
        profileImage: {uri: profileImageThree},
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        rating: 5.0,
        name: 'Wenona Nall',
        date: 'April 22,2016',
        profileImage: {uri: profileImageFour},
        post: '"Good jobs, Will hire again"',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 3,
        rating: 4.5,
        name: 'Nenita Timothy',
        date: 'April 15,2016',
        profileImage: {uri: profileImageFive},
        post: '"Good jobs, Will hire again"',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 4,
        rating: 4.0,
        name: 'Clifton Michell',
        date: 'April 28,2016',
        post: '"Good jobs, Will hire again"',
        profileImage: {uri: profileImageSix},
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ];
    data2.push({});
    return (
      <Container style={styles.main}>
        <Content>
          <View
            style={{
              height: Metrics.HEIGHT * 0.5,
              marginBottom: 30,
            }}>
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
              activeDot={<View style={styles.activeDot} />}
              dot={<View style={styles.dot} />}
              onIndexChanged={index => this.setState({index})}>
              {data2.map((image, index) => {
                if (image.illustration) {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                      }}
                      key={index}>
                      <SliderEntry
                        data={image}
                        parallax={false}
                        containerStyle={SliderEntryStyle.imageContainerI}
                        imageStyle={SliderEntryStyle.imageI}
                        imageContainer={SliderEntryStyle.imageContainerI}
                        type="Image"
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
                      key={data2.length}>
                      <TouchableOpacity
                        onPress={() => this.refs.swiperSlide.scrollBy(-1)}
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
                        <Text style={styles.nextText}>
                          ADD NEW IMAGE {data2.length + 1}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
            </Swiper>
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor
            </Text>
            <View style={styles.ratingDateView2}>
              <View style={styles.ratingStar}>
                <Stars
                  half={true}
                  rating={3}
                  update={val => {
                    this.setState({stars: val});
                  }}
                  spacing={4}
                  starSize={30}
                  count={5}
                  disabled={true}
                  fullStar={Images.starFilled1}
                  emptyStar={Images.starEmpty1}
                  halfStar={Images.starHalf1}
                />
              </View>
              <View style={styles.likeCommentShareView}>
                <View style={styles.likeView}>
                  <TouchableOpacity onPress={() => alert('Like')}>
                    <FontAwesome name="heart" size={25} color="#fe0000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.shareView}>
                  <TouchableOpacity onPress={() => alert('Share')}>
                    <MaterialIcons name="share" size={30} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.ratingBarView2}>
              <View style={styles.ratingTextBg2}>
                <Image
                  style={styles.ratingText2}
                  source={data[1].profileImage}
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
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.listMainView}>
            {data.map((item, index) => {
              return (
                <View
                  style={
                    index === data.length - 1 ? styles.lastRowBg : styles.rowBg
                  }
                  key={index}>
                  <View style={styles.ratingBarView}>
                    <View style={styles.ratingTextBg}>
                      <Image
                        style={styles.ratingText}
                        source={item.profileImage}
                      />
                    </View>
                    <View style={styles.ratingView}>
                      <View style={styles.reviewerNameView}>
                        <Text style={styles.rowNameTxt}>{item.name}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.ratingDateView}>
                    <View style={styles.ratingStar}>
                      <Stars
                        half={true}
                        rating={item.rating}
                        update={val => {
                          this.setState({stars: val});
                        }}
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
                  <Text style={styles.rowDescTxt}>{item.description}</Text>
                </View>
              );
            })}
          </View>
        </Content>
      </Container>
    );
  }
}
export default DetailsCommentsModal;

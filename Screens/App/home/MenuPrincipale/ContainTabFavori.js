import React, {Component} from 'react';
import {
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {Container, Header, Body, Left} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CommonActions} from '@react-navigation/native';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';
import styles from './ContainTabStyle';
import Swiper from 'react-native-swiper';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import {ApplicationStyles, Metrics} from '../../Themes';
const activeindicator = 0;
const postImageUri =
  'https://antiqueruby.aliansoftware.net//Images/social/ic_post_sone.png';
export default class ContainTabFavori extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      index: '',
      activeindicator: 0,
      indexSlider: '',
    };
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
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
    const profileImageOne =
      'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';
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
    let dataPeople = [
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
    ];
    return (
      <View style={styles.container}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => {
                this.props.navigation.dispatch(CommonActions.goBack());
                console.log(this.props) 
                this.props.console(
                /* this.props.navigation.dangerouslyGetState().routes[
                    this.props.navigation.dangerouslyGetState().routes.length -
                    1
                  ].name,
                */);
                // this.props.changeBottomTabIndex
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
            <Text style={{fontWeight: 'bold'}}>Favorie</Text>
          </Body>
        </Header>
        <Container style={{height: Metrics.HEIGHT * 0.83}}>
          <View style={{alignItems: 'center', paddingBottom: 50}}>
            <Text
              style={{
                fontSize: 25,
                width: Metrics.WIDTH * 0.9,
                fontWeight: 'bold',
                textAlign: 'left',
              }}>
              PUBLISHERS
            </Text>
            <FlatList
              contentContainerStyle={styles.listContent2}
              data={dataPeople}
              keyExtractor={dataPeople => dataPeople.id}
              renderItem={({item}) => (
                <View style={{width: Metrics.WIDTH * 0.2, marginLeft: 5}}>
                  <Image
                    source={item.profileImage}
                    style={[styles.profileImg3]}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: Metrics.HEIGHT * 0.005,
                    }}>
                    {item.name.substr(0, item.name.indexOf(' '))}
                  </Text>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Text
              style={{
                fontSize: 25,
                width: Metrics.WIDTH * 0.9,
                fontWeight: 'bold',
                textAlign: 'left',
              }}>
              FAVORITE SPORTS
            </Text>
            <View style={[styles.rowMainView, {height: Metrics.HEIGHT * 0.51}]}>
              <Swiper
                showsButtons={false}
                autoplay={false}
                loop={false}
                ref="swiperSlide"
                index={this.state.indexSlider}
                paginationStyle={{
                  position: 'absolute',
                  bottom: -(Metrics.HEIGHT * 0.1),
                }}
                activeDot={<View style={styles.activeDot2} />}
                dot={<View style={styles.dot2} />}
                onIndexChanged={index => this.setState({indexSlider: index})}
                scrollEnabled={true}>
                {data.map((item, index) => {
                  console.log(item);
                  return (
                    <View key={index}>
                      <SliderEntry
                        data={item}
                        containerStyle={SliderEntryStyle.imageContainer}
                        imageStyle={SliderEntryStyle.image}
                        imageContainer={SliderEntryStyle.imageContainerFavorite}
                        slideInnerContainer={
                          SliderEntryStyle.slideInnerContainerFavorite
                        }
                        textContainer={SliderEntryStyle.textContainerRecherche}
                        type={'Recherche'}
                      />
                    </View>
                  );
                })}
              </Swiper>
            </View>
          </View>
        </Container>
      </View>
    );
  }
}

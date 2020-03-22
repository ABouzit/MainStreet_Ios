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
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './ContainTabStyle';
import {ApplicationStyles, Metrics} from '../../Themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';
const activeindicator = 0;

export default class ContainTabNewSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
      activeindicator: 0,
      indexSlider: '',
      LocationValue: '',
      selectedSportLots: [],
      selectedTranLots: [],
      selectedTimeLots: [],
    };
  }
  onSelectedTime(id) {
    let tmp = this.state.selectedTimeLots;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }

    this.setState({selectedTimeLots: tmp});
  }
  onSelectedSport(id) {
    let tmp = this.state.selectedSportLots;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }

    this.setState({selectedSportLots: tmp});
  }
  onSelectedTran(id) {
    let tmp = this.state.selectedTranLots;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }

    this.setState({selectedTranLots: tmp});
  }
  _renderSportItem = ({item}) => (
    <TouchableOpacity
      style={
        this.state.selectedSportLots.includes(item.id)
          ? [styles.txtBg, styles.selectedButton]
          : [styles.txtBg, {backgroundColor: 'white'}]
      }
      onPress={() => this.onSelectedSport(item.id)}>
      <Text
        style={
          this.state.selectedSportLots.includes(item.id)
            ? [styles.musicname, {color: '#fff'}]
            : [styles.musicname, {color: '#131e7e'}]
        }>
        {' '}
        {item.musicname}
      </Text>
    </TouchableOpacity>
  );
  _renderTranItem = ({item}) => (
    <TouchableOpacity
      style={
        this.state.selectedTranLots.includes(item.id)
          ? [styles.txtBg, styles.selectedButton]
          : [styles.txtBg, {backgroundColor: 'white'}]
      }
      onPress={() => this.onSelectedTran(item.id)}>
      <Text
        style={
          this.state.selectedTranLots.includes(item.id)
            ? [styles.musicname, {color: '#fff'}]
            : [styles.musicname, {color: '#131e7e'}]
        }>
        {' '}
        {item.musicname}
      </Text>
    </TouchableOpacity>
  );
  _renderTimeItem = ({item}) => (
    <TouchableOpacity
      style={
        this.state.selectedTimeLots.includes(item.id)
          ? [styles.txtBg, styles.selectedButton]
          : [styles.txtBg, {backgroundColor: 'white'}]
      }
      onPress={() => this.onSelectedTime(item.id)}>
      <Text
        style={
          this.state.selectedTimeLots.includes(item.id)
            ? [styles.musicname, {color: '#fff'}]
            : [styles.musicname, {color: '#131e7e'}]
        }>
        {' '}
        {item.musicname}
      </Text>
    </TouchableOpacity>
  );

  render() {
    StatusBar.setBarStyle('light-content', true);
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
    return (
      <ImageBackground
        source={pic.uri}
        style={[styles.screenBg, ApplicationStyles.backgroundImage]}>
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
            <Text>NewSpot</Text>
          </Body>
        </Header>
        <View style={{height: Metrics.HEIGHT * 0.83}}>
          <Swiper
            showsButtons={false}
            autoplay={false}
            loop={false}
            ref="swiperSlide"
            index={this.state.indexSlider}
            activeDot={<View />}
            dot={<View />}
            onIndexChanged={index => this.setState({indexSlider: index})}
            scrollEnabled={false}>
            <View key={1} style={styles.slide}>
              <View
                style={[
                  SliderEntryStyle.imageContainerI,
                  {position: 'relative'},
                ]}>
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
                  activeDot={<View style={styles.activeDot} />}
                  dot={<View style={styles.dot} />}
                  onIndexChanged={index => this.setState({index})}>
                  {data2.map((image, index) => {
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
                          imageStyle={SliderEntryStyle.image}
                          imageContainer={SliderEntryStyle.imageContainerI}
                          type="Image"
                        />
                      </View>
                    );
                  })}
                </Swiper>

                <TouchableOpacity
                  onPress={() => this.refs.swiper.scrollBy(1)}
                  style={{
                    backgroundColor: 'rgb(49,49,49)',
                    position: 'absolute',
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    bottom: -25,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <AntDesign
                    name="plus"
                    size={25}
                    color="#fff"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.headertext}>add a spot</Text>
              <Text style={styles.desctext}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <View style={styles.btnsec}>
                <TouchableOpacity
                  onPress={() => this.refs.swiperSlide.scrollBy(1)}
                  style={styles.nextBotton}>
                  <Text style={styles.nextText}>NEXT</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View key={2} style={styles.slide}>
              <View style={styles.slide2}>
                <Item underline style={styles.itememail}>
                  {this.state.LocationValue === '' ? (
                    <Ionicons
                      active
                      name="md-pin"
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
                    placeholder="Tappez l'adresse du spot"
                    keyboardType="default"
                    style={styles.inputemail}
                    onChangeText={LocationValue =>
                      this.setState({LocationValue})
                    }
                    value={this.state.LocationValue}
                  />
                </Item>
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
              </View>
              <View style={styles.btnsec}>
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
                  <Text style={styles.nextText}>ADD NEW IMAGE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.refs.swiperSlide.scrollBy(1)}
                  style={styles.publishBotton}>
                  <Text style={styles.nextText}>PUBLISH</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>
        </View>
      </ImageBackground>
    );
  }
}

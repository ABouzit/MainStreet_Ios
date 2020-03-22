import React, {Component} from 'react';
import {
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
import {Container} from 'native-base';
import {Metrics} from '../../Themes/';

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import styles from './ContainTabStyle';
import Geolocation from '@react-native-community/geolocation';
import RetroMapStyles from './../../../../RetroMapStyles.json';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './../Components/SliderParallalax/SliderEntry';
import SliderEntryStyle from './../Components/SliderParallalax/SliderEntryStyle';

let swiperImage =
  'https://ridersincorporated.e-monsite.com/medias/album/20190831-151513.jpg';
const activeindicator = 0;
const ASPECT_RATIO = Metrics.WIDTH / (Metrics.HEIGHT * 0.83);
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var data = [
  {
    id: 1,
    illustration: swiperImage,
    ville: 'Goadaloupe',
    distance: 1513,
    nom: 'Lorem ipsum dolor ',
    sports: ['BMX', 'SKATEBOARD', 'ROLLER'],
    diponiblite: 'ANYTIME',
    region: {
      latitude: 35.02074825,
      longitude: -6.833441528,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  },
  {
    id: 2,
    illustration: swiperImage,
    ville: 'Roma',
    distance: 713,
    nom: 'Lorem ipsum dolor ',
    sports: ['BMX', 'SKATEBOARD', 'ROLLER'],
    diponiblite: 'ANYTIME',
    region: {
      latitude: 34.020742153,
      longitude: -6.8534423625,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  },
  {
    id: 3,
    illustration: swiperImage,
    ville: 'Rabat',
    distance: 3,
    nom: 'Lorem ipsum dolor ',
    sports: ['BMX', 'SKATEBOARD', 'ROLLER'],
    diponiblite: 'ANYTIME',
    region: {
      latitude: 34.020743852,
      longitude: -6.833942625,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  },
  {
    id: 4,
    illustration: swiperImage,
    ville: 'Casa blanca',
    distance: 93,
    nom: 'Lorem ipsum dolor ',
    sports: ['BMX', 'SKATEBOARD', 'ROLLER'],
    diponiblite: 'ANYTIME',
    region: {
      latitude: 34.02074325,
      longitude: -6.833446528,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  },
];
export default class ContainTabMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
      activeindicator: 0,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      ownerPosition: {latitude: LATITUDE, longitude: LONGITUDE},
      slider1ActiveSlide: 0,
    };
  }

  functionAnimate(item) {
    if (Platform.OS === 'android') {
      if (this.map) {
        this.marker._component.animateMarkerToCoordinate(item.region, 500);
        setTimeout(() => {
          this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
        }, 501);
      }
    } else {
      new AnimatedRegion(this.state.ownerPosition).timing(item.region).start();
    }
  }
  _renderItem({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        containerStyle={SliderEntryStyle.imageContainer}
        imageStyle={SliderEntryStyle.image}
        imageContainer={SliderEntryStyle.imageContainer}
        slideInnerContainer={SliderEntryStyle.slideInnerContainer}
        textContainer={SliderEntryStyle.textContainer}
        //  onButtonClick={this.functionAnimate(item)}
      />
    );
  }
  componentWillMount() {
    Geolocation.clearWatch(this.watchID);
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            ownerPosition: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            region: data[0].region,
          },
          () => console.log('hnar'),
        );
      },
      error => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );

    this.watchID = Geolocation.watchPosition(position => {
      this.setState(
        {
          ownerPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          region: data[0].region,
        },
        () => {
          console.log(this.state.region);
          console.log(data[0].region);
          if (Platform.OS === 'android') {
            if (this.map) {
              this.marker2._component.animateMarkerToCoordinate(
                this.state.ownerPosition,
                500,
              );
              this.marker._component.animateMarkerToCoordinate(
                this.state.region,
                500,
              );
              setTimeout(() => {
                this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
              }, 501);
            }
          } else {
            new AnimatedRegion(this.state.ownerPosition)
              .timing(this.state.ownerPosition)
              .start();
          }
        },
      );
    });
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.containerMap}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={RetroMapStyles}
          minZoomLevel={2}
          maxZoomLevel={20}
          rotateEnabled={false}
          pitchEnabled={false}
          showsUserLocation={true}
          moveOnMarkerPress={true}>
          <Marker.Animated
            identifier={'marker1'}
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.region}
          />
          <Marker.Animated
            identifier={'marker2'}
            ref={marker2 => {
              this.marker2 = marker2;
            }}
            pinColor="green"
            coordinate={this.state.ownerPosition}
          />
        </MapView>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={data}
            renderItem={this._renderItem}
            sliderWidth={Metrics.WIDTH}
            itemWidth={Metrics.WIDTH}
            hasParallaxImages={true}
            firstItem={this.state.slider1ActiveSlide}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            containerCustomStyle={styles.carousel}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loop={false}
            loopClonesPerSide={2}
            onSnapToItem={index => {
              this.setState({slider1ActiveSlide: index}, () =>
                this.functionAnimate(data[index]),
              );
            }}
          />
        </View>
      </Container>
    );
  }
}

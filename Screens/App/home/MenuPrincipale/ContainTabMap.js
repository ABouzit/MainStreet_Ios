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
import axios from 'axios';
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
class ContainTabMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
      activeindicator: 0,
      region: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      ownerPosition: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      slider1ActiveSlide: 0,
    };
    console.log('position');
    this.initPositions();
  }

  functionAnimate(item, index) {
    if (index == 1) {
      if (Platform.OS === 'android') {
        if (this.map) {
          this.marker._component.animateMarkerToCoordinate(item, 500);
          if (this.map) {
            setTimeout(() => {
              console.log('//');
              this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
            }, 501);
          }
        }
      } else {
        this.state.region.timing(item, 500).start();
        if (this.map) {
          setTimeout(() => {
            this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
          }, 501);
        }
      }
    } else {
      if (Platform.OS === 'android') {
        if (this.map) {
          this.marker2._component.animateMarkerToCoordinate(item, 500);
          if (this.map) {
            setTimeout(() => {
              this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
            }, 501);
          }
        }
      } else {
        this.state.ownerPosition.timing(item, 500).start();
        if (this.map) {
          setTimeout(() => {
            this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
          }, 501);
        }
      }
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

  initPositions() {
    console.log('init');
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.functionAnimate(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          2,
        );
        this.functionAnimate(data[0].region, 1);
        if (this.map) {
          setTimeout(() => {
            this.map.fitToSuppliedMarkers(['marker1', 'marker2'], true);
          }, 501);
        }
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
        console.log('init2');
        console.log(position);
        this.functionAnimate(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          2,
        );
        this.functionAnimate(data[0].region, 1);
      },
      error => console.log('//' + error.message),
      {
        enableHighAccuracy: true,
        timeout: 200000,
        maximumAge: 1000,
      },
    );
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.containerMap}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          ref={map => {
            this.map = map;
          }}
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
            pinColor="transparent"
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
                this.functionAnimate(data[index].region, 1),
              );
            }}
          />
        </View>
      </Container>
    );
  }
}
export default ContainTabMap;

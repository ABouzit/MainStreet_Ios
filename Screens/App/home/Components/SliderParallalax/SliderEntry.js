import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from './SliderEntryStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Metrics} from '../../../Themes';
export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    imageContainer: PropTypes.object,
    containerStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    slideInnerContainer: PropTypes.object,
    textContainer: PropTypes.object,
    type: PropTypes.string,
    onButtonClick: PropTypes.func,
  };

  get image() {
    const {
      data: {illustration},
      parallax,
      parallaxProps,
      containerStyle,
      imageStyle,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{uri: illustration}}
        containerStyle={containerStyle}
        //containerStyle={[styles.imageContainer, even ? {} : {}]}
        style={imageStyle}
        //style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{uri: illustration}}
        //style={styles.image}
        style={imageStyle}
      />
    );
  }

  render() {
    const {
      data: {distance, nom, ville, sports, diponiblite},
      even,
      imageContainer,
      slideInnerContainer,
      onButtonClick,
      textContainer,
      type,
    } = this.props;
    if (type === 'Image') {
      return (
        <View
          //style={[styles.imageContainer, even ? {} : {}]}
          style={imageContainer}>
          {this.image}
          <View style={[styles.radiusMask, even ? {} : {}]} />
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={1}
          // style={styles.slideInnerContainer}
          style={slideInnerContainer}
          onPress={() => {
            alert(`You've clicked '${ville}'`);
          }}>
          <View style={styles.shadow} />
          <View
            //style={[styles.imageContainer, even ? {} : {}]}
            style={imageContainer}>
            {this.image}
            <View style={[styles.radiusMask, even ? {} : {}]} />
          </View>
          <View style={textContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.viewDescVille}>
                <Text
                  style={styles.description}
                  ellipsizeMode="head"
                  numberOfLines={1}>
                  {nom} -
                </Text>
                <Text style={styles.ville}> {ville}</Text>
              </View>

              <Text style={styles.distance}>{distance} Km</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 13}}>
                {sports.map((item, index) => {
                  if (index === 0) {
                    return item;
                  } else {
                    return ' / ' + item;
                  }
                })}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 13}}>
                {diponiblite}
              </Text>
            </View>
          </View>
          {type === 'Recherche' ? (
            <TouchableOpacity
              style={{
                bottom: 70,
                alignSelf: 'flex-end',
                marginVertical: 15,
                marginHorizontal: 30,
              }}
              onPress={() => alert('map')}>
              <MaterialIcons name="share" size={30} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                bottom: 70,
                alignSelf: 'flex-end',
                marginVertical: 15,
                marginHorizontal: 30,
              }}
              onPress={onButtonClick}>
              <FontAwesome5
                name="directions"
                size={30}
                color="#fff"
                style={{}}
              />
            </TouchableOpacity>
          )}
          {type === 'Recherche' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: -50,
                height: 100,
                width: 100,
                borderRadius: 50,
                backgroundColor: 'rgb(254,213,0)',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',

                elevation: 4,
              }}
              onPress={() => onButtonClick}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>LET'S GO</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </TouchableOpacity>
      );
    }
  }
}

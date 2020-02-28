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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// Screen Styles
import styles from './styles';

export default class PrendrePhoto extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.navigate('Home');
      return true;
    });
  }

  onClick(data) {
    data.checked = !data.checked;
    data.checked ? 'you checked ' : 'you unchecked ';
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate('Home')}>
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
            <Text style={styles.textTitle} />
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity
              info
              onPress={() => this.props.navigation.navigate('SignupPage')}>
              <Text style={styles.textTitle}>Sign up</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.Container}>
          <View style={styles.imagesPicker}>
            <View style={styles.proimg}>
              <Image
                style={styles.profileImgs}
                source={require('./../../images/defautProfil.jpg')}
              />
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={() => alert('Edit Profile Picture')}>
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
                  onPress={() => alert('Sign In')}>
                  <Text autoCapitalize="words" style={styles.btnText}>
                    Prendre la photo
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  info
                  style={styles.buttonlogin}
                  onPress={() => alert('Sign Up')}>
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
      </Container>
    );
  }
}

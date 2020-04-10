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
import {Container, Right, Item, Input, Header, Left, Body} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// Screen Styles
import styles from './styles';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordNotVisible: true,
    };
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
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    const imageUri =
      'https://antiqueruby.aliansoftware.net/Images/signin/image_bg_signin_eight.jpg';
    let logo13 = {
      uri:
        'https://antiqueruby.aliansoftware.net/Images/signin/ic_logo_mountifysthirteen.png',
    };
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
        <View>
          <View style={styles.inputFieldSec}>
            <Item underline style={styles.itememail}>
              <Input
                placeholderTextColor="#000"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                placeholder="Email"
                keyboardType="email-address"
                style={styles.inputemail}
              />
            </Item>
            <View>
              <Item underline style={styles.itempassword}>
                <Input
                  placeholderTextColor="#000"
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  placeholder="Password"
                  secureTextEntry={this.state.passwordNotVisible}
                  style={styles.inputpassword}
                />
              </Item>
              <TouchableOpacity
                info
                style={styles.btnMdpVisible}
                onPress={() => {
                  if (this.state.passwordNotVisible === true) {
                    this.setState({passwordNotVisible: false});
                  } else {
                    this.setState({passwordNotVisible: true});
                  }
                }}>
                <FontAwesome5
                  name={this.state.passwordNotVisible ? 'eye' : 'eye-slash'}
                  type="FontAwesome"
                  size={25}
                  color="black"
                  style={styles.arrow}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.signInSec}>
          <TouchableOpacity
            info
            style={styles.buttondialogsignup}
            onPress={() => alert('Sign In')}>
            <Text autoCapitalize="words" style={styles.buttonsignin}>
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

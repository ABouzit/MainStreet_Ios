import React, {Component} from 'react';
import {
  TouchableHighlight,
  Modal,
  ImageBackground,
  Image,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  ListView,
  ScrollView,
} from 'react-native';
import {
  Text,
  Form,
  Item,
  Input,
  Body,
  Header,
  Left,
  Right,
  Container,
  Content,
  DatePicker,
  Icon,
  Switch,
} from 'native-base';
// Screen Styles
import SwitchToggle from 'react-native-switch-toggle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ApplicationStyles, Metrics, Fonts} from '../../Themes';
import MaterialTabs from 'react-native-material-tabs';
import styles from './ContainTabProfilStyle';
import {CommonActions} from '@react-navigation/native';
const activeindicator = 0;
const profileImg =
  'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';
export default class ContainTabProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: '',
      activeindicator: 0,
      modalVisible: false,
      isChecked: false,
      isLoading: true,
      selectedTab: 0,
      passwordNotVisible: true,
      UserNameValue: '',
      EmailValue: '',
      PasswordValue: '',
      DateValue: '',
      LocationValue: '',
    };
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.navigate('Home');
      return true;
    });
  }
  render() {
    StatusBar.setBarStyle('light-content', true);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    let pic = {
      uri: require('./../../images/BackGround-Profil.png'),
    };

    let logo13 = {
      uri: require('./../../images/Logo1.png'),
    };
    const {selectedTab} = this.state;
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
            <Text>Profile</Text>
          </Body>
        </Header>
        <Container style={styles.container}>
          <Content style={styles.content}>
            <View style={styles.proimg}>
              <Image style={styles.profileImgs} source={{uri: profileImg}} />
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={() => alert('Edit Profile Picture')}>
                <FontAwesome5
                  name="pen"
                  size={20}
                  color="black"
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.followerFollwingLikeBg}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.countLabelBg}>
                  <Text style={styles.countTxt}>1434</Text>
                  <Text style={styles.labelTxt}>Followers</Text>
                </View>
                <View style={styles.divideVertical} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.countLabelBg}>
                  <Text style={styles.countTxt}>1121</Text>
                  <Text style={styles.labelTxt}>Following</Text>
                </View>
                <View style={styles.divideVertical} />
              </View>
              <View style={styles.countLabelBg}>
                <Text style={styles.countTxt}>4507</Text>
                <Text style={styles.labelTxt}>Likes</Text>
              </View>
            </View>
            <View style={styles.TabsView}>
              <View style={styles.materialTabsView}>
                <MaterialTabs
                  items={['Mon compte', 'Parametre']}
                  selectedIndex={selectedTab}
                  onChange={index => {
                    if (index !== 2) {
                      this.setState({selectedTab: index});
                    }
                  }}
                  barColor="transparent"
                  indicatorColor="rgb(57,90,255)"
                  activeTextColor="#000"
                  inactiveTextColor="#959595"
                  uppercase={false}
                />
              </View>
            </View>
            {selectedTab === 0 ? (
              <View>
                <View style={styles.inputFieldSec}>
                  <Item underline style={styles.itememail}>
                    {this.state.UserNameValue === '' ? (
                      <Ionicons
                        active
                        name="md-person"
                        size={35}
                        style={{width: 40, color: 'rgb(159,159,159)'}}
                      />
                    ) : (
                      () => {
                        return '';
                      }
                    )}
                    <Input
                      placeholderTextColor="#000"
                      textAlign={I18nManager.isRTL ? 'right' : 'left'}
                      placeholder="Username"
                      keyboardType="default"
                      style={styles.inputemail}
                      value={this.state.UserNameValue}
                      onChangeText={UserNameValue =>
                        this.setState({UserNameValue})
                      }
                    />
                  </Item>

                  <Item underline style={styles.itememail}>
                    {this.state.EmailValue === '' ? (
                      <Ionicons
                        active
                        name="md-mail"
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
                      placeholder="Email"
                      keyboardType="email-address"
                      style={styles.inputemail}
                      onEndEditing={() => console.log()}
                      value={this.state.EmailValue}
                      onChangeText={EmailValue =>
                        this.setState({EmailValue: EmailValue})
                      }
                    />
                  </Item>
                  <View>
                    <Item underline style={styles.itempassword}>
                      {this.state.PasswordValue === '' ? (
                        <Ionicons
                          active
                          name="md-lock"
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
                        placeholder="Password"
                        secureTextEntry={this.state.passwordNotVisible}
                        style={styles.inputpassword}
                        value={this.state.PasswordValue}
                        onChangeText={PasswordValue =>
                          this.setState({PasswordValue})
                        }
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
                        name={
                          this.state.passwordNotVisible ? 'eye' : 'eye-slash'
                        }
                        type="FontAwesome"
                        size={25}
                        color="black"
                        style={styles.arrow}
                      />
                    </TouchableOpacity>
                  </View>
                  <Item underline style={styles.itememail}>
                    {this.state.DateValue === '' ? (
                      <Ionicons
                        active
                        name="md-calendar"
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
                    <DatePicker
                      defaultDate={this.state.DateValue}
                      minimumDate={new Date(2018, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={'en'}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={'fade'}
                      androidMode={'default'}
                      placeHolderText="Select date"
                      textStyle={styles.datePickerInput}
                      placeHolderTextStyle={styles.datePickerInput}
                      onDateChange={DateValue => this.setState({DateValue})}
                      disabled={false}
                    />
                  </Item>
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
                      placeholder="Location"
                      keyboardType="default"
                      style={styles.inputemail}
                      onChangeText={LocationValue =>
                        this.setState({LocationValue})
                      }
                      value={this.state.LocationValue}
                    />
                  </Item>
                </View>
                <View style={styles.preferenceView}>
                  <Text style={styles.titleText}>Mes Preference</Text>
                  <View style={styles.card}>
                    <View style={styles.cardLigne}>
                      <Text style={styles.cardLigneText}>BMX</Text>
                      <SwitchToggle
                        containerStyle={{
                          width: Metrics.WIDTH * 0.13,
                          height: Metrics.HEIGHT * 0.03,
                          borderRadius: 25,

                          padding: 0,
                        }}
                        circleStyle={{
                          width: Metrics.HEIGHT * 0.04,
                          height: Metrics.HEIGHT * 0.04,
                          borderRadius: Metrics.HEIGHT * 0.06,
                          borderColor: '#e5e5e5',
                          borderWidth: 1,
                          shadowOffset: {width: 0, height: 0},
                          shadowColor: 'black',
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 2,
                        }}
                        switchOn={false}
                        onPress={this.onPress1}
                        circleColorOff="white"
                        circleColorOn="rgb(4,170,24)"
                        backgroundColorOn="rgb(255,214,78)"
                        backgroundColorOff="rgb(159,159,159)"
                        duration={500}
                      />
                    </View>
                    <View style={styles.cardLigne}>
                      <Text style={styles.cardLigneText}>SKATEBOARD</Text>
                      <SwitchToggle
                        containerStyle={{
                          width: Metrics.WIDTH * 0.13,
                          height: Metrics.HEIGHT * 0.03,
                          borderRadius: 25,

                          padding: 0,
                        }}
                        circleStyle={{
                          width: Metrics.HEIGHT * 0.04,
                          height: Metrics.HEIGHT * 0.04,
                          borderRadius: Metrics.HEIGHT * 0.06,
                          borderColor: '#e5e5e5',
                          borderWidth: 1,
                          shadowOffset: {width: 0, height: 0},
                          shadowColor: 'black',
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 2,
                        }}
                        switchOn={true}
                        onPress={this.onPress1}
                        circleColorOff="white"
                        circleColorOn="rgb(4,170,24)"
                        backgroundColorOn="rgb(255,214,78)"
                        backgroundColorOff="rgb(159,159,159)"
                      />
                    </View>
                    <View style={styles.cardLigne}>
                      <Text style={styles.cardLigneText}>ROLLER</Text>
                      <SwitchToggle
                        containerStyle={{
                          width: Metrics.WIDTH * 0.13,
                          height: Metrics.HEIGHT * 0.03,
                          borderRadius: 25,

                          padding: 0,
                        }}
                        circleStyle={{
                          width: Metrics.HEIGHT * 0.04,
                          height: Metrics.HEIGHT * 0.04,
                          borderRadius: Metrics.HEIGHT * 0.06,
                          borderColor: '#e5e5e5',
                          borderWidth: 1,
                          shadowOffset: {width: 0, height: 0},
                          shadowColor: 'black',
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 2,
                        }}
                        switchOn={false}
                        onPress={this.onPress1}
                        circleColorOff="white"
                        circleColorOn="rgb(4,170,24)"
                        backgroundColorOn="rgb(255,214,78)"
                        backgroundColorOff="rgb(159,159,159)"
                      />
                    </View>
                    <View style={styles.cardLigne}>
                      <Text style={styles.cardLigneText}>SCOOTERS</Text>
                      <SwitchToggle
                        containerStyle={{
                          width: Metrics.WIDTH * 0.13,
                          height: Metrics.HEIGHT * 0.03,
                          borderRadius: 25,

                          padding: 0,
                        }}
                        circleStyle={{
                          width: Metrics.HEIGHT * 0.04,
                          height: Metrics.HEIGHT * 0.04,
                          borderRadius: Metrics.HEIGHT * 0.06,
                          borderColor: '#e5e5e5',
                          borderWidth: 1,
                          shadowOffset: {width: 0, height: 0},
                          shadowColor: 'black',
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 2,
                        }}
                        switchOn={false}
                        onPress={this.onPress1}
                        circleColorOff="white"
                        circleColorOn="rgb(4,170,24)"
                        backgroundColorOn="rgb(255,214,78)"
                        backgroundColorOff="rgb(159,159,159)"
                      />
                    </View>
                    <View style={styles.cardLigneLast}>
                      <Text style={styles.cardLigneText}>AUTRE</Text>
                      <SwitchToggle
                        containerStyle={{
                          width: Metrics.WIDTH * 0.13,
                          height: Metrics.HEIGHT * 0.03,
                          borderRadius: 25,

                          padding: 0,
                        }}
                        circleStyle={{
                          width: Metrics.HEIGHT * 0.04,
                          height: Metrics.HEIGHT * 0.04,
                          borderRadius: Metrics.HEIGHT * 0.06,
                          borderColor: '#e5e5e5',
                          borderWidth: 1,
                          shadowOffset: {width: 0, height: 0},
                          shadowColor: 'black',
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 2,
                        }}
                        switchOn={false}
                        onPress={this.onPress1}
                        circleColorOff="white"
                        circleColorOn="rgb(4,170,24)"
                        backgroundColorOn="rgb(255,214,78)"
                        backgroundColorOff="rgb(159,159,159)"
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    info
                    style={styles.buttonlogin2}
                    onPress={() => alert('Sign Up')}>
                    <Text autoCapitalize="words" style={styles.btnText}>
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.inputFieldSec} />
                <View style={styles.card}>
                  <View style={styles.cardLigne}>
                    <TouchableOpacity
                      info
                      style={{width: '100%', flexDirection: 'row'}}
                      onPress={() => alert('Sign Up')}>
                      <Text style={styles.cardLigneText}>Mentions légales</Text>
                      <FontAwesome
                        name="angle-right"
                        type="FontAwesome"
                        size={20}
                        color="rgb(159,159,159)"
                        style={{width: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardLigne}>
                    <TouchableOpacity
                      info
                      style={{width: '100%', flexDirection: 'row'}}
                      onPress={() => alert('Sign Up')}>
                      <Text style={styles.cardLigneText}>
                        Réinitialiser le mot de passe
                      </Text>
                      <FontAwesome
                        name="angle-right"
                        type="FontAwesome"
                        size={20}
                        color="rgb(159,159,159)"
                        style={{width: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardLigne}>
                    <TouchableOpacity
                      info
                      style={{width: '100%', flexDirection: 'row'}}
                      onPress={() => alert('Sign Up')}>
                      <Text style={styles.cardLigneText}>
                        Termes of service
                      </Text>
                      <FontAwesome
                        name="angle-right"
                        type="FontAwesome"
                        size={20}
                        color="rgb(159,159,159)"
                        style={{width: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardLigne}>
                    <TouchableOpacity
                      info
                      style={{width: '100%', flexDirection: 'row'}}
                      onPress={() => alert('Sign Up')}>
                      <Text style={styles.cardLigneText}>About</Text>
                      <FontAwesome
                        name="angle-right"
                        type="FontAwesome"
                        size={20}
                        color="rgb(159,159,159)"
                        style={{width: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardLigneLast}>
                    <Text style={styles.cardLigneText}>Deconnecter</Text>
                    <SwitchToggle
                      containerStyle={{
                        width: Metrics.WIDTH * 0.13,
                        height: Metrics.HEIGHT * 0.03,
                        borderRadius: 25,
                        padding: 0,
                      }}
                      circleStyle={{
                        width: Metrics.HEIGHT * 0.04,
                        height: Metrics.HEIGHT * 0.04,
                        borderRadius: Metrics.HEIGHT * 0.06,
                        borderColor: '#e5e5e5',
                        borderWidth: 1,
                        shadowOffset: {width: 0, height: 0},
                        shadowColor: 'black',
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 2,
                      }}
                      switchOn={true}
                      onPress={this.onPress1}
                      circleColorOff="white"
                      circleColorOn="white"
                      backgroundColorOn="rgb(255,214,78)"
                      backgroundColorOff="rgb(159,159,159)"
                    />
                  </View>
                </View>
                <TouchableOpacity
                  info
                  style={styles.suppCompte}
                  onPress={() => alert('Sign Up')}>
                  <Text autoCapitalize="words" style={styles.btnText2}>
                    Supprimer le compte
                  </Text>
                  <FontAwesome
                    name="angle-right"
                    type="FontAwesome"
                    size={20}
                    color="rgb(159,159,159)"
                    style={styles.arrow}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  info
                  style={styles.buttonlogin2}
                  onPress={() => alert('Sign Up')}>
                  <Text autoCapitalize="words" style={styles.btnText}>
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}

import React, {Component} from 'react';
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  View,
  TextInput,
  BackHandler,
  I18nManager,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  Input,
  Container,
  Content,
  Header,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {ApplicationStyles, Metrics, Fonts, Colors} from '../../Themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Screen Styles
import styles from './styles';
import ContainTabRecherche from './ContainTabRecherche.js';
import ContainTabMap from './ContainTabMap.js';
import ContainTabNewSpot from './ContainTabNewSpot.js';
import ContainTabFavori from './ContainTabFavori.js';
import ContainTabProfile from './ContainTabProfile.js';
import {createStackNavigator} from '@react-navigation/stack';
import {
  subscriber,
  subscriberRedirect,
  messageService,
  subscriberDrawerProfil,
} from './../../services/messageService';

const Stack = createStackNavigator();
/**const Stack = createStackNavigator();
 *  Profile Screen
 */
export default class MenuPrincipale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Recherche',
      chargement: false,
    };
    subscriber.subscribe(v => {
      this.setState({chargement: v});
    });
    subscriberRedirect.subscribe(v => {
      if (v) {
        this.redirectFunction(v);
      }
    });
  }
  redirectFunction(string) {
    if (string === 'Recherche') {
      if (this.state.selectedTab === 'Profile') {
        this.setState({selectedTab: 'Recherche'}, () =>
          this.props.navigation.navigate('ContainTabRecherche'),
        );
      }
    } else if (string === 'Map') {
      this.setState({selectedTab: 'Map', filterOn: false}, () =>
        this.props.navigation.navigate('ContainTabMap'),
      );
    } else if (string === 'NewSpot') {
      this.setState({selectedTab: 'NewSpot', filterOn: false}, () =>
        this.props.navigation.navigate('ContainTabNewSpot'),
      );
    } else if (string === 'Favorie') {
      this.setState({selectedTab: 'Favorie', filterOn: false}, () =>
        this.props.navigation.navigate('ContainTabFavori'),
      );
    } else if (string === 'Profile') {
      this.setState({selectedTab: 'Profile', filterOn: false}, () =>
        this.props.navigation.navigate('ContainTabProfile'),
      );
    } else if (string === 'Deconexion') {
      this.setState({selectedTab: 'Recherche', filterOn: false}, () =>
        this.props.navigation.navigate('ConnexionPage'),
      );
    }
  }
  renderSelectedTab() {
    /*
    switch (this.state.selectedTazb) {
      case 'Recherche':
        return (
          <ContainTabRecherche
            filterValue={this.state.filterValue}
            {...this.props}
          />
        );
        break;
      case 'Map':
        return <ContainTabMap {...this.props} />;
        break;
      case 'NewSpot':
        return <ContainTabNewSpot {...this.props} />;
        break;
      case 'Favorie':
        return <ContainTabFavori {...this.props} />;
        break;
      case 'Profile':
        return <ContainTabProfile {...this.props} />;
        break;
      default:
    }*/

    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="ContainTabRecherche"
          title="Recherche"
          component={ContainTabRecherche}
        />
        <Stack.Screen
          name="ContainTabMap"
          title="Map"
          component={ContainTabMap}
        />
        <Stack.Screen
          name="ContainTabNewSpot"
          title="NewSpot"
          component={ContainTabNewSpot}
        />
        <Stack.Screen
          name="ContainTabFavori"
          title="Favorie"
          component={ContainTabFavori}
        />
        <Stack.Screen
          name="ContainTabProfile"
          title="Profile"
          component={ContainTabProfile}
        />
      </Stack.Navigator>
    );
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF', true);
      StatusBar.setTranslucent(true);
    }
    return (
      <Container style={styles.main}>
        {this.renderSelectedTab()}
        <View style={{flexDirection: 'row'}}>
          <FooterTab style={styles.footerTabBg}>
            {this.state.selectedTab == 'Recherche' ? (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Recherche'}, () =>
                    this.props.navigation.navigate('ContainTabRecherche'),
                  )
                }
                style={styles.activeButton}>
                <View style={{alignItems: 'center'}}>
                  <Ionicons
                    name="md-search"
                    size={30}
                    color="#000"
                    style={{justifyContent: 'center'}}
                  />
                  <Text
                    style={[
                      styles.activeTabText,
                      {backgroundColor: 'transparent'},
                    ]}>
                    Recherche
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Recherche'}, () =>
                    this.props.navigation.navigate('ContainTabRecherche'),
                  )
                }
                style={styles.desactiveButton}>
                <View style={{alignItems: 'center', width: '38%'}}>
                  <Ionicons
                    name="md-search"
                    size={24}
                    color="rgb(159,159,159)"
                    style={{justifyContent: 'center'}}
                  />
                </View>
              </TouchableOpacity>
            )}
            {this.state.selectedTab == 'Map' ? (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Map', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabMap'),
                  )
                }
                style={styles.activeButton}>
                <View style={{alignItems: 'center'}}>
                  <Ionicons
                    name="md-map"
                    size={30}
                    color="#000"
                    style={{justifyContent: 'center'}}
                  />
                  <Text
                    style={[
                      styles.activeTabText,
                      {marginTop: Metrics.WIDTH * 0.01},
                    ]}>
                    {' '}
                    Map
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Map', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabMap'),
                  )
                }
                style={styles.desactiveButton}>
                <Ionicons name="md-map" size={24} color="rgb(159,159,159)" />
              </TouchableOpacity>
            )}

            {this.state.selectedTab == 'NewSpot' ? (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'NewSpot', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabNewSpot'),
                  )
                }
                style={styles.activeButton}>
                <View style={{alignItems: 'center'}}>
                  <MaterialIcons
                    name="add-a-photo"
                    size={30}
                    color="#000"
                    style={{justifyContent: 'center'}}
                  />
                  <Text
                    style={[
                      styles.activeTabText,
                      {marginTop: Metrics.WIDTH * 0.01},
                    ]}>
                    {' '}
                    NewSpot
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'NewSpot', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabNewSpot'),
                  )
                }
                style={styles.desactiveButton}>
                <View style={{alignItems: 'center', width: '38%'}}>
                  <MaterialIcons
                    name="add-a-photo"
                    size={24}
                    color="rgb(159,159,159)"
                    style={{justifyContent: 'center'}}
                  />
                </View>
              </TouchableOpacity>
            )}
            {this.state.selectedTab == 'Favorie' ? (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Favorie', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabFavori'),
                  )
                }
                style={styles.activeButton}>
                <View style={{alignItems: 'center'}}>
                  <MaterialIcons
                    name="stars"
                    size={30}
                    color="#000"
                    style={{justifyContent: 'center'}}
                  />
                  <Text
                    style={[
                      styles.activeTabText,
                      {marginTop: Metrics.WIDTH * 0.01},
                    ]}>
                    {' '}
                    Favorie
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Favorie', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabFavori'),
                  )
                }
                style={styles.desactiveButton}>
                <View style={{alignItems: 'center', width: '38%'}}>
                  <MaterialIcons
                    name="stars"
                    size={24}
                    color="rgb(159,159,159)"
                    style={{justifyContent: 'center'}}
                  />
                </View>
              </TouchableOpacity>
            )}

            {this.state.selectedTab == 'Profile' ? (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Profile', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabProfile'),
                  )
                }
                style={styles.activeButton}>
                <View style={{alignItems: 'center'}}>
                  <MaterialIcons
                    name="account-box"
                    size={30}
                    color="#000"
                    style={{justifyContent: 'center'}}
                  />
                  <Text
                    style={[
                      styles.activeTabText,
                      {marginTop: Metrics.WIDTH * 0.01},
                    ]}>
                    {' '}
                    Profile
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                vertical
                onPress={() =>
                  this.setState({selectedTab: 'Profile', filterOn: false}, () =>
                    this.props.navigation.navigate('ContainTabProfile'),
                  )
                }
                style={styles.desactiveButton}>
                <View style={{alignItems: 'center', width: '38%'}}>
                  <MaterialIcons
                    name="account-box"
                    size={24}
                    color="rgb(159,159,159)"
                    style={{justifyContent: 'center'}}
                  />
                </View>
              </TouchableOpacity>
            )}
          </FooterTab>
        </View>
        {this.state.chargement ? (
          <View
            style={{
              height: Metrics.HEIGHT * 1.05,
              width: Metrics.WIDTH,
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              elevation: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              animating={true}
              color="#fff"
              size="large"
              style={{
                activityIndicator: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 80,
                },
              }}
            />
          </View>
        ) : (
          <View />
        )}
      </Container>
    );
  }
}

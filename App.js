/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Container, Content, Header, Body} from 'native-base';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import PrivacyPolicy from './Screens/App/home/PrivacyPolicy/index';
import ConnexionPage from './Screens/App/home/ConnectionPage/index';
import LoginPage from './Screens/App/home/LoginPage/index';
import SignupPage from './Screens/App/home/SignupPage/index';
import PrendrePhoto from './Screens/App/home/PrendrePhoto/index';
const CustomDrawerContentComponent = props => {
  return (
    <Container>
      <Header style={styles.drawerHeader}>
        <Body>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          />
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
    </Container>
  );
};

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: PrivacyPolicy,
      navigationOptions: {
        title: 'Privacy policy',
      },
    },
    ConnexionPage: {
      screen: ConnexionPage,
      navigationOptions: {
        title: 'Connexion page',
      },
    },
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        title: 'Log in page',
      },
    },
    SignupPage: {
      screen: SignupPage,
      navigationOptions: {
        title: 'Sign up page',
      },
    },
    PrendrePhoto: {
      screen: PrendrePhoto,
      navigationOptions: {
        title: 'Prendre photo de profile',
      },
    },
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    backBehavior: 'history',
  },
);
/*const AuthStack = createStackNavigator({ SignIn: { screen: Login }, SignUp: { screen: Registration }, Recup: { screen: RecuperationMotDePasse } },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: true,
    }
  }
);*/

export default createAppContainer(
  createSwitchNavigator(
    {
      /* Accueil: AuthStack,
      //stackdep:stackR,*/
      Accueil: AppStack,
    },
    {
      initialRouteName: 'Accueil',
    },
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeader: {
    height: 100,
    backgroundColor: 'white',
  },
  drawerImage: {
    width: '50%',
  },
});

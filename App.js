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
import PrivacyPolicy from './Screens/App/home/PrivacyPolicy/index';
import ConnexionPage from './Screens/App/home/ConnectionPage/index';
import LoginPage from './Screens/App/home/LoginPage/index';
import SignupPage from './Screens/App/home/SignupPage/index';
import PrendrePhoto from './Screens/App/home/PrendrePhoto/index';
import MenuPrincipale from './Screens/App/home/MenuPrincipale/index';
import ProfilPage from './Screens/App/home/ProfilPage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
export default function App() {
  const [tab, setTab] = React.useState('Recherche');
  return (
    <NavigationContainer
      onStateChange={state => console.log('New state is', state.routes[5])}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={PrivacyPolicy}
          title="Privacy policy"
        />
        <Drawer.Screen
          name="ConnexionPage"
          component={ConnexionPage}
          title="Connexion page"
        />
        <Drawer.Screen
          name="LoginPage"
          component={LoginPage}
          title="Connexion"
        />
        <Drawer.Screen
          name="SignupPage"
          component={SignupPage}
          title="Sign up Page"
        />
        <Drawer.Screen
          name="PrendrePhoto"
          component={PrendrePhoto}
          title="Prendre Photo page"
        />
        <Drawer.Screen
          name="MenuPrincipale"
          component={
            MenuPrincipale
          }
          title="Menu Principale"
        />
        <Drawer.Screen
          name="ProfilPage"
          component={ProfilPage}
          title="Profil Page"
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
/*
export default createAppContainer(
  createSwitchNavigator(
    {
      /* Accueil: AuthStack,
      //stackdep:stackR,
      Accueil: AppStack,
    },
    {
      initialRouteName: 'Accueil',
    },
  ),
);
*/
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import {Container, Content, Header, Body, Left, Right} from 'native-base';
import PrivacyPolicy from './Screens/App/home/PrivacyPolicy/index';
import ConnexionPage from './Screens/App/home/ConnectionPage/index';
import LoginPage from './Screens/App/home/LoginPage/index';
import DetailsCommentsModal from './Screens/App/home/DetailsCommentsModal/index';
import SignupPage from './Screens/App/home/SignupPage/index';
import PrendrePhoto from './Screens/App/home/PrendrePhoto/index';
import MenuPrincipale from './Screens/App/home/MenuPrincipale/index';
import ProfilPage from './Screens/App/home/ProfilPage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './Screens/App/home/DetailsCommentsModal/styles';
const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="Drawer" component={DrawerScreen} />
    </MainStack.Navigator>
  );
}
function ModalScreen({navigation}) {
  return <DetailsCommentsModal navigation={navigation} />;
}
function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Main" component={MainStackScreen} />
      <RootStack.Screen name="MyModal" component={ModalScreen} />
    </RootStack.Navigator>
  );
}
function DrawerScreen() {
  return (
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
      <Drawer.Screen name="LoginPage" component={LoginPage} title="Connexion" />
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
        component={MenuPrincipale}
        title="Menu Principale"
      />
      <Drawer.Screen
        name="ProfilPage"
        component={ProfilPage}
        title="Profil Page"
      />
    </Drawer.Navigator>
  );
}
export default function App() {
  const [tab, setTab] = React.useState('Recherche');
  return (
    <NavigationContainer
      onStateChange={state => console.log('New state is', state.routes[5])}>
      <RootStackScreen />
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

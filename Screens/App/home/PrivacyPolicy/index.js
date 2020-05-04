import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
  ScrollView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import {DrawerActions, BaseRouter} from '@react-navigation/native';
import {Right, Left, Body, Header, Input, Container} from 'native-base';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dropdown from '../../home/Components/Dropdown/dropdown/';
import {Metrics} from '../../Themes';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-community/async-storage';
class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      user: {},
      uploading: true,
    };
  }
  getUser() {
    console.log('///dkhl Policy');
    AsyncStorage.getItem('authentifiedUser').then(user => {
      if (user) {
        console.log('getUser()');
        console.log('getfin');
        this.setState(
          {
            user: JSON.parse(user),
            uploading: false,
          },
          () => console.log(this.state.user),
        );
      }
    });
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
    this.props.navigation.addListener('focus', () => {
      this.getUser();
    });
  }
  accepte() {
    this.setState({uploading: true}, () => {
      firebase
        .database()
        .ref('NEWDEV/users/' + this.state.user.uid)
        .update({
          policyPrivacyAccepted: true,
        })
        .then(res =>
          this.setState({uploading: false}, () => {
            AsyncStorage.setItem(
              'authentifiedUser',
              JSON.stringify({
                uid: this.state.user.uid,
                nom: this.state.user.nom,
                prenom: this.state.user.prenom,
                pseudo: this.state.user.pseudo,
                email: this.state.user.email,
                password: this.state.user.password,
                policyPrivacyAccepted: true,
                photoUrl: '',
                preferences: this.state.user.preferences,
              }),
            ).then(() => {
              this.setState({user: {}});
              this.props.navigation.navigate('PrendrePhoto');
            });
          }),
        )
        .catch(error => console.log(error));
    });
  }
  cancel() {
    if (firebase.auth().currentUser) {
      this.setState({uploading: true}, () => {
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {
            this.setState({uploading: false}, () => {
              this.props.navigation.navigate('SignupPage');
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
    firebase.auth().onAuthStateChanged(user => console.log(user));
  }
  render() {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF', true);
      StatusBar.setTranslucent(true);
    }
    /*
    StatusBar.setBarStyle('dark-content', true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0.5)', true);
      StatusBar.setTranslucent(true);
    */
    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <View>
              <View style={styles.backView} />
            </View>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Terms of service</Text>
          </Body>
        </Header>
        <ScrollView>
          <View style={styles.txt}>
            <Text style={styles.title}>Terms of service</Text>
            <View
              style={{
                paddingRight: Metrics.WIDTH * 0.05,
                paddingLeft: Metrics.WIDTH * 0.05,
              }}>
              <Text style={styles.qus}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudan-tium,totam rem aperiam,eaque ipsa
                quae ab illo inventore veritatis et quia architecto beatae vitae
                dicta sunt explicabo. Nemo enim ipsam vo-luptatem quia voluptas
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingRight: Metrics.WIDTH * 0.05,
              paddingLeft: Metrics.WIDTH * 0.05,
            }}>
            <Text style={styles.qus2}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudan-tium,totam rem aperiam,eaque ipsa
              quae ab illo inventore veritatis et quia architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam vo-luptatem quia voluptas
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudan-tium,totam rem aperiam,eaque ipsa
              quae ab illo inventore veritatis et quia architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam vo-luptatem quia voluptas
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudan-tium,totam rem aperiam,eaque ipsa
              quae ab illo inventore veritatis et quia architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam vo-luptatem quia voluptas
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudan-tium,totam rem aperiam,eaque ipsa
              quae ab illo inventore veritatis et quia architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam vo-luptatem quia voluptas
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudan-tium,totam rem aperiam,eaque ipsa
              quae ab illo inventore veritatis et quia architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam vo-luptatem quia voluptas
            </Text>
          </View>
        </ScrollView>
        <View style={styles.buttonsView}>
          <TouchableHighlight
            info
            style={styles.buttonlogin}
            onPress={() => {
              this.accepte();
            }}>
            <Text autoCapitalize="words" style={styles.btnText}>
              Accept
            </Text>
          </TouchableHighlight>
          <TouchableOpacity
            info
            style={styles.buttonsignup}
            onPress={() => this.cancel()}>
            <Text autoCapitalize="words" style={styles.btnText2}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.uploading ? (
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
export default PrivacyPolicy;

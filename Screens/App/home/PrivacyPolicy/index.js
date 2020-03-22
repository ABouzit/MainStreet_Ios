import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
  ScrollView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {Right, Left, Body, Header, Input} from 'native-base';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dropdown from '../../home/Components/Dropdown/dropdown/';
import {Metrics} from '../../Themes';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
    };
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      that.props.navigation.navigate('ECommerceMenu');
      return true;
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <Header androidStatusBarColor={'#0e1130'} style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() =>
                {this.props.navigation.dispatch(DrawerActions.openDrawer());
                console.log(JSON.stringify(this.props.navigation))}
              }>
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
            onPress={() => alert('Sign In')}>
            <Text autoCapitalize="words" style={styles.btnText}>
              Accept
            </Text>
          </TouchableHighlight>
          <TouchableOpacity
            info
            style={styles.buttonsignup}
            onPress={() => alert('Sign Up')}>
            <Text autoCapitalize="words" style={styles.btnText2}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

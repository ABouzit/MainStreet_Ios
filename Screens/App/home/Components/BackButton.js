import React from 'react';
import {Button, TouchableOpacity, I18nManager} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class BackButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          width: 30,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
        onPress={() => this.props.navigation.goBack()}>
        {I18nManager.isRTL ? (
          <FontAwesome name="angle-right" size={25} color="white" />
        ) : (
          <FontAwesome name="angle-left" size={25} color="white" />
        )}
      </TouchableOpacity>
    );
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(BackButton);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid
} from 'react-native';

var OinkList = require('./components/OinkList');
var OinkDetails = require('./components/OinkDetails');
var OinkEditDetails = require('./components/OinkEditDetails');

import * as firebase from 'firebase';

// Initialize Firebase
/*const firebaseConfig = {
  apiKey: 'AIzaSyBdMfL-rIsMEmn1ducZ5E5ZZ3eFQ6ydQZU',
  authDomain: 'oink-99fe4.firebaseapp.com',
  databaseURL: 'https://oink-99fe4.firebaseio.com',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);*/

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length === 1  ) {
    return false;
  }
  _navigator.pop();
  return true;
});

class OinkNavigator extends Component {

  renderScene = (route, navigator) => {
    _navigator = navigator;
    switch (route.id) {
      case 'list':
        return <OinkList navigator={navigator} />;
      case 'details':
        return <OinkDetails navigator={navigator} medicine={route.medicine} />;
      case 'edit':
        return <OinkEditDetails navigator={navigator} medicine={route.medicine} />;
      default:
        return <OinkList navigator={navigator}/>;
    }
  };

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'list' }}
        renderScene={this.renderScene} />
    );
  }

}

AppRegistry.registerComponent('oink', () => OinkNavigator);

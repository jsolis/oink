/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Navigator,
  BackAndroid
} from 'react-native';

import OinkList from './components/OinkList';
import OinkDetails from './components/OinkDetails';
import OinkEditDetails from './components/OinkEditDetails';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBdMfL-rIsMEmn1ducZ5E5ZZ3eFQ6ydQZU',
  authDomain: 'oink-99fe4.firebaseapp.com',
  databaseURL: 'https://oink-99fe4.firebaseio.com',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length === 1  ) {
    return false;
  }
  _navigator.pop();
  return true;
});

class OinkNavigator extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      name: 'James',
      dataSource: ds.cloneWithRows([{name: 'Loading...'}]),
      medicines: [],
    };

    this.itemsRef = firebaseApp.database().ref('users/dummy/people/James');

  }

  updateMedicine(originalName, medicineObj) {
    if (medicineObj && medicineObj.name) {
      if (originalName !== medicineObj.name) {
        firebaseApp.database().ref('users/dummy/people/James').child(originalName).remove();
      }
      firebaseApp.database().ref('users/dummy/people/James').child(medicineObj.name).set(medicineObj);
    }
  }

  deleteMedicine(medicineName) {
    if (medicineName && medicineName.length > 0) {
      firebaseApp.database().ref('users/dummy/people/James/').child(medicineName).remove();
    }
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snapshot) => {
      var items = [];
      var medicines = {};

      snapshot.forEach((child) => {

        var medicine = {
          name: child.key,
          details: child.val(),
          _key: child.key,
        };

        items.push(medicine);

        medicines[child.key] = child.val();
        medicines[child.key].name = child.key;

      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        medicines: medicines,
      });
    });
  }

  componentDidMount() {

    this.listenForItems(this.itemsRef);

  }

  renderScene = (route, navigator) => {
    _navigator = navigator;

    switch (route.id) {
      case 'list':
        return <OinkList 
                  navigator={navigator} 
                  name={this.state.name} 
                  dataSource={this.state.dataSource}  />;
      case 'details':
        var medicine = this.state.medicines[route.medicineName];
        return <OinkDetails 
                  navigator={navigator} 
                  medicine={medicine}
                  deleteMedicine={this.deleteMedicine} />;
      case 'edit':
        var medicine = this.state.medicines[route.medicineName];
        return <OinkEditDetails 
                  navigator={navigator} 
                  medicine={medicine} 
                  updateMedicine={this.updateMedicine} />;
      default:
        return <OinkList 
                  navigator={navigator} 
                  name={this.state.name} 
                  dataSource={this.state.dataSource} />;
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  BackAndroid,
  ListView,
  Navigator,
} from 'react-native';
import {
  Toast,
} from 'native-base';

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
    
    this.state = {
      name: 'James',
      medicines: {},
      medicineList: [],
      filteredList: [],
      filter: 'all',
    };

    this.itemsRef = firebaseApp.database().ref('users/dummy/people/James');

  }

  updateMedicine(originalName, medicineObj) {
    if (medicineObj && medicineObj.name) {
      firebaseApp.database().ref('users/dummy/people/James')
        .child(medicineObj.name)
        .set(medicineObj)
        .then(() => {
          if (originalName !== '' && originalName !== medicineObj.name) {
            firebaseApp.database().ref('users/dummy/people/James')
              .child(originalName)
              .remove();
          }
        })
        .catch(() => {

        });
    }
  }

  deleteMedicine(medicineName) {
    if (medicineName && medicineName.length > 0) {
      firebaseApp.database().ref('users/dummy/people/James/').child(medicineName).remove();
    }
  }

  takeMedicine(medicineName) {
    if (medicineName && medicineName.length > 0) {
      firebaseApp.database().ref('users/dummy/people/James/')
        .child(medicineName)
        .update({lastTaken: new Date().getTime()})
        .then(() => {
          Toast.show({
            text: `${medicineName} has been taken`,
            position: 'bottom',
            buttonText: 'OK',
            duration: 2000,
          });
        })
        .catch(() => {
          Toash.show({
            text: `There was a problem taking ${medicineName}`,
            position: 'bottom',
            buttonText: 'OK',
          });
        });
    }
  }

  updateFilter = (filter) => {
    const filtered = this.filterMedicineList(this.state.medicineList, filter);
    AsyncStorage.setItem('filter', filter);
    this.setState({
      filter: filter,
      filteredList: filtered,
    });
  }

  filterMedicineList = (list, filter) => {
    return list.filter(medicine => {
      return (filter === 'pillBox' && (medicine.priority === 'must' || medicine.priority === 'should'))
        || (filter === 'medicineCabinet' && medicine.priority === 'can')
        || (filter === 'all');
    });
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snapshot) => {
      var medicineList = [];
      var medicines = {};

      snapshot.forEach((child) => {

        var medicine = child.val();
        medicine._key = child.key;

        medicineList.push(medicine);

        medicines[child.key] = child.val();
        medicines[child.key].name = child.key;

      });

      const filteredList = this.filterMedicineList(medicineList, this.state.filter);

      this.setState({
        medicines: medicines,
        medicineList: medicineList,
        filteredList: filteredList,
      });
    });
  }

  componentWillMount() {

    AsyncStorage.getItem('filter').then((filter) => {
      this.setState({
        filter: filter || this.state.filter,
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
                  medicineList={this.state.filteredList} 
                  updateFilter={this.updateFilter} 
                  filter={this.state.filter} />;
      case 'details':
        var medicine = this.state.medicines[route.medicineName];
        return <OinkDetails 
                  navigator={navigator} 
                  medicine={medicine}
                  deleteMedicine={this.deleteMedicine}
                  takeMedicine={this.takeMedicine} />;
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
                  medicineList={this.state.filteredList}
                  updateFilter={this.updateFilter} 
                  filter={this.state.filter} />;
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

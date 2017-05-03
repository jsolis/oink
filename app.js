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
import OinkAddPerson from './components/OinkAddPerson';

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
      user: 'dummier',
      name: 'James',
      people: [],
      medicines: {},
      medicineList: [],
      filteredList: [],
      filter: 'all',
      medicineHistory: [],
      listLoading: true,
    };

    this.medicinesRef = firebaseApp.database().ref(`users/${this.state.user}/medicines/${this.state.name}`);

    this.peopleRef = firebaseApp.database().ref(`users/${this.state.user}/people`);

    firebase.auth().signInAnonymously();

  }

  addMedicine = (medicineObj) => {
    if (medicineObj) {
      const newMedicineRef = this.medicinesRef.push();
      newMedicineRef.set(medicineObj);
    }
  }

  updateMedicine = (medicineObj) => {
    if (medicineObj && medicineObj.name && medicineObj._key) {
      this.medicinesRef
        .child(medicineObj._key)
        .set(medicineObj);
    }
  }

  deleteMedicine = (medicineKey) => {
    if (medicineKey && medicineKey.length > 0) {
      // TODO - delete medicineHistory too
      this.medicinesRef
        .child(medicineKey).remove();
    }
  }

  takeMedicine = (medicineKey, hour, minutes) => {
    if (medicineKey && medicineKey.length > 0) {
      const medicineName = this.state.medicines[medicineKey].name;
      const takenDate = new Date();
      if (hour != undefined && minutes != undefined) {
        takenDate.setHours(hour);
        takenDate.setMinutes(minutes);
      }
      this.medicinesRef
        .child(medicineKey)
        .update({lastTaken: takenDate.getTime()})
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
      this.recordMedicineHistory(medicineKey, takenDate.getTime());
    }
  }

  recordMedicineHistory = (medicineKey, takenDateInMillis) => {
    const dose = this.state.medicines[medicineKey].dose;
    const taken = {};
    taken[takenDateInMillis] = {dateTaken: takenDateInMillis, dose};
    this.historyRef
      .update(taken)
      .then(() => {
        alert('history has been written')
      });
  }

  addPerson = (person) => {
    if (person) {
      const newPersonRef = this.peopleRef.push();
      newPersonRef.set(person);
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

  listenForItems(medicinesRef) {
    medicinesRef.on('value', (snapshot) => {
      const medicineList = [];
      const medicines = {};

      snapshot.forEach((child) => {

        const medicine = child.val();
        medicine._key = child.key;

        medicineList.push(medicine);

        medicines[child.key] = medicine;

      });

      const filteredList = this.filterMedicineList(medicineList, this.state.filter);

      this.setState({
        medicines: medicines,
        medicineList: medicineList,
        filteredList: filteredList,
        listLoading: false,
      });
    });
  }

  listenForHistory(historyRef) {
    historyRef.orderByKey().limitToLast(7).on('value', (snapshot) => {
      const medicineHistory = [];

      snapshot.forEach(child => {
        medicineHistory.push(child.val());
      });

      this.setState({
        medicineHistory,
      });
    });
  }

  listenForPeople(peopleRef) {
    peopleRef.on('value', (snapshot) => {
      const people = [];

      snapshot.forEach(child => {
        const person = child.val();
        person._key = child.key;

        people.push(person);
      });

      this.setState({
        people,
      });

    });
  }

  stopListenForHistory(historyRef) {
    if (historyRef) {
      historyRef.off('value');
    }
  }

  updateHistoryRefAndListen = (medicineKey) => {

    if (medicineKey) {
      // TODO call off when exiting details / edit details view?
      this.stopListenForHistory(this.historyRef);
      this.historyRef = firebaseApp.database().ref(`users/${this.state.user}/history/${this.state.name}/${medicineKey}`);
      this.listenForHistory(this.historyRef);
    }

  }

  componentWillMount() {

    AsyncStorage.getItem('filter').then((filter) => {
      this.setState({
        filter: filter || this.state.filter,
      });
    });

  }

  componentDidMount() {

    this.listenForItems(this.medicinesRef);

    this.listenForPeople(this.peopleRef);

  }

  renderScene = (route, navigator) => {
    _navigator = navigator;

    switch (route.id) {
      case 'list':
        return <OinkList 
                  navigator={navigator}
                  name={this.state.name}
                  people={this.state.people}
                  medicineList={this.state.filteredList}
                  updateFilter={this.updateFilter}
                  filter={this.state.filter}
                  listLoading={this.state.listLoading} />;
      case 'details':
        var medicine = this.state.medicines[route.medicineKey];
        return <OinkDetails 
                  navigator={navigator} 
                  medicine={medicine}
                  deleteMedicine={this.deleteMedicine}
                  takeMedicine={this.takeMedicine}
                  updateHistoryRefAndListen={this.updateHistoryRefAndListen}
                  medicineHistory={this.state.medicineHistory} />;
      case 'edit':
        var medicine = this.state.medicines[route.medicineKey];
        return <OinkEditDetails 
                  navigator={navigator} 
                  medicine={medicine} 
                  addMedicine={this.addMedicine}
                  updateMedicine={this.updateMedicine} />;
      case 'addPerson':
        return <OinkAddPerson
                  navigator={navigator}
                  addPerson={this.addPerson} />;
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

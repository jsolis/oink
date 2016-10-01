/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  TouchableHighlight,
  Navigator,
  BackAndroid
} from 'react-native';

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

class OinkList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      name: 'James',
      dataSource: ds.cloneWithRows([{title: 'Loading...'}])
    }

    this.itemsRef = firebaseApp.database().ref().child('users').child('dummy').child('people').child('James');
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snapshot) => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          title: child.key,
          details: child.val(),
          _key: child.key,
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {

    this.listenForItems(this.itemsRef);

  }

  render() {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.header}>
          {this.state.name}
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <TouchableHighlight 
                underlayColor="#e0ffff"
                onPress={() => {
                  this.props.navigator.push({id: 'details', medicine: rowData});
                }}>
                <Text style={styles.listItem}>{rowData.title}</Text>
              </TouchableHighlight>
            );
          }} />
        
      </View>
    );
  }
}

class OinkDetails extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.header}>
          {this.props.medicine.title}
        </Text>
        <TextInput
          style={styles.detailsTextInput}
          onChangeText={(text) => alert(text)}
          value={this.props.medicine.details}/>
      </View>
    );
  }
}

class OinkNavigator extends Component {

  renderScene = (route, navigator) => {
    _navigator = navigator;
    switch (route.id) {
      case 'list':
        return <OinkList navigator={navigator}/>;
      case 'details':
        return <OinkDetails navigator={navigator} medicine={route.medicine}/>;
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

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFA4D0',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFA4D0',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  detailsTextInput: {
    height: 40,
    alignSelf: 'stretch',
    margin: 10,
    color: '#333',
    borderColor: 'gray',
    borderWidth: 1,
  },
  listItem: {
    color: '#333',
    fontSize: 20,
    marginBottom: 10,
  },
});

AppRegistry.registerComponent('oink', () => OinkNavigator);

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBdMfL-rIsMEmn1ducZ5E5ZZ3eFQ6ydQZU',
  authDomain: 'oink-99fe4.firebaseapp.com',
  databaseURL: 'https://oink-99fe4.firebaseio.com',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

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
                style={styles.listItem}
                onPress={() => {
                  this.props.navigator.push({id: 'details', medicine: rowData});
                }}>
                <Text style={styles.listText}>{rowData.title}</Text>
              </TouchableHighlight>
            );
          }} />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  listItem: {
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#f9dbea',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  listText: {
    color: '#333',
    fontSize: 20,
  },
});

module.exports = OinkList;
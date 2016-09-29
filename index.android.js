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
      text: 'James',
      dataSource: ds.cloneWithRows([{title: 'Loading...'}])
    }

    getMoviesFromApi()
      .then(movies => {
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(movies) });
      });

    async function getMoviesFromApi() {
      try {
        let response = await fetch('https://facebook.github.io/react-native/movies.json');
        let responseJson = await response.json();
        return responseJson.movies;
      } catch(error) {
        console.error(error);
      }
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          James Medicines
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <TouchableHighlight 
                underlayColor="#e0ffff"
                onPress={() => {
                  this.props.navigator.push({id: 'details', medicine: rowData.title});
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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Details on {this.props.medicine}
        </Text>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA4D0',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#aa3333',
    marginBottom: 5,
  },
  listItem: {
    color: '#333',
    fontSize: 20,
    marginBottom: 10,
  },
});

AppRegistry.registerComponent('oink', () => OinkNavigator);

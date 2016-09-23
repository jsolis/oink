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
  ListView
} from 'react-native';

class Foobar extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: false };

    setTimeout(() => {
      this.setState({ showText: true });
    }, 500);
  }

  render() {
    let display = this.state.showText ? this.props.text : '';

    return (
      <Text style={this.props.style}>{display}</Text>
    );
  }
}

class AwesomeProject extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      text: 'FOOBAR',
      dataSource: ds.cloneWithRows([{title: 'Loading...'},{title: 'Waiting...'}])
    }

    console.log('about to get movies');
    getMoviesFromApiAsync()
      .then(movies => {
        this.setState({title: 'None'});
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

    function getMoviesFromApiAsync() {
      return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.movies;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{height: 40, width: 100}}
          placeholder="Greeting..."
          onChangeText={(text) => this.setState({text})} />
        <Text>Filter by: </Text><Foobar text={this.state.text} style={styles.instructions}/>

        <Text style={styles.welcome}>
          Jay, here are your movies
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title}</Text>} />
        
      </View>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#aa3333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

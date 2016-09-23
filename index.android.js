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

class Oink extends Component {
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
        <TextInput 
          style={{height: 40, width: 100}}
          placeholder="Greeting..."
          onChangeText={(text) => this.setState({text})} />
        <Text>Filter by: </Text>
        <Foobar text={this.state.text} style={styles.instructions}/>

        <Text style={styles.welcome}>
          James Medicines
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.listItem}>{rowData.title}</Text>} />
        
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

AppRegistry.registerComponent('oink', () => Oink);

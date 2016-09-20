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
  TextInput
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
    this.state = { text: 'FOOBAR' }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{height: 40, width: 100}}
          placeholder="Greeting..."
          onChangeText={(text) => this.setState({text})} />

        <Text style={styles.welcome}>
          Jay, Welcome to React Native!
        </Text>
        <Foobar text={this.state.text} style={styles.instructions}/>
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
    backgroundColor: '#F5FCFF',
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

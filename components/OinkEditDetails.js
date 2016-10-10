import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

var DismissKeyboard = require('dismissKeyboard');

class OinkEditDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.medicine.name,
      details: this.props.medicine.details,
    };

    this.updateMedicine = this.updateMedicine.bind(this);

  }

  updateMedicine() {
    DismissKeyboard()
    this.props.updateMedicine(this.state.name, this.state.details);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.header}>
          {this.props.medicine.name}
        </Text>
        <TextInput
          style={styles.detailsTextInput}
          onChangeText={(text) => this.setState({details: text})}
          value={this.state.details}/>

        <Text 
          style={styles.saveButton}
          onPress={this.updateMedicine}>
          Save
        </Text>
      </View>
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
  header: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  detailsText: {
    color: '#333',
    fontSize: 20,
    marginBottom: 10,
  },
  detailsTextInput: {
    height: 40,
    alignSelf: 'stretch',
    margin: 10,
    color: '#333',
    borderColor: 'gray',
    borderWidth: 1,
  },
  saveButton: {
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#f9dbea',
    fontSize: 25,
    padding: 10,
    justifyContent: 'flex-end',
  },
});

module.exports = OinkEditDetails;
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

    if (this.props.medicine) {
      this.state = this.props.medicine;
    } else {
      this.state = {
        name: '',
        details: '',
      };
    }
  }

  updateMedicine = () => {
    DismissKeyboard();
    this.props.updateMedicine(this.state.name, this.state.details);
    this.props.navigator.pop();
  }

  deleteMedicine = () => {
    DismissKeyboard();
    this.props.deleteMedicine(this.state.name);
    this.props.navigator.push({id: 'list'});
  }

  render() {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.header}>
          {this.state.name}
        </Text>
        <TextInput
          style={styles.detailsTextInput}
          autoCapitalize="words"
          placeholder="Item Name"
          onChangeText={(text) => this.setState({name: text})}
          value={this.state.name}/>
        <TextInput
          style={styles.detailsTextInput}
          placeholder="Details"
          onChangeText={(text) => this.setState({details: text})}
          value={this.state.details}/>

        <View style={styles.buttonContainer}>
          <Text 
            style={styles.saveButton}
            onPress={this.updateMedicine}>
            Save
          </Text>
          <Text
            style={styles.deleteButton}
            onPress={this.deleteMedicine}>
            Delete
          </Text>
        </View>

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
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#212D40',
    color: '#fff',
    alignSelf: 'stretch',
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  saveButton: {
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#f9dbea',
    fontSize: 25,
    padding: 10,
    margin: 10,
    justifyContent: 'flex-end',
  },
  deleteButton: {
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#d60000',
    fontSize: 25,
    padding: 10,
    margin: 10,
    justifyContent: 'flex-end',
  },
});

module.exports = OinkEditDetails;
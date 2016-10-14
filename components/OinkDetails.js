import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var DismissKeyboard = require('dismissKeyboard');

class OinkDetails extends Component {
  constructor(props) {
    super(props);

  }

  deleteMedicine = () => {
    DismissKeyboard();
    this.props.deleteMedicine(this.props.medicine.name);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.navbar}>
          <Text 
            style={styles.navItem}
            onPress={() => {
              this.props.navigator.pop();
            }}>&lt;</Text>

          <View style={styles.navSub}>
            <Text
              style={styles.navDeleteItem}
              onPress={this.deleteMedicine}>X</Text>
            <Text 
              style={styles.navItem}
              onPress={() => {
                this.props.navigator.push({id: 'edit', medicineName: this.props.medicine.name});
              }}>/</Text>
          </View>
        </View>
        <Text style={styles.header}>
          {this.props.medicine.name}
        </Text>
        <Text style={styles.detailsText}>
          {this.props.medicine.details}
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
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#212D40',
    alignSelf: 'stretch',
    padding: 10,
  },
  navItem: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  navDeleteItem: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 40,
  },
  navSub: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
});

module.exports = OinkDetails;
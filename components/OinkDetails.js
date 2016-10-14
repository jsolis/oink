import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class OinkDetails extends Component {
  constructor(props) {
    super(props);

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
          <Text 
            style={styles.navItem}
            onPress={() => {
              this.props.navigator.push({id: 'edit', medicineName: this.props.medicine.name});
            }}>/</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
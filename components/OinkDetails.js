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
});

module.exports = OinkDetails;
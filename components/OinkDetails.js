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
        <Text 
          style={styles.editButton}
          onPress={() => {
            this.props.navigator.push({id: 'edit', medicineName: this.props.medicine.name});
          }}>
          Edit
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
  editButton: {
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#f9dbea',
    fontSize: 25,
    padding: 10,
    justifyContent: 'flex-end',
  },
});

module.exports = OinkDetails;
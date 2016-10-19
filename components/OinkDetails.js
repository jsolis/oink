import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

var DismissKeyboard = require('dismissKeyboard');

class OinkDetails extends Component {
  constructor(props) {
    super(props);

  }

  deleteMedicine = () => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${this.props.medicine.name}`,
      [
        {text: 'Keep'},
        {
          text: 'Delete', 
          onPress: () => {
            DismissKeyboard();
            this.props.navigator.pop();
            this.props.deleteMedicine(this.props.medicine.name);
          }
        }
      ]
    );
  };

  takeMedicine = () => {
    this.props.takeMedicine(this.props.medicine.name);
  };

  formatDate = (date) => {
    const dayOfWeekArr = [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'
    ];
    const monthArr = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    let dateObj = new Date(date);

    let dayOfWeek = dayOfWeekArr[dateObj.getDay()];
    let month = monthArr[dateObj.getMonth()];
    let dayOfMonth = dateObj.getDate();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();

    return `${dayOfWeek} ${month} ${dayOfMonth} ${hour}:${minute}`;
  };

  render() {
    let lastTakenProps = this.props.medicine.lastTaken;
    let lastTaken =  lastTakenProps ? this.formatDate(lastTakenProps) : 'never';
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.navbar}>
          <Text 
            style={styles.navItemBack}
            onPress={() => {
              this.props.navigator.pop();
            }}>&lt;</Text>

          <View style={styles.navSub}>
            <Text
              style={styles.navItem}
              onPress={this.deleteMedicine}>Delete</Text>
            <Text 
              style={styles.navItem}
              onPress={() => {
                this.props.navigator.push({id: 'edit', medicineName: this.props.medicine.name});
              }}>Edit</Text>
            <Text
              style={styles.navItem}
              onPress={this.takeMedicine}>Take</Text>
          </View>
        </View>

        <Text style={styles.header}>
          {this.props.medicine.name}
        </Text>

        <View style={styles.detailsSectionContainer}>
          <Text style={styles.detailsHeader}>
            Last Taken
          </Text>
          <Text style={styles.detailsText}>
            {lastTaken}
          </Text>
        </View>

        <View style={styles.detailsSectionContainer}>
          <Text style={styles.detailsHeader}>
            Dosage Info
          </Text>
          <Text style={styles.detailsText}>
            {this.props.medicine.dose} / {this.props.medicine.frequency}
          </Text>
        </View>

        <View style={styles.detailsSectionContainer}>
          <Text style={styles.detailsHeader}>
            Priority
          </Text>
          <Text style={styles.detailsText}>
            {this.props.medicine.priority}
          </Text>
        </View>

        <View style={styles.detailsSectionContainer}>
          <Text style={styles.detailsHeader}>
            Details
          </Text>
          <Text style={styles.detailsText}>
            {this.props.medicine.details}
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
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#212D40',
    alignSelf: 'stretch',
    padding: 10,
  },
  navItemBack: {
    fontSize: 25,
    color: '#fff',
  },
  navItem: {
    fontSize: 25,
    color: '#fff',
    marginLeft: 30,
    marginRight: 5,
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
  detailsSectionContainer: {
    backgroundColor: '#EAD7D1',
    borderColor: '#333',
    borderWidth: 1,
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  detailsHeader: {
    color: '#4F7CAC',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    color: '#4F7CAC',
    fontSize: 20,
    marginBottom: 10,
  },
});

module.exports = OinkDetails;
import React, { Component } from 'react';

import {
  Alert,
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  List,
  Right,
  Text,
  Title,
  View,
} from 'native-base';

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
    let minute = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

    return `${dayOfWeek} ${month} ${dayOfMonth} ${hour}:${minute}`;
  };

  render() {
    let lastTakenProps = this.props.medicine.lastTaken;
    let lastTaken =  lastTakenProps ? this.formatDate(lastTakenProps) : 'never';
    return (
      <Container style={styles.detailsContainer}>
        <Header backgroundColor='#212D40'>
          <Left>
            <Button 
              transparent
              onPress={this.props.navigator.pop}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.medicine.name}</Title>
          </Body>
          <Right>
            <Button 
              transparent
              onPress={this.deleteMedicine}>
              <Icon name='trash' />
            </Button>
            <Button 
              transparent
              onPress={() => {
                this.props.navigator.push({id: 'edit', medicineName: this.props.medicine.name});
              }}>
              <Icon name='create' />
            </Button>
            <Button 
              transparent
              onPress={this.takeMedicine}>
              <Icon name='nutrition' />
            </Button>
          </Right>
        </Header>

        <Content>
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

          {!!this.props.medicine.details && 
            <View style={styles.detailsSectionContainer}>
              <Text style={styles.detailsHeader}>
                Details
              </Text>
              <Text style={styles.detailsText}>
                {this.props.medicine.details}
              </Text>
            </View>
          }
        </Content>
      </Container>
    );
  }
}

OinkDetails.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  medicine: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    dose: React.PropTypes.string.isRequired,
    frequency: React.PropTypes.string.isRequired,
    priority: React.PropTypes.string.isRequired,
    details: React.PropTypes.string.isRequired,
  }).isRequired,
  deleteMedicine: React.PropTypes.func.isRequired,
  takeMedicine: React.PropTypes.func.isRequired,
};

const styles = {
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  detailsSectionContainer: {
    backgroundColor: '#EAD7D1',
    borderColor: '#333',
    borderWidth: 1,
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
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
};

module.exports = OinkDetails;
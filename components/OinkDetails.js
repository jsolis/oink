import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Modal,
  Picker,
} from 'react-native';
import {
  ActionSheet,
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

const Item = Picker.Item;

const DismissKeyboard = require('dismissKeyboard');

import { formatDate } from '../utils/dateFormats';

class OinkDetails extends Component {
  constructor(props) {
    super(props);

    const now = new Date();

    this.state = {
      takenModalVisible: false,
      takenHour: now.getHours(),
      takenMinutes: now.getMinutes(),
    };
  }

  setTakenModalVisible = (visible) => {
    this.setState({takenModalVisible: visible});
  }

  onHourChange = (key, value) => {
    this.setState({takenHour: value});
  }

  onMinuteChange = (key, value) => {
    this.setState({takenMinutes: value});
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
            this.props.deleteMedicine(this.props.medicine._key);
          }
        }
      ]
    );
  };

  takeMedicine = () => {
    this.props.takeMedicine(this.props.medicine._key, this.state.takenHour, this.state.takenMinutes);
    this.setTakenModalVisible(false);
  };

  componentDidMount() {
    this.props.updateHistoryRefAndListen(this.props.medicine._key);
  }

  componentWillUnmount() {
    this.props.stopListenForHistory();
  }

  render() {

    const lastTakenProps = this.props.medicine.lastTaken;
    const lastTaken =  lastTakenProps ? formatDate(lastTakenProps) : 'never';

    const hourItems = [];
    for (let i=0; i < 24; i++) {
      hourItems.push(<Item label={String(i)} value={i} key={i} />);
    }

    const minutesItems = [];
    for (let i=0; i < 60; i++) {
      const label = i < 10 ? '0' + i : String(i);
      minutesItems.push(<Item label={label} value={i} key={i} />);
    }

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
                this.props.navigator.push({id: 'edit', medicineKey: this.props.medicine._key});
              }}>
              <Icon name='create' />
            </Button>
            <Button
              transparent
              onPress={() => ActionSheet.show(
                {
                  options: [
                    `Now (${this.state.takenHour}:${this.state.takenMinutes})`,
                    'Pick Time',
                    'Cancel',
                  ],
                  cancelButtonIndex: 2,
                  title: 'When was this taken',
                },
                (buttonIndex) => {
                  buttonIndex = Number(buttonIndex);
                  if (buttonIndex === 0) {
                    this.takeMedicine();
                  } else if (buttonIndex === 1) {
                    this.setTakenModalVisible(true);
                  }
                }
              )}
            >
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

          {!!this.props.medicineHistory && this.props.medicineHistory.length > 0 &&
            <View style={styles.detailsSectionContainer}>
              <Text style={styles.detailsHeader}>
                History
              </Text>
              <List 
                dataArray={this.props.medicineHistory}
                renderRow={(rowData) => {
                  const { dateTaken, dose } = rowData;
                  const dateTakenFormatted = formatDate(dateTaken);
                  return (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={styles.detailsText}>{dateTakenFormatted}</Text>
                      <Text style={styles.detailsText}>{dose}</Text>
                    </View>
                  );
                }} />
            </View>
          }
        </Content>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.takenModalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.takenModal}>
            <View>
              <Text style={{fontWeight: 'bold'}}>When was this taken?</Text>
            </View>
            <View style={styles.takenModalRow}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.takenHour}
                onValueChange={this.onHourChange.bind(this, 'takenHour')}
              >
                {hourItems}
              </Picker>
              <Text>:</Text>
              <Picker
                style={styles.picker}
                selectedValue={this.state.takenMinutes}
                onValueChange={this.onMinuteChange.bind(this, 'takenMinutes')}
              >
                {minutesItems}
              </Picker>
            </View>

            <View style={styles.takenModalRow}>
              <Button 
                onPress={() => this.setTakenModalVisible(!this.state.takenModalVisible) }
                style={{backgroundColor: 'gray'}}
              >
                <Text>Cancel</Text>
              </Button>
              <Button onPress={this.takeMedicine}>
                <Text>Take</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

OinkDetails.propTypes = {
  navigator: PropTypes.object.isRequired,
  medicine: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dose: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
  deleteMedicine: PropTypes.func.isRequired,
  takeMedicine: PropTypes.func.isRequired,
  updateHistoryRefAndListen: PropTypes.func.isRequired,
  stopListenForHistory: PropTypes.func.isRequired,
  medicineHistory: PropTypes.array.isRequired,
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
  takenModal: {
    backgroundColor: 'white',
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
    padding: 25,
  },
  takenModalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    alignSelf: 'stretch',
    width: '45%',
  },
};

module.exports = OinkDetails;
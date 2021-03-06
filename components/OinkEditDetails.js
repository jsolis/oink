import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Picker,
  Keyboard,
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  View,
} from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';

const platform = Platform.OS;

const Item = Picker.Item;

class OinkEditDetails extends Component {
  constructor(props) {
    super(props);

    this.isNew = !(!!this.props.medicine && !!this.props.medicine.name);

    if (this.props.medicine) {
      this.state = this.props.medicine;
    } else {
      this.state = {
        name: '',
        dose: '',
        frequency: '',
        priority: 'must',
        details: '',
      };
    }
  }

  saveMedicine = () => {
    Keyboard.dismiss();
    if (this.isNew) {
      this.props.addMedicine(this.state);
      this.props.navigator.pop();
    } else {
      this.props.updateMedicine(this.state);
      this.props.navigator.replacePreviousAndPop({id: 'details', medicineKey: this.state._key});
    }
  }

  onValueChange = (key, value) => {
    this.setState({priority: value});
  }

  render() {
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
            <Title>{this.state.name}</Title>
          </Body>
          <Right>
            <Button 
              transparent
              onPress={this.saveMedicine}>
              <FontAwesome name='save'
                size={(platform === 'ios') ? 30 : 28}
                color={(platform === 'ios') ? '#007aff' : '#fff'} />
            </Button>
          </Right>
        </Header>

        <Content>
          <TextInput
            style={styles.detailsTextInput}
            autoCapitalize="words"
            placeholder="Item Name"
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}/>

          <TextInput
            style={styles.detailsTextInput}
            placeholder="Dose"
            onChangeText={(text) => this.setState({dose: text})}
            value={this.state.dose}/>

          <TextInput
            style={styles.detailsTextInput}
            placeholder="Frequency"
            onChangeText={(text) => this.setState({frequency: text})}
            value={this.state.frequency}/>

          <Picker
            style={styles.picker}
            selectedValue={this.state.priority}
            onValueChange={this.onValueChange.bind(this, 'priority')}>
            <Item label="Must Take" value="must" />
            <Item label="Should Take" value="should" />
            <Item label="Can Take" value="can" />
          </Picker>

          <TextInput
            style={styles.detailsTextInput}
            placeholder="Details"
            onChangeText={(text) => this.setState({details: text})}
            value={this.state.details}/>

          <View style={styles.buttonContainer}>
            <Button 
              iconLeft 
              dark
              onPress={this.saveMedicine}
            >
              <FontAwesome name='save'
                size={(platform === 'ios') ? 30 : 28}
                color='#fff' />
              <Text style={{marginLeft: 5}}>Save</Text>
            </Button>
          </View>

        </Content>

      </Container>
    );
  }
}

OinkEditDetails.propTypes = {
  navigator: PropTypes.object.isRequired,
  medicine: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dose: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }),
  addMedicine: PropTypes.func.isRequired,
  updateMedicine: PropTypes.func.isRequired,
};

const styles = {
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  detailsTextInput: {
    height: 40,
    alignSelf: 'stretch',
    margin: 10,
    color: '#333',
  },
  picker: {
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

module.exports = OinkEditDetails;
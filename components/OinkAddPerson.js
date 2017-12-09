import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  TextInput,
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
  List,
  Right,
  Text,
  Title,
  View,
} from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';

const platform = Platform.OS;

const DismissKeyboard = require('dismissKeyboard');

class OinkAddPerson extends Component {

  constructor(props) {
    super(props);

    this.isNew = !(!!this.props.person && !!this.props.person.name);

    if (this.props.person) {
      this.state = this.props.person;
    } else {
      this.state = {
        name: '',
      };
    }
  }

  addPerson = () => {
    Keyboard.dismiss();
    if (this.isNew) {
      this.props.addPerson(this.state);
      this.props.navigator.pop();
    } else {
      this.props.updatePerson(this.state);
      this.props.navigator.pop();
    }
  }

  deletePerson = () => {
    if (this.props.person._key) {
      Alert.alert(
        'Delete',
        `Are you sure you want to delete ${this.props.person.name}`,
        [
          {text: 'Keep'},
          {
            text: 'Delete', 
            onPress: () => {
              DismissKeyboard();
              this.props.deletePerson(this.props.person._key);
              this.props.navigator.pop();
            }
          }
        ]
      );
    }
  }

  render() {
    return (
      <Container style={styles.addPersonContainer}>

        <Header backgroundColor='#212D40'>
          <Left>
            <Button 
              transparent
              onPress={this.props.navigator.pop}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add Person</Title>
          </Body>
          <Right>
            {!this.isNew &&
              <Button
                transparent
                onPress={this.deletePerson}
              >
                <Icon name="trash" />
              </Button>
            }
            <Button 
              transparent
              onPress={() => this.addPerson(this.state)}>
              <FontAwesome name='save'
                size={(platform === 'ios') ? 30 : 28}
                color={(platform === 'ios') ? '#007aff' : '#fff'} />
            </Button>
          </Right>
        </Header>

        <Content>

          <TextInput
            style={styles.textInput}
            autoCapitalize="words"
            placeholder="Person's Name"
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}/>

          <View style={styles.buttonContainer}>
            <Button
              iconLeft
              dark
              onPress={() => this.addPerson(this.state)}
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

OinkAddPerson.propTypes = {
  navigator: PropTypes.object.isRequired,
  addPerson: PropTypes.func,
  deletePerson: PropTypes.func,
  updatePerson: PropTypes.func,
  person: PropTypes.object,
};

const styles = {
  addPersonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  textInput: {
    height: 40,
    alignSelf: 'stretch',
    margin: 10,
    color: '#333',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

module.exports = OinkAddPerson;
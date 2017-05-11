import React, { Component } from 'react';
import {
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
  navigator: React.PropTypes.object.isRequired,
  addPerson: React.PropTypes.func,
  updatePerson: React.PropTypes.func,
  person: React.PropTypes.object,
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
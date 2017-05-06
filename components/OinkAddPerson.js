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
} from 'native-base';

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
      // TODO (might want to pop navigator here too)
      //this.props.updatePerson(this.state);
      //this.props.navigator.replacePreviousAndPop({id: 'list'});
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
              onPress={() => this.addPerson({name: 'Ayla'})}>
              <Icon name='create' />
            </Button>
          </Right>
        </Header>

        <Content>
          <Text>Add Person Here</Text>

          <TextInput
            style={styles.textInput}
            autoCapitalize="words"
            placeholder="Person's Name"
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}/>

          <Button
            iconLeft
            dark
            onPress={() => this.addPerson(this.state)}
          >
            <Icon name='create' />
            <Text>Add</Text>
          </Button>
        </Content>

      </Container>
    );
  }
}

OinkAddPerson.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  addPerson: React.PropTypes.func.isRequired,
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
};

module.exports = OinkAddPerson;
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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const DismissKeyboard = require('dismissKeyboard');

class OinkChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  render() {
    return (
      <Container>

        <Header backgroundColor='#212D40'>
          <Left>
            <Button 
              transparent
              onPress={this.props.navigator.pop}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Chat</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <KeyboardAwareScrollView
            ref="scroll"
            onLayout={this.onScrollViewLayout}
          >
            <Text>Messages here</Text>
            <TextInput
              style={styles.chatTextInput}
              autoCapitalize="words"
              placeholder="Write something"
              onChangeText={text => this.setState({message: text})}
              value={this.state.name}
            />
          </KeyboardAwareScrollView>

        </Content>

      </Container>
    );
  }
}

OinkChat.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

const styles = {
  chatContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  chatTextInput: {
    height: 40,
    alignSelf: 'stretch',
    margin: 10,
    color: '#333',
  },
};

module.exports = OinkChat;

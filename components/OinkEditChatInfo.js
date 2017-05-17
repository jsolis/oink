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
  ListItem,
  Right,
  Text,
  Title,
  View,
} from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';

const platform = Platform.OS;

class OinkEditChatInfo extends Component {
  constructor(props) {
    super(props);

    this.isNew = !this.props.chatName;

    this.state = {
      chatName: this.props.chatName,
    };
  }

  saveChatName = () => {
    this.props.saveChatName(this.state.chatName);
    if (this.isNew) {
      this.props.navigator.replace({id: 'chat'});
    } else {
      this.props.navigator.pop();
    }
  }

  render() {
    return (
      <Container style={styles.chatContainer}>

        <Header backgroundColor='#212D40'>
          <Left>
            <Button 
              transparent
              onPress={this.props.navigator.pop}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Chat Profile</Title>
          </Body>
          <Right>
            <Button 
              transparent
              onPress={() => this.saveChatName()}
            >
              <FontAwesome name='save'
                size={(platform === 'ios') ? 30 : 28}
                color={(platform === 'ios') ? '#007aff' : '#fff'}
              />
            </Button>
          </Right>
        </Header>

        <Content>
          <Text>
            Pick a name to use in the chat.
          </Text>
          <TextInput
            style={styles.chatTextInput}
            autoCapitalize="words"
            placeholder="Pick a Name"
            returnKeyType="done"
            onChangeText={chatName => this.setState({chatName})}
            onSubmitEditing={this.saveChatName}
            value={this.state.chatName}
          />
        </Content>

      </Container>
    );
  }
}

OinkEditChatInfo.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  chatName: React.PropTypes.string,
  saveChatName: React.PropTypes.func.isRequired,
};

const styles = {
  chatContainer: {
    backgroundColor: '#efefef',
  },
  chatTextInput: {
    height: 40,
    alignSelf: 'stretch',
    margin: 10,
    color: '#333',
  },
};

module.exports = OinkEditChatInfo;

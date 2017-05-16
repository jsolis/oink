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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import moment from 'moment';

class OinkChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      newChatName: '',
    };
  }

  sendChatMessage = () => {
    this.props.sendChatMessage(this.state.message, this.props.chatName);
    this.state.message = '';
  }

  saveChatName = () => {
    this.setState({newChatName: ''});
    this.props.saveChatName(this.state.newChatName);
  }

  clearChatName = () => {
    this.setState({newChatName: ''});
    this.props.saveChatName('');
  }

  render() {
    let content;
    if (!this.props.chatName) {
      content = (
        <Content>
          <Text>
            Pick a name to use in the chat.
          </Text>
          <TextInput
            style={styles.chatTextInput}
            autoCapitalize="words"
            placeholder="Pick a Name"
            returnKeyType="done"
            onChangeText={newChatName => this.setState({newChatName})}
            onSubmitEditing={this.saveChatName}
            value={this.state.newChatName}
          />
        </Content>
      );
    } else {
      let _scrollView;
      content = (
        <KeyboardAwareScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          onContentSizeChange={() => _scrollView.scrollToEnd({animated: true})}
        >
          <List
            dataArray={this.props.messages}
            renderRow={(message) =>
              <ListItem
                avatar
              >
                <Left>
                  {message.name === 'Oink Bot' ?
                    <MaterialCommunityIcons 
                      name='pig'
                      style={{ color:'#FFA4D0', fontSize: 28 }}
                    />
                  :
                    <Icon name='person' style={{ fontSize: 28 }} />
                  }
                </Left>
                <Body>
                  <Text>{message.message}</Text>
                  <Text note>{message.name}</Text>
                </Body>
                <Right>
                  <Text note>{moment(message.timestamp).from(Date.now())}</Text>
                </Right>
              </ListItem>
            }
          />
          <TextInput
            style={styles.chatTextInput}
            autoCapitalize="sentences"
            placeholder="Write something"
            returnKeyType="done"
            onChangeText={text => this.setState({message: text})}
            onSubmitEditing={this.sendChatMessage}
            value={this.state.message}
          />
        </KeyboardAwareScrollView>
      );
    }

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
          <Right>
            <Button 
              transparent
              onPress={() => this.saveChatName('')}>
              <Text>Change Name</Text>
            </Button>
          </Right>
        </Header>

        {content}

      </Container>
    );
  }
}

OinkChat.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  messages: React.PropTypes.array.isRequired,
  messagesLoading: React.PropTypes.bool.isRequired,
  sendChatMessage: React.PropTypes.func.isRequired,
  chatName: React.PropTypes.string,
  saveChatName: React.PropTypes.func.isRequired,
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

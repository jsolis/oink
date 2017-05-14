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

const DismissKeyboard = require('dismissKeyboard');

class OinkChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      scrollViewHeight: 0,
      inputHeight: 0,
      newChatName: '',
    };
  }

  onScrollViewLayout = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({
      scrollViewHeight: layout.height,
    });
  }

  onInputLayout = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({
      inputHeight: layout.height,
    });
  }

  scrollToBottom(animate = true) {
    const { scrollViewHeight, inputHeight } = this.state;
    const { chatHeight } = this.props;

    const scrollTo = chatHeight - scrollViewHeight + inputHeight;

    if (scrollTo > 0) {
      this.refs.scroll.scrollToPosition(0, scrollTo, animate)
    }
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
        <View>
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
        </View>
      );
    } else {
      content = (
        <KeyboardAwareScrollView
          ref="scroll"
          onLayout={this.onScrollViewLayout}
        >
          <List
            dataArray={this.props.messages}
            renderRow={(message) =>
              <ListItem
                icon
              >
                <Left>
                  {message.name === 'Oink Bot' ?
                    <MaterialCommunityIcons 
                      name='pig'
                      color='#FFA4D0'
                      size={28}
                    />
                  :
                    <Icon name='person' />
                  }
                </Left>
                <Body>
                  <Text style={styles.chatMessage}>{message.message}</Text>
                  <Text style={styles.chatName}>{message.name}</Text>
                </Body>
              </ListItem>
            }
          />
          <TextInput
            style={styles.chatTextInput}
            autoCapitalize="sentences"
            placeholder="Write something"
            returnKeyType="done"
            onLayout={this.onInputLayout}
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

        <Content>

          {content}

        </Content>

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
  chatMessage: {

  },
  chatName: {
    fontSize: 12,
    color: '#333',
  },
};

module.exports = OinkChat;

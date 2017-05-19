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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import moment from 'moment';

class OinkChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  sendChatMessage = () => {
    this.props.sendChatMessage(this.state.message, this.props.chatInfo);
    this.state.message = '';
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
            <Title>Chat</Title>
          </Body>
          <Right>
            <Button 
              transparent
              onPress={() => this.props.navigator.push({id: 'editChatInfo'})}>
              <Text>Change Name</Text>
            </Button>
          </Right>
        </Header>

        <KeyboardAwareScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          onContentSizeChange={() => _scrollView.scrollToEnd({animated: true})}
        >
          <List
            dataArray={this.props.messages}
            renderRow={(message) => {
              message.chatInfo = message.chatInfo || {};
              return (
                <ListItem
                  avatar
                >
                  <Left>
                    {(message.chatInfo.chatName === 'Oink Bot'
                      || message.name === 'Oink Bot')
                      && !message.chatInfo.icon ?
                      <MaterialCommunityIcons 
                        name='pig'
                        style={{ color:'#FFA4D0', fontSize: 28 }}
                      />
                    :
                      <Icon 
                        name={message.chatInfo.icon || 'person'}
                        style={{ fontSize: 28, color: message.chatInfo.iconColor, width: 31 }}
                      />
                    }
                  </Left>
                  <Body>
                    <Text>{message.message}</Text>
                    <Text note>{message.name || message.chatInfo.chatName}</Text>
                  </Body>
                  <Right>
                    <Text note>{moment(message.timestamp).from(Date.now())}</Text>
                  </Right>
                </ListItem>
              );
            }}
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

      </Container>
    );
  }
}

OinkChat.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  messages: React.PropTypes.array.isRequired,
  messagesLoading: React.PropTypes.bool.isRequired,
  sendChatMessage: React.PropTypes.func.isRequired,
  chatInfo: React.PropTypes.shape({
    chatName: React.PropTypes.string,
    icon: React.PropTypes.string,
    iconColor: React.PropTypes.string,
  }).isRequired,
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

module.exports = OinkChat;

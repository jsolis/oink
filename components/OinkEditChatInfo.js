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
import { ColorPicker, fromHsv } from 'react-native-color-picker';

const platform = Platform.OS;

class OinkEditChatInfo extends Component {
  constructor(props) {
    super(props);

    this.isNew = !this.props.chatName;

    this.state = {
      chatName: this.props.chatName,
      iconColor: '#000000',
    };

    this.icons = [
      "american-football",
      "aperture",
      "basketball",
      "beer",
      "bicycle",
      "boat",
      "bonfire",
      "bowtie",
      "bug",
      "bulb",
      "bus",
      "cafe",
      "car",
      "cart",
      "cash",
      "clock",
      "cloudy",
      "cloudy-night",
      "cog",
    ];
  }

  saveChatName = () => {
    this.props.saveChatName(this.state.chatName);
    if (this.isNew) {
      this.props.navigator.replace({id: 'chat'});
    } else {
      this.props.navigator.pop();
    }
  }

  updateIconColor = (iconColor) => {
    this.setState({iconColor});
  }

  render() {
    const icons = this.icons.map(icon => (
      <Button
        transparent
        style={{padding: 10}}
        key={icon}
        onPress={() => alert(icon)}
      >
        <Icon style={{color: this.state.iconColor}} name={icon} />
      </Button>
    ));

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

        <Content padder>
          <Text style={{fontWeight: 'bold'}}>
            Pick a name
          </Text>
          <TextInput
            style={styles.chatTextInput}
            autoCapitalize="words"
            placeholder="Pick a Name"
            returnKeyType="done"
            onChangeText={chatName => this.setState({chatName})}
            value={this.state.chatName}
          />

          <Text style={{fontWeight: 'bold'}}>
            Pick an icon
          </Text>
          <View style={styles.iconWrapper}>
            {icons}
          </View>

          <Text style={{fontWeight: 'bold'}}>
            Pick an icon color
          </Text>
          <View style={{height: 300, padding: 25, marginBottom: 25}}>
            <ColorPicker
              onColorChange={color => this.updateIconColor(fromHsv(color))}
              onColorSelected={color => this.updateIconColor(color)}
              style={{flex: 1}}
            />
          </View>
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
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10,
  },
};

module.exports = OinkEditChatInfo;

import React, { Component } from 'react';
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

class OinkManagePeople extends Component {

  constructor(props) {
    super(props);
  }

  foobar = () => {
  }

  render() {
    return (
      <Container style={styles.managePeopleContainer}>

        <Header backgroundColor='#212D40'>
          <Left>
            <Button 
              transparent
              onPress={this.props.navigator.pop}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Manage People</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={this.props.people}
            renderRow={(person) =>
              <ListItem icon>
                <Left>
                  <Icon name="person" />
                </Left>
                <Body>
                  <Text>{person.name}</Text>
                </Body>
              </ListItem>
            }
          />
          
        </Content>

      </Container>
    );
  }
}

OinkManagePeople.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  people: React.PropTypes.array.isRequired,
};

const styles = {
  managePeopleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
};

module.exports = OinkManagePeople;
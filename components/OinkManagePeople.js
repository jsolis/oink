import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
              <ListItem 
                icon
                onPress={() => this.props.navigator.push({id: 'editPerson', personKey: person._key})}
              >
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
  navigator: PropTypes.object.isRequired,
  people: PropTypes.array.isRequired,
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
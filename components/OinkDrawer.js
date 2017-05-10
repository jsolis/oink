import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  H1,
  Icon,
  ListItem,
  Left,
} from 'native-base';

class OinkDrawer extends Component {

  render() {
    const people = this.props.people.map(person =>
      <ListItem icon key={person.name} onPress={() => {
        this.props.switchPerson(person._key);
        this.props.closeDrawer();
      }}>
        <Left>
          <Icon name='person' />
        </Left>
        <Body>
          <Text>{person.name}</Text>
        </Body>
      </ListItem>
    );

    return (
      <Container style={styles.drawerContainer}>

        <Content style={styles.content}>
          <View style={styles.headerWrapper}>
            <H1 style={styles.header}>
              Family
            </H1>
          </View>
          {people}
          <ListItem icon onPress={() => this.props.navigator.push({id: 'addPerson'})}>
            <Left>
              <Icon name='person-add' />
            </Left>
            <Body>
              <Text>Add Person</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this.props.navigator.push({id: 'managePeople'})}>
            <Left>
              <Icon name='settings' />
            </Left>
            <Body>
              <Text>Manage People</Text>
            </Body>
          </ListItem>
        </Content>

      </Container>
    );
  }
}

OinkDrawer.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  people: React.PropTypes.array.isRequired,
  switchPerson: React.PropTypes.func.isRequired,
  closeDrawer: React.PropTypes.func.isRequired,
};

const styles = {
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  headerWrapper: {
    alignSelf: 'stretch',
    padding: 25,
    backgroundColor: '#00fffa',
    marginBottom: 10,
  },
  header: {
    alignSelf: 'center',
  },
  content: {
  },
};

module.exports = OinkDrawer;
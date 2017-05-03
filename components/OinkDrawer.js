import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Container,
  Content,
  H1,
  Icon,
} from 'native-base';

class OinkDrawer extends Component {

  render() {
    const people = this.props.people.map(person =>
      <View key={person.name} style={styles.listItem}>
        <Icon name='person' />
        <Text style={styles.listText}>{person.name}</Text>
      </View>
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
          <View style={styles.listItem}>
            <Icon name='person-add' />
            <Text style={styles.listText}>Add Person</Text>
          </View>
          <View style={styles.listItem}>
            <Icon name='settings' />
            <Text style={styles.listText}>Manage People</Text>
          </View>
        </Content>

      </Container>
    );
  }
}

OinkDrawer.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  people: React.PropTypes.array.isRequired,
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
    padding: 15,
    backgroundColor: '#00fffa',
    marginBottom: 10,
  },
  header: {
    alignSelf: 'center',
  },
  content: {
  },
  listItem: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  listText: {
    fontSize: 20,
    marginLeft: 10,
  },
};

module.exports = OinkDrawer;
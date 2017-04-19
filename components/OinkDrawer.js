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
    return (
      <Container style={styles.drawerContainer}>

        <H1 style={styles.header}>
          People
        </H1>

        <Content style={styles.content}>
          <View style={styles.listItem}>
            <Text style={styles.listText}>James</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>Hazel</Text>
          </View>
        </Content>

      </Container>
    );
  }
}

OinkDrawer.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};

const styles = {
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#00fffa',
  },
  header: {
    alignSelf: 'center',
    padding: 10,
  },
  content: {
    marginTop: 10,
  },
  listItem: {
    padding: 5,
    marginLeft: 10,
  },
  listText: {
    fontSize: 20,
  },
};

module.exports = OinkDrawer;
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

        <Content style={styles.content}>
          <View style={styles.headerWrapper}>
            <H1 style={styles.header}>
              Family
            </H1>
          </View>
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
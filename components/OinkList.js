import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight
} from 'react-native';

class OinkList extends Component {

  render() {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.header}>
          {this.props.name}
        </Text>

        <ScrollView>
          <ListView
            dataSource={this.props.dataSource}
            renderRow={(rowData) => {
              return (
                <TouchableHighlight 
                  underlayColor="#e0ffff"
                  style={styles.listItem}
                  onPress={() => {
                    this.props.navigator.push({id: 'details', medicineName: rowData.name});
                  }}>
                  <Text style={styles.listText}>{rowData.name}</Text>
                </TouchableHighlight>
              );
            }} />
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  listItem: {
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#f9dbea',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  listText: {
    color: '#333',
    fontSize: 20,
  },
});

module.exports = OinkList;
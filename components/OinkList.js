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
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  List,
  Right,
} from 'native-base';

class OinkList extends Component {

  addMedicine = () => {
    this.props.navigator.push({id: 'edit'});
  }

  render() {
    return (
      <Container style={StyleSheet.flatten(styles.listContainer)}>
        <Header backgroundColor='#212D40'>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Text>{this.props.name}</Text>
          </Body>
          <Right>
            <Button 
              transparent
              onPress={this.addMedicine}>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>

        <Content>
          <List
            dataArray={this.props.medicineList}
            renderRow={(rowData) => {
              const doseInfo = rowData.dose ? `${rowData.dose} / ${rowData.frequency}` : '';
              return (
                <TouchableHighlight 
                  underlayColor="#e0ffff"
                  style={styles.listItem}
                  onPress={() => this.props.navigator.push({id: 'details', medicineName: rowData.name})
                }>
                  <View style={styles.listItemView}>
                    <Text style={styles['priority'+rowData.priority]}>&nbsp;</Text>
                    <Text style={styles.listTitle}>{rowData.name}</Text>
                    <Text style={styles.listText}>{doseInfo}</Text>
                  </View>
                </TouchableHighlight>
              );
            }} />
        </Content>

        <Footer>
          <FooterTab>
            <Button active>
              <Text>Pill Box</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button>
              <Text>Medine Cabinet</Text>
            </Button>
          </FooterTab>
        </Footer>
        
      </Container>
    );
  }
}

OinkList.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  medicineList: React.PropTypes.array.isRequired,
};

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
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#212D40',
    color: '#fff',
    alignSelf: 'stretch',
  },
  listItem: {
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#EAD7D1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  listItemView: {
    flexDirection: 'row',
  },
  prioritymust: {
    backgroundColor: '#ff0000',
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
  },
  priorityshould: {
    backgroundColor: '#ff7b00',
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
  },
  prioritycan: {
    backgroundColor: '#eef200',
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
  },
  listTitle: {
    color: '#4F7CAC',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  listText: {
    color: '#4F7CAC',
    fontSize: 15,
    textAlignVertical: 'center',
  },
  addButton: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 60,
    width: 60,
  },
});

module.exports = OinkList;
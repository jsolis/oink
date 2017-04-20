import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Drawer,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  List,
  Right,
  Text,
} from 'native-base';
import OinkDrawer from './OinkDrawer';

class OinkList extends Component {

  addMedicine = () => {
    this.props.navigator.push({id: 'edit'});
  }

  openDrawer = () => {
    this._drawer._root.open()
  }

  closeDrawer = () => {
    this._drawer._root.close()
  }

  updateFilter = (filter) => {
    this.props.updateFilter(filter);
  }

  render() {
    return (
      <Container style={styles.listContainer}>

      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<OinkDrawer navigator={this.props.navigator} />}
        onClose={() => this.closeDrawer()}
      >

        <Header backgroundColor='#212D40'>
          <Left>
            <Button 
              transparent
              onPress={this.openDrawer}
            >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerTitle}>{this.props.name}</Text>
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
            <Button
              active
              onPress={() => this.updateFilter('all')}>
              <Icon name='people' />
              <Text>All</Text>
            </Button>
            <Button 
              onPress={() => this.updateFilter('pillBox')}>
              <Text>Pill Box</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button
              onPress={() => this.updateFilter('medicineCabinet')}>
              <Text>Medine Cabinet</Text>
            </Button>
          </FooterTab>
        </Footer>
        
      </Drawer>

      </Container>
    );
  }
}

OinkList.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  medicineList: React.PropTypes.array.isRequired,
  updateFilter: React.PropTypes.func.isRequired,
};

const styles = {
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
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
};

module.exports = OinkList;
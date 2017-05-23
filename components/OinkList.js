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
  Spinner,
  Text,
  Title,
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

  openChat = () => {
    this.props.navigator.push({id: 'chat'});
  }

  updateFilter = (filter) => {
    this.props.updateFilter(filter);
  }

  formatTime = (date) => {
    const dateObj = new Date(date);
    const today = new Date();

    if (dateObj.getMonth() === today.getMonth()
      && dateObj.getDate() === today.getDate()
      && dateObj.getFullYear() === today.getFullYear()) {

      const hour = dateObj.getHours();
      const minute = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
      return `${hour}:${minute}`;
    } else {
      return '';
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    const { listLoading, peopleLoading, people, medicineList, name } = params;
    let content;
    if (listLoading || peopleLoading) {
      content = <View><Spinner color='blue' /></View>;
    } else if (people.length === 0 || !name) {
      content = (
        <View style={{padding: 25}}>
          <Text style={{fontSize: 20}}>Nobody here :-(</Text>
          <Text style={{fontSize: 20}}>Trying adding someone!</Text>
          <Text style={{fontSize: 20}}>Use the drawer on your left.</Text>
        </View>
      );
    } else if (medicineList.length === 0) {
      content = (
        <View style={{padding: 25}}>
          <Text style={{fontSize: 20}}>Welcome {name}</Text>
          <Text style={{fontSize: 20}}>You have not added anything yet.</Text>
          <Text style={{fontSize: 20}}>Trying adding something!</Text>
          <Text style={{fontSize: 20}}>Use the plus sign up top.</Text>
        </View>
      );
    } else {
      content = (
        <View style={styles.listWrapper}>
          <List
            dataArray={medicineList}
            renderRow={(rowData) => {
              const doseInfo = rowData.dose ? `${rowData.dose} / ${rowData.frequency}` : '';
              return (
                <TouchableHighlight 
                  underlayColor="#e0ffff"
                  style={styles.listItem}
                  onPress={() => navigator.push({id: 'details', medicineKey: rowData._key})
                }>
                  <View style={styles.listItemView}>
                    <Text style={styles['priority'+rowData.priority]}>&nbsp;</Text>
                    <View>
                      <Text style={styles.listTitle}>{rowData.name}</Text>
                      <Text style={styles.listText}>{doseInfo}</Text>
                    </View>
                    <View style={styles.listItemViewRight}>
                      <Text style={styles.listText}>{this.formatTime(rowData.lastTaken)}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }} />
        </View>
      );
    }
    return (
      <Container style={styles.listContainer}>

        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<OinkDrawer 
                    navigator={this.props.navigator}
                    people={this.props.people}
                    switchPerson={this.props.switchPerson}
                    closeDrawer={this.closeDrawer}
                  />}
          onClose={() => this.closeDrawer()}
          panOpenMask={.25}
          panCloseMask={.25}
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
              <Title>{this.props.name}</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={this.openChat}>
                <Icon name='chatboxes' />
              </Button>
              <Button 
                transparent
                onPress={this.addMedicine}>
                <Icon name='add' />
              </Button>
            </Right>
          </Header>

          <Content>
            {content}
          </Content>

          <Footer>
            <FooterTab>
              <Button
                active={this.props.filter === 'all'}
                onPress={() => this.updateFilter('all')}>
                <Icon name='people' />
                <Text>All</Text>
              </Button>
              <Button 
                active={this.props.filter === 'pillBox'}
                onPress={() => this.updateFilter('pillBox')}>
                <Text>Pill Box</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button
                active={this.props.filter === 'medicineCabinet'}
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
  people: React.PropTypes.array.isRequired,
  medicineList: React.PropTypes.array.isRequired,
  updateFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired,
  peopleLoading: React.PropTypes.bool.isRequired,
  listLoading: React.PropTypes.bool.isRequired,
  switchPerson: React.PropTypes.func.isRequired,
};

const styles = {
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFA4D0',
  },
  listWrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
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
  },
  listItemView: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  listItemViewRight: {
    marginLeft: 'auto',
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
  },
  listText: {
    color: '#4F7CAC',
    fontSize: 15,
    textAlignVertical: 'center',
  },
};

module.exports = OinkList;
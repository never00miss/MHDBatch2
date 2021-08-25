import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertDateOnly, convertTimestamp } from '../../utils/date'

class InboxScreen extends Component {
  constructor(){
    super()
    this.state= {
      inbox: []
    }
  }

  
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('inbox')
      if(jsonValue != null){
        const data = JSON.parse(jsonValue)
        console.log(data)
        const dataSort = data.sort((a, b)=>{
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          
          return convertTimestamp(new Date(JSON.parse(b.sentTime || b.from))) - convertTimestamp(new Date(JSON.parse(a.sentTime || a.from)));
        })
        this.setState({
          inbox: dataSort
        })
      }
    } catch(e) {
      console.log(e)
    }
  }


  componentDidMount(){
    this.getData()
  }

  render() {
    const { inbox } = this.state
    return (
      <ScrollView style={styles.container}>
        { inbox.map((value, index)=>{
            return(
              <View key={index} style={styles.list}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>{value.title}</Text>
                  <Text>{value.body}</Text>
                </View>
                {value.sentTime
                  ? <Text>{convertDateOnly(new Date(JSON.parse(value.sentTime)))}</Text>
                  : <Text>{convertDateOnly(new Date(JSON.parse(value.from)))}</Text>
                }
              </View>
            )
          })
        }
      </ScrollView>
    );
  }
}

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 0.2
  }
});

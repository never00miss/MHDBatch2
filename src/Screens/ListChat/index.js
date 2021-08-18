import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import CText from '../../component/CText';

class ListChat extends Component {
  constructor(){
    super()
    this.state = {
      Users: []
    }
  }

  async componentDidMount(){
    const uid = await Auth().currentUser.uid
    Firestore().collection('Users').onSnapshot((value)=>{
      this.setState({
        Users: value.docs.map(result=>{
          return result.data()
        })
      })
    })
  }

  render() {
    const { Users } = this.state
    return (
      <View>
        {Users.map((value, index)=>{
          return(
            <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('Chat', value)} style={styles.list}>
              <CText style={{color:'black'}}>{value.nama.toUpperCase()}</CText>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}

export default ListChat;

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0.4,
    elevation: 4
  }
})
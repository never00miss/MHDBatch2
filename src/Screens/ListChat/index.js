import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import CText from '../../component/CText';
import { connect } from 'react-redux';

class ListChat extends Component {
  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

  async componentDidMount(){
    Firestore()
      .collection('Users')
      .doc(this.props.user.uid)
	  .collection('chatWith')
	  .onSnapshot(raes=>console.log(raes))
  }

  render() {
    const { messages } = this.state
    return (
      <View>
		  <Text>asdasd</Text>
        {/* {messages.map((value, index)=>{
          return(
            <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('Chat', value)} style={styles.list}>
              <CText style={{color:'black'}}>{value.nama.toUpperCase()}</CText>
            </TouchableOpacity>
          )
        })} */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.dashboardReducers.user
  }
}

export default connect(mapStateToProps)(ListChat);

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0.4,
    elevation: 4
  }
})
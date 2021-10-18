import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CButton from '../../component/CButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { connect } from 'react-redux';
import Axios from 'axios'
import { convertDate } from '../../utils/date'
class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state={
      content: [
        {name: 'CRUD using AsyncStorage', route: 'CRUD'}, 
        {name: 'CRUD using Firestore', route: 'CRUDFirestore'}, 
        {name: 'Inbox', route: 'Inbox'}, 
        {name: 'CRUD using Redux', route: 'CRUDRedux'},
        {name: 'CRUD State Local', route: 'CRUDLocal'},
        {name: 'Chat', route: 'ListChat'},
        {name: 'Redux Test', route: 'ReduxTest'},
        {name: 'Review Materi', route: 'Review Materi'},
        {name: 'Learning API', route: 'APILearning'},
      ]
    }
  }

  async componentDidMount(){
    const getUid = await auth().currentUser.uid
    firestore()
      .collection('Users')
      .doc(getUid)
      .onSnapshot(ress=>{
        this.props.setUser(ress.data())
      })
  }

  _signOut = () => {
    auth()
      .signOut()
      .then(async() => {
          await this.props.setUser({})
          this.props.navigation.replace('Login')
        }
      );
  }

  render() {
    const { content } = this.state
    const { navigation, user } = this.props
    return (
      <View style={styles.container}>
        {content.map((value, index)=>{
          return(
            <CButton 
              onPress={()=>navigation.navigate(value.route)} 
              title={value.name.toUpperCase()} 
              key={index} 
            />
          )
        })}
        <Text>{JSON.stringify(user)}</Text>
        <CButton title="LOGOUT" onPress={()=>this._signOut()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.dashboardReducers.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch({
      type: 'USER-DATA',
      payload: data
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})
import React, { Component } from 'react'
import Navigation from './src/navigation'
// import NotifService from './NotifService'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Provider } from 'react-redux';
import { Store, Persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.notif = new NotifService(
    //   this.onRegister.bind(this),
    //   this.onNotif.bind(this),
    // );
  }

  async componentDidMount(){
    const jsonValue = await AsyncStorage.getItem('inbox')
    let inbox
    if(jsonValue != null){
      inbox = JSON.parse(jsonValue)
    } else {
      inbox = []
    }
    messaging().onMessage(async remoteMessage => {
      showMessage({
        message: remoteMessage.notification.title,
        description: remoteMessage.notification.body,
        type: "info",
        duration: 3000
      })
      let updateInbox = [
        ...inbox,
        {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          sentTime: remoteMessage.sentTime
        }
      ]
      try {
        const jsonValue = JSON.stringify(updateInbox)
        await AsyncStorage.setItem('inbox', jsonValue)
      } catch (e) {
        console.log(e)
      }
    })
  }

  render() {
    return (
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor} >
          <Navigation/>
        </PersistGate>
        <FlashMessage position='top' />
      </Provider>
    )
  }

  // onRegister(token) {
  //   this.setState({registerToken: token.token, fcmRegistered: true});
  // }

  // onNotif(notif) {
  //   if(notif.foreground){
  //     Alert.alert(notif.title, notif.message);
  //   }
  // }
  
}

export default App

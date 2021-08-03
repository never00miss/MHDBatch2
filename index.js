/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  //Get Inbox from AsyncStorage
  const jsonValue = await AsyncStorage.getItem('inbox');
  let inbox;
  if (jsonValue != null) {
    inbox = JSON.parse(jsonValue);
  } else {
    inbox = [];
  }

  //Update Inbox to AsyncStorage
  let updateInbox = [
    ...inbox,
    {
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      sentTime: remoteMessage.sentTime,
    },
  ];
  try {
    const jsonValue = JSON.stringify(updateInbox);
    await AsyncStorage.setItem('inbox', jsonValue);
  } catch (e) {
    console.log(e);
  }
});

AppRegistry.registerComponent(appName, () => App);

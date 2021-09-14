import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/SplashScreen';
import MovieList from '../Screens/MovieList';
import CRUDFirestore from '../Screens/CRUDFirestore';
import InboxScreen from '../Screens/InboxScreen';
import CRUDBasic from '../Screens/CRUDBasic';
import CRUDRedux from '../Screens/CRUDRedux';
import LoginScreen from '../Screens/LoginScreen';
import CRUDLocal from '../Screens/CRUDLocal';
import ListChat from '../Screens/ListChat';
import ChatScreen from '../Screens/ChatScreen';
import ReduxTest from '../Screens/ReduxTest';
import ReviewMateri from '../Screens/ReviewMateri';
import RegisterScreen from '../Screens/RegisterScreen';
import APILearning from '../Screens/APILearning';

const Stack = createStackNavigator();

class Navigation extends React.Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CRUD" component={CRUDBasic} />
          <Stack.Screen name="Movie" component={MovieList} />
          <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
          <Stack.Screen name="CRUDFirestore" component={CRUDFirestore} />
          <Stack.Screen name="Inbox" component={InboxScreen} />
          <Stack.Screen name="CRUDRedux" component={CRUDRedux} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
          <Stack.Screen name="CRUDLocal" component={CRUDLocal} />
          <Stack.Screen name="ListChat" component={ListChat} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}} />
          <Stack.Screen name="ReduxTest" component={ReduxTest} />
          <Stack.Screen name="Review Materi" component={ReviewMateri} options={{headerShown: false}} />
          <Stack.Screen name="APILearning" component={APILearning} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Navigation
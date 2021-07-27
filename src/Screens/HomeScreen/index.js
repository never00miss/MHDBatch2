import * as React from 'react';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <Text style={{fontWeight: 'bold'}}>ONE TIME</Text>
        {this.state.listOneTime.map((value, index)=>{
          return(
            <Text key={index}>{value.nama}</Text>
          )
        })}

        <Text style={{fontWeight: 'bold', marginTop: 10}}>REALTIME</Text>
        {this.state.listRealtime.map((value, index)=>{
          return(
            <Text key={index}>{value.nama}</Text>
          )
        })} */}
        <Button 
          title='CRUD BASIC'
          onPress={() => this.props.navigation.navigate('CRUD')}
        />
        <Button
          title="INBOX"
          onPress={() => this.props.navigation.navigate('Inbox')}
        />
        <Button
          title="FIRESTORE"
          onPress={() => this.props.navigation.navigate('CRUDFirestore')}
        />
      </View>
    );
  }
}

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import CButton from '../../component/CButton';
export default class HomeScreen extends React.Component {
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
      ]
    }
  }
  render() {
    const { content } = this.state
    const { navigation } = this.props
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})
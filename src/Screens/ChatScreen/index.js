import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import CBubbleText from '../../component/CBubbleText';
import { convertDate } from '../../date';
import { colors } from '../../styles';

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      target: this.props.route.params,
      messages: [
        {sendBy: this.props.route.params.uid, text: 'Hai', date: new Date('8-6-2021')},
        {sendBy: this.props.route.params.uid, text: 'Haiiiiiiiii', date: new Date('8-6-2021')},
        {sendBy: this.props.route.params.uid, text: 'Hai', date: new Date()},
        {sendBy: '342934923423', text: 'Hai juga', date: new Date()},
        {sendBy: this.props.route.params.uid, text: 'Gajadi', date: new Date()}
      ],
      currentTime: '',
      inputText: ''
    }
  }

  send = () => {
    this.setState(prevState=>({
      messages: [...prevState.messages, {sendBy: 'me', text: this.state.inputText, date: new Date()}],
      inputText: ''
    }))
  }

  render() {
    const { nama, uid } = this.props.route.params
    const { messages, inputText } = this.state
    return (
      <View style={styles.container}>]
        <ScrollView style={{flex:1}}>
          {messages.map((value, index, array )=>{
            let countTime = index !=0 ? convertDate(array[index-1].date) : ''
            return(
              <View key={index}>
                { countTime != convertDate(value.date)
                  && <Text style={styles.time}>{convertDate(value.date)}</Text>
                }
                <CBubbleText isMe={value.sendBy == uid} text={value.text} time={value.date} />
              </View>
            )
          })}
        </ScrollView>
        <View style={styles.contInput}>
          <TextInput value={inputText} style={styles.inputText} placeholder="Ketik Pesan ..." onChangeText={(typing)=>this.setState({inputText: typing})} />
          <TouchableOpacity onPress={this.send}>
            <MCI name="send-circle" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  contInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex:1
  },
  time: {
    alignSelf: 'center',
    padding: 4,
    backgroundColor: colors.color3,
    borderRadius: 4,
    color: 'white',
    marginTop: 10
  }
})
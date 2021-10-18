import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import CText from '../../component/CText'
import CBubbleText from '../../component/CBubbleText';
import CHeader from '../../component/CHeader';
import { convertDate } from '../../utils/date';
import { colors } from '../../styles';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'


class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      target: this.props.route.params,
      messages: [],
      inputText: ''
    }
  }

  componentDidMount(){
    const { user } = this.props
    const { target } = this.state
    firestore()
      .collection('Users')
      .doc(target.uid)
      .onSnapshot(ress => {
        this.setState({
          target: ress.data()
        })
      })
    
    firestore()
      .collection('Messages')
      .doc(user.uid)
      .collection('chatWith')
      .doc(target.uid)
      .onSnapshot(ress => {
        this.setState({
          messages: ress.data()?.messages
        })
      })
  }

  send = () => {
    const { user } = this.props
    const { target, inputText } = this.state
    
    firestore()
      .collection('Messages')
      .doc(user.uid)
      .collection('chatWith')
      .doc(target.uid)
      .set({
        messages: firestore.FieldValue.arrayUnion({
          text: inputText,
          sendBy: user.uid,
          date: new Date()
        })
      }, {merge:true} )
      .then(()=>{
        this.setState({inputText: ''})
      })

      firestore()
      .collection('Messages')
      .doc(target.uid)
      .collection('chatWith')
      .doc(user.uid)
      .set({
        messages: firestore.FieldValue.arrayUnion({
          text: inputText,
          sendBy: user.uid,
          date: new Date()
        })
      }, {merge:true} )
  }

  render() {
    const { uid } = this.props.user
    const { messages, inputText, target } = this.state
    return (
      <View style={styles.container}>
        <CHeader target={target} />
        <ScrollView style={{flex:1}}>
          { messages
            ? messages.map(( value, index, array )=>{
                let countTime = index !=0 ? convertDate(array[index-1].date.toDate()) : ''
                return(
                  <View key={index}>
                    { countTime != convertDate(value.date.toDate())
                      && <CText style={styles.time}>{convertDate(value.date.toDate())}</CText>
                    }
                    <CBubbleText isMe={value.sendBy == uid} text={value.text} time={value.date.toDate()} />
                  </View>
                )
              })
            : <CText style={styles.time}>START THE CONVERSATION</CText>
          }
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

const mapStateToProps = state => {
  return {
    user: state.dashboardReducers.user
  }
}

export default connect(mapStateToProps)(ChatScreen);

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
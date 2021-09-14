import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { colors } from '../styles'
import { getHour } from '../utils/date'
import CText from '../component/CText'

class CBubbleText extends Component {
  render() {
    const { text, isMe, time } = this.props
    return (
      <View style={[
        styles.container, 
        { 
          alignSelf: isMe ? 'flex-end' : 'flex-start',
          backgroundColor: isMe ? colors.blue : colors.secondary
        }
      ]}>
        <CText>{text}</CText>
        <CText style={styles.time}>{getHour(time)}</CText>
      </View>
    );
  }
}

export default CBubbleText;

const styles = StyleSheet.create({
  container:{
    padding: 10,
    elevation: 4,
    margin: 6,
    borderRadius: 8,
    maxWidth: '80%'
  },
  time: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 3
  }
})
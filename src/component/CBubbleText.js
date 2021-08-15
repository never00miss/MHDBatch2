import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { colors } from '../styles'
import { getHour } from '../date'

class CBubbleText extends Component {
  render() {
    const { text, isMe, time } = this.props
    return (
      <View style={[
        styles.container, 
        { alignSelf: isMe ? 'flex-start' : 'flex-end' },
        { backgroundColor: isMe ? colors.primary : colors.yellow }
      ]}>
        <Text>{text}</Text>
        <Text style={styles.time}>{getHour(time)}</Text>
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
    borderRadius: 8
  },
  time: {
    fontSize: 11,
    textAlign: 'right',
    marginTop: 3
  }
})
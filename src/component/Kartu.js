import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../styles'

class Kartu extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: this.props.text
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> {this.state.text} </Text>
      </View>
    )
  }
}

export default Kartu

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    width: 300,
    paddingVertical: 10,
    elevation: 6,
    borderRadius: 8
  },
  text: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
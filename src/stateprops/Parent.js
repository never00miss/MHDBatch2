import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Child from './Child'
import { colors } from '../styles'

class ParentComponent extends Component {
  constructor(){
    super()
    this.state = {
      name: 'Ini Parent Component',
      text: 'Ini Child Component'
    }
  }

  handleChangeName = (value) => {
    this.setState({
      text: value
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardCont}>
          <Text style={styles.text}> {this.state.name} </Text>
        </TouchableOpacity>
        <Child text={this.state.text} changeFromProps={(value)=>this.handleChangeName(value)} />
      </View>
    )
  }
}

export default ParentComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color2,
  },
  text: {
    fontSize: 18,
    color: colors.color3,
    textAlign: 'center'
  },
  cardCont: {
    backgroundColor: colors.primary,
    width: 300,
    paddingVertical: 16,
    elevation: 6,
    borderRadius: 8,
    marginBottom: 16
  },
})
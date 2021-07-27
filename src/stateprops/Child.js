import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../styles'

class Child extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: this.props.text
    }
    Child.defaultProps = {
      text: 'Default Props'
    }
  }

  changeName = (value) => {
    this.props.changeFromProps(value)
    this.setState({
      text: value
    })
  }

  render() {
    console.log(this.state.text)
    return (
      <TouchableOpacity style={styles.container} onPress={()=>this.changeName('GANTIIII')}>
        <Text style={styles.text}> {this.state.text} </Text>
      </TouchableOpacity>
    )
  }
}

export default Child

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    width: 300,
    paddingVertical: 16,
    elevation: 6,
    borderRadius: 8
  },
  text: {
    fontSize: 18,
    color: colors.primary,
    textAlign: 'center'
  }
})
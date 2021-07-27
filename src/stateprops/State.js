import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { colors } from '../styles'

class StateExercise extends Component {
  constructor(){
    super()
    this.state = {
      nama: 'Akmal Ghaffari',
      input:'',
    }
  }

  buttonPress = () =>{
    this.setState({
      nama: this.state.input,
      input: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>{JSON.stringify(this.state)}</Text>

        <View style={[styles.cardCont, {backgroundColor: colors.secondary}]}>
          <Text style={[styles.text, {color: colors.primary}]}>{this.state.nama}</Text>
        </View>
        
        <TextInput 
          style={[styles.cardCont, styles.input]} 
          placeholder='Masukkan Nama'
          onChangeText={ (ketikan)=>this.setState({input: ketikan}) }
          value={this.state.input}
        />

        <TouchableOpacity style={styles.cardCont} onPress={()=>this.buttonPress()} >
          <Text style={styles.text}> SUBMIT </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default StateExercise

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
  input: {
    backgroundColor: 'white',
    marginBottom: 16,
    paddingHorizontal: 16
  }
})
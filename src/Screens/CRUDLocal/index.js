import React, {Component} from 'react';
import {View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import CGap from '../../component/CGap'
import { colors } from '../../styles';

class CRUDLocal extends Component {
  constructor(){
    super()
    this.state = {
      data: [
        {id: '1', nama: 'Karyo', alamat: 'TNG'},
        {id: '2', nama: 'Sutrisno', alamat: 'MGL'},
        {id: '3', nama: 'Sutoro', alamat: 'SBY'},
        {id: '4', nama: 'Anjasmara', alamat: 'JKT'},
        {id: '5', nama: 'Lisa', alamat: 'BTN'},
        {id: '6', nama: 'Roni', alamat: 'BALI'},
      ],
      id: '',
      nama: '',
      alamat:  '',
      onEdit: false,
      onSelect: false
    }
  }
  
  submit = () => {
    const {nama, alamat, id, data} = this.state
    this.setState({
      data: [...data, {id, nama, alamat}],
      id: '',
      nama: '',
      alamat: ''
    })
  }

  delete = (id) => {
    this.setState(prevState => ({
      data: prevState.data.filter( (value) => value.id != id )
    })) 
  }

  edit = (value) => {
    this.setState({
      id: value.id,
      nama: value.nama,
      alamat: value.alamat,
      onEdit: true
    })
  }

  update = () => {
    const {id, nama, alamat} = this.state
    this.setState(prevState=>({
      data: prevState.data.map((value)=>{
        if(value.id == id){
          value.id = id,
          value.nama = nama,
          value.alamat = alamat
          return value
        } else {
          return value
        }
      }),
      onEdit: false, id: '', nama: '', alamat: ''
    }))
  }

  pilih = () => {
    this.setState({onSelect: !this.state.onSelect})
  }

  check = (id) => {
    this.setState(prevState=>({
      data: prevState.data.map((value)=>{
        if(value.id == id){
          value.checked = !value.checked
          return value
        } else {
          return value
        }
      })
    }))
  }

  deleteSelected = () => {
    this.setState(prevState => ({
      data: prevState.data.filter(value => !value.checked),
      onSelect: false
    }))
  }

  render(){
    const { data, id, nama, alamat, onEdit, onSelect } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          { !onEdit
           && <TextInput placeholder="Id" value={id} onChangeText={typing=>this.setState({id: typing})} style={styles.input} /> 
          }
          <TextInput placeholder="Nama" value={nama} onChangeText={typing=>this.setState({nama: typing})} style={styles.input} />
          <TextInput placeholder="Alamat" value={alamat} onChangeText={typing => this.setState({alamat: typing})} style={styles.input} />
          {onEdit 
            ? <Button title="Update" onPress={this.update} />
            : <Button title="Submit" onPress={this.submit} />
          }
        </View>
        <View style={styles.table}>
          <View style={styles.header}>
            <Text style={styles.number}> # </Text>
            <Text style={styles.otherTitle}> Nama </Text>
            <Text style={styles.otherTitle}> Alamat </Text>
            <Text style={styles.otherTitle}> Action </Text>
          </View>
          <ScrollView style={styles.containerTable}>
            {data.map((value, index) => {
              return(
                <View key={index} style={styles.isi}>
                  <Text style={[styles.number, styles.data]}> {index+1} </Text>
                  <Text style={[styles.otherTitle, styles.data]}> {value.nama} </Text>
                  <Text style={[styles.otherTitle, styles.data]}> {value.alamat} </Text>
                  { onSelect
                    ? <MCI 
                        style={styles.checkBox} 
                        name={value.checked ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"} 
                        size={20} onPress={()=>this.check(value.id)} 
                      />
                    : <View style={[styles.otherTitle, styles.icon]}>
                        <TouchableOpacity onPress={()=>this.delete(value.id)}>
                          <MCI name='delete' size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.edit(value)}>
                          <MCI name="square-edit-outline" size={20} />
                        </TouchableOpacity>
                      </View> 
                  }
                </View>  
              )
            })}
          </ScrollView>
        </View>
        <CGap height={10} />
        { onSelect
          ? <Button color={colors.red} title="Hapus" onPress={this.deleteSelected} />
          : <Button title="Pilih" onPress={this.pilih} />
        }
      </View>
    );
  }
}

export default CRUDLocal;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
    backgroundColor: 'white'
  },
  table: {
    borderWidth: 0.5,
    borderRadius: 8,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#DC052D',
    height: 40,
    alignItems: 'center'
  },
  number: {
    width: '10%', 
    textAlign: 'center',
    color: 'white'
  },
  otherTitle: {
    textAlign: 'center',
    width: '30%',
    color: 'white'
  },
  isi: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    borderColor: '#0066B2',
  },
  data: {
    color: '#DC052D',
  },
  input: {
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 8
  },
  containerInput: { 
    backgroundColor: '#0066B2', 
    elevation: 4, 
    padding: 20, 
    justifyContent: 'center',
    borderRadius:8,
  },
  title: {
    textAlign: 'center', 
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'white'
  },
  containerTable: {
    maxHeight: 200
  },
  icon : {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  checkBox: {
    textAlign: 'center',
    width: '30%',
    color: '#DC052D'
  }
})
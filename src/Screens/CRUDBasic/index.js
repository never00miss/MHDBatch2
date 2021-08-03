import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

class CRUDBasic extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      id: '',
      nama: '',
      alamat: '',
      onEdit: false
    }
  }

  async componentDidMount(){
    await this.getData()
  }
  
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data')
      this.setState({
        data: jsonValue != null ? JSON.parse(jsonValue) : []
      })
    } catch(e) {
      // error reading value
    }
  }

  storeData = async () => {
    const { id, nama, alamat, data } = this.state
    const json = [ ...data, {id, nama, alamat}]
    try {
      const jsonValue = JSON.stringify(json)
      await AsyncStorage.setItem('data', jsonValue)
      this.setState({
        id: '',
        nama: '',
        alamat: ''
      })
      this.getData()
    } catch (e) {
      // saving error
    }
  }

  // tambah = () => {
  //   const {id, nama, alamat} = this.state
  //   this.setState((prev)=>({
  //     data: [...prev.data, {id, nama, alamat}],
  //     id: '',
  //     nama: '',
  //     alamat: ''
  //   }))
  // }

  // delete = (id) => {
  //   let tampungan = this.state.data.filter(value => {
  //     return value.id != id
  //   })
  //   this.setState({
  //     data: tampungan
  //   })
  // }

  // edit = (params) => {
  //   this.setState({
  //     id: params.id,
  //     nama: params.nama,
  //     alamat: params.alamat,
  //     onEdit: true
  //   })
  // }

  // update = () => {
  //   const {id, nama, alamat} = this.state
  //   const tampungan = this.state.data
  //   tampungan.filter(value => {
  //     if(value.id == id){
  //       value.id = id,
  //       value.nama = nama,
  //       value.alamat = alamat
  //     }
  //   })
  //   this.setState({
  //     data: tampungan,
  //     id: '',
  //     nama: '',
  //     alamat: '',
  //     onEdit: false
  //   })
  // }

  render() {
    const {id, nama, alamat, onEdit} = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerInput}>
            <Text style={styles.title}>Tambah Data</Text>
            <TextInput value={id} keyboardType='numeric' onChangeText={(e)=>this.setState({id: e})} placeholder="Id" style={styles.input} />
            <TextInput value={nama} onChangeText={(e)=>this.setState({nama: e})} placeholder="Nama" style={styles.input} />
            <TextInput value={alamat} onChangeText={(e)=>this.setState({alamat: e})} placeholder="Alamat" style={styles.input} />
            {onEdit
              ? <Button color="#DC052D" title="Update" onPress={this.update} />
              : <Button color="#DC052D" title="Tambah" onPress={this.storeData} />
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
              {this.state.data.map((value, index) => {
                return(
                  <View key={index} style={styles.isi}>
                    <Text style={[styles.number, styles.data]}> {index+1} </Text>
                    <Text style={[styles.otherTitle, styles.data]}> {value.nama} </Text>
                    <Text style={[styles.otherTitle, styles.data]}> {value.alamat} </Text>
                    <View style={[styles.otherTitle, styles.icon]}>
                      <TouchableOpacity onPress={()=>this.delete(value.id)}>
                        <MCI name='delete' size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.edit(value)}>
                        <MCI name="square-edit-outline" size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>  
                )
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default CRUDBasic;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
    justifyContent: 'center',
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
  }
})
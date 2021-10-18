import axios from 'axios';
import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import CButton from '../../component/CButton'
import CText from '../../component/CText';

class APILearning extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      maxLength: 2,
      id: '',
      name: '',
      email: '',
      onEdit: false
    };
  }

  async componentDidMount() {
    this._getDataFromLocalDB()
  }

  _edit = (value) => {
    this.setState({
      id: value.id,
      name: value.name,
      email: value.email,
      onEdit: true
    })
  }

  _updateLocalDB = () => {
    const { id, name, email } = this.state
    const data = {
      name
    }
    axios.patch(`http://10.0.2.2:3000/users/${id}`, data)
    .then(()=>{
      this.setState({
        id: '',
        name: '',
        email: '',
        onEdit: false
      })
      this._getDataFromLocalDB()
    }) 
  }

  _getDataFromLocalDB = async () => {
    // Call API menggunakan AXIOS
    const users = await axios.get('http://10.0.2.2:3000/users');
    this.setState({
      users: users.data,
    });
  }

  _postDataToLocalDB = () => {
    const { email, name } = this.state
    const data = {
      name: name,
      email: email
    }
    axios.post('http://10.0.2.2:3000/users', data)
    .then(()=>{
      this.setState({
        name: '',
        email: ''
      })
      this._getDataFromLocalDB()
    })
    .catch( err => console.log(err) )
  }

  _deleteLocalDB = (id) => {
    axios.delete(`http://10.0.2.2:3000/users/${id}`)
    .then((ress)=>{
      console.log(ress)
      this._getDataFromLocalDB()
    })
  }
  
  _postDataToResReqIn = async () => {
    const data = { name: 'Akmal', job: 'teacher' }
    // Call API menggunakan AXIOS
    const post = await axios.post('https://reqres.in/api/users?page=2', data)
    console.log(post)

    // Call API menggunakan Fetch (Vanilla JS)
    // fetch('https://reqres.in/api/users', {
    //   method  : 'POST',
    //   headers : {
    //     'Content-Type' : 'application/json'
    //   },
    //   body    : JSON.stringify(data)
    // })
    // .then( result => result.json() )
    // .then( ress => console.log(ress) )
  }

  _getDataFromResReqIN = async () => {
    // Call API menggunakan Axios
    const users = await axios.get('https://reqres.in/api/users?page=2');
    console.log(users)

    // Call API menggunakan Fetch (Vanilla JS)
    // fetch('https://reqres.in/api/users?page=2')
    // .then( result => result.json() )
    // .then( ress => console.log(ress) )
  }

  render() {
    const {users, maxLength, onEdit, name, email} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerInput}>
            <CText style={styles.title}>Tambah Data</CText>
            <TextInput value={name} onChangeText={(e)=>this.setState({name: e})} placeholder="Nama" style={styles.input} />
            <TextInput value={email} onChangeText={(e)=>this.setState({email: e})} placeholder="Email" style={styles.input} />
            {onEdit
              ? <Button color="#DC052D" title="Update" onPress={this._updateLocalDB} />
              : <Button color="#DC052D" title="Tambah" onPress={this._postDataToLocalDB} />
            }
          </View>
          <View style={styles.table}>
            <View style={styles.header}>
              <CText style={styles.number}> # </CText>
              <CText style={styles.otherTitle}> Name </CText>
              <CText style={styles.otherTitle}> Email </CText>
              <CText style={styles.otherTitle}> Action </CText>
            </View>
            <ScrollView style={styles.containerTable}>
              {users.map((value, index) => {
                return(
                  <View key={index} style={styles.isi}>
                    <CText style={{...styles.number, ...styles.data}}> {index+1} </CText>
                    <CText style={{...styles.otherTitle, ...styles.data}}> {value.name} </CText>
                    <CText style={{...styles.otherTitle, ...styles.data}}> {value.email} </CText>
                    <View style={{...styles.otherTitle, ...styles.icon}}>
                      <TouchableOpacity onPress={()=>this._deleteLocalDB(value.id)}>
                        <MCI name='delete' size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this._edit(value)}>
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
    );
  }
}

export default APILearning;

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
    alignItems: 'center',
    backgroundColor: 'white'
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
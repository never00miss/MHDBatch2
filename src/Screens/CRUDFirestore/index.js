import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../styles';
import firestore from '@react-native-firebase/firestore';

class CRUDFirestore extends Component {
  constructor(){
    super()
    this.state = {
      data : {
        nama: 'default name',
        uid: 'dafault uid'
      },
      listRealtime: [],
      listOneTime: [],
      inputNama: '',
      inputAlamat: ''
    }
  }

  async componentDidMount(){
    
    //One Time Read
    const tampungan = await firestore().collection('Users').get()
    this.setState({
      listOneTime: tampungan.docs.map(result=>{
        return result.data()
      })
    })

    //Realtime Changes
    firestore()
    .collection('Users')
    .onSnapshot((value)=>{
      this.setState({
        listRealtime: value.docs.map(result=>{
          return result.data()
        })
      })
    })

  }

  submit = () => {
    const { inputNama, inputAlamat } = this.state
    firestore().collection('Users').add({
      nama: inputNama,
      alamat: inputAlamat
    })
  }

  render() {
    const { data, inputAlamat, inputNama, listOneTime, listRealtime } = this.state
    return (
      <View style={styles.container}>
        <View style={{paddingVertical: 30, width: '100%', alignItems: 'center'}}>
          <TextInput placeholder="Nama" style={styles.input} onChangeText={(e)=>this.setState({inputNama: e})} value={inputNama} />
          <TextInput placeholder="Alamat" style={styles.input} onChangeText={(e)=>this.setState({inputAlamat: e})} value={inputAlamat} />
          <TouchableOpacity style={styles.button} onPress={this.submit} >
            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', alignItems: 'center', flex:1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {listRealtime.map((value, index)=>{
              return(
                <View style={styles.list} key={index}>
                  <Text>{value.nama}</Text>
                  <Text>{value.alamat}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CRUDFirestore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '90%',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    elevation: 8,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    elevation: 8,
  },
  list: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  }
});

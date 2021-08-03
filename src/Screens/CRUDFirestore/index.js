import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../styles';
import firestore from '@react-native-firebase/firestore';
import CButton from '../../component/CButton';

class CRUDFirestore extends Component {
  constructor(){
    super()
    this.state = {
      listRealtime: [],
      // listOneTime: [],
      inputNama: '',
      inputAlamat: ''
    }
  }

  async componentDidMount(){
    
    //One Time Read
    // const tampungan = await firestore().collection('Users').get()
    // this.setState({
    //   listOneTime: tampungan.docs.map(result=>{
    //     return result.data()
    //   })
    // })

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
    const { inputAlamat, inputNama, listRealtime } = this.state
    return (
      <View style={styles.container}>
        <View style={{paddingVertical: 10, width: '100%', alignItems: 'center'}}>
          <TextInput placeholder="Nama" style={styles.input} onChangeText={(e)=>this.setState({inputNama: e})} value={inputNama} />
          <TextInput placeholder="Alamat" style={styles.input} onChangeText={(e)=>this.setState({inputAlamat: e})} value={inputAlamat} />
          <CButton title="SUBMIT" onPress={this.submit} />
        </View>
        <View style={{width: '100%', flex:1}}>
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
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 5,
    alignSelf: 'center'
  }
});

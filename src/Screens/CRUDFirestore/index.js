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
import { connect } from 'react-redux';
import CText from '../../component/CText';

class CRUDFirestore extends Component {
  constructor(){
    super()
    this.state = {
      listRealtime: [],
      // listOneTime: [],
      inputNama: '',
      inputAlamat: '',
      filtered: [],
      searchIn: '',
    }
  }

  componentDidMount(){
    
    //One Time Read
    // const tampungan = await firestore().collection('Users').get()
    // this.setState({
    //   listOneTime: tampungan.docs.map(result=>{
    //     return result.data()
    //   })
    // })

    //Realtime Changes
    let tampungan
    firestore()
    .collection('Users')
    .onSnapshot((value)=>{
      tampungan = value.docs.map(result=>{
        return result.data()
      })
      this.props.getUsers(tampungan)
    })

  }

  submit = () => {
    const { inputNama, inputAlamat } = this.state
    firestore().collection('Users').add({
      nama: inputNama,
      alamat: inputAlamat
    })
    this.setState({
      inputNama: '',
      inputAlamat: ''
    })
  }

  _search = (e) => {
    this.setState((state, props) => {
        return {
          searchIn: e,
          filtered: props.users.filter( value => {
            if(
              value.nama.toLowerCase().includes(e.toLowerCase()) 
              ||  value.alamat.toLowerCase().includes(e.toLowerCase())
            ){
              return value
            }
          })
        };
      }
    )
  }

  render() {
    const { inputAlamat, inputNama, listRealtime, searchIn, filtered } = this.state
    const { users } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.section1}>
          <TextInput placeholder="Search" style={styles.input} onChangeText={(e)=>this._search(e)} value={searchIn} />
          {/* <TextInput placeholder="Nama" style={styles.input} onChangeText={(e)=>this.setState({inputNama: e})} value={inputNama} />
          <TextInput placeholder="Alamat" style={styles.input} onChangeText={(e)=>this.setState({inputAlamat: e})} value={inputAlamat} />
          <CButton title="SUBMIT" onPress={this._search} /> */}
        </View>
        <View style={styles.section2}>
          <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
            { searchIn.length > 0
            ? filtered.map((value, index)=>{
                return(
                  <View style={
                    index%2==0 
                    ? {
                        ...styles.list, 
                        borderLeftWidth: 10, 
                        borderLeftColor: colors.secondary,
                        backgroundColor: colors.yellow,   
                      }
                    : {
                        ...styles.list, 
                        borderRightWidth: 10, 
                        borderRightColor: colors.yellow,
                        backgroundColor: colors.secondary,
                      }
                  } key={index}>
                    <CText bold>{value.nama}</CText>
                    <CText>{value.alamat}</CText>
                  </View>
                )
              })
            : users
              ? users.map((value, index)=>{
                  return(
                    <View style={
                      index%2==0 
                      ? {
                          ...styles.list, 
                          borderLeftWidth: 10, 
                          borderLeftColor: colors.secondary,
                          backgroundColor: colors.yellow,   
                        }
                      : {
                          ...styles.list, 
                          borderRightWidth: 10, 
                          borderRightColor: colors.yellow,
                          backgroundColor: colors.secondary,
                        }
                    } key={index}>
                      <CText bold>{value.nama}</CText>
                      <CText>{value.alamat}</CText>
                    </View>
                  )
                })
              : <CText>No Data</CText>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.firestoreReducers.stdFirestore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (data) => dispatch({ type: 'GET-USERS', payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CRUDFirestore);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary
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
    borderRadius: 20,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 5,
    alignSelf: 'center',
  },
  section1: {
    paddingVertical: 10, 
    alignItems: 'center', 
    flex:1, 
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    width: '100%'
  },
  section2: {
    flex:1, 
    backgroundColor: colors.primary,
    paddingVertical: 20
  }
});

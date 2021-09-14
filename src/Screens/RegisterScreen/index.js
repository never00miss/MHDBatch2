import auth from '@react-native-firebase/auth';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import { colors } from '../../styles';
import CTextInput from '../../component/CTextInput';
import CGap from '../../component/CGap';
import CButton from '../../component/CButton';
import firestore from '@react-native-firebase/firestore'

const toast = (msg) => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

class LoginScreen extends Component {
  constructor(){
    super()
    this.state = {
      nama: '',
      alamat: '',
      noTelp: '',
      email: '',
      password: ''
    }
  }

  _register = () => {
    const { email, password, nama, alamat, noTelp } = this.state
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      firestore()
      .collection('Users')
      .doc(response.user.uid)
      .set({
        nama: nama,
        alamat: alamat,
        noTelp: noTelp,
        email: email,
        uid: response.user.uid
      })
      .then(()=>{
        toast('Registrasi Berhasil !');
      })
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        toast('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        toast('That email address is invalid!');
      }

      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CTextInput 
          iconName='account' placeholder="Nama" onChangeText={(e)=>this.setState({nama:e})}
        />
        <CGap height={10} />
        <CTextInput 
          iconName='home' placeholder="Alamat" onChangeText={(e)=>this.setState({alamat:e})}
        />
        <CGap height={10} />
        <CTextInput 
          iconName='card-account-phone' placeholder="Nomor Handphone" onChangeText={(e)=>this.setState({noTelp:e})}
        />
        <CGap height={10} />
        <CTextInput 
          iconName='email-outline' placeholder="Email" onChangeText={(e)=>this.setState({email:e})}
        />
        <CGap height={10} />
        <CTextInput 
          iconName='key-variant' placeholder="Password" onChangeText={(e)=>this.setState({password: e})} password={true}
        />
        <CGap height={10} />
        <CButton title='Register' onPress={this._register} />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 240,
    height: 240
  },
});

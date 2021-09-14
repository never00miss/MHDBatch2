import auth from '@react-native-firebase/auth';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import { colors } from '../../styles';
import Bayern from '../../assets/bayern.png'
import CTextInput from '../../component/CTextInput';
import CGap from '../../component/CGap';
import CButton from '../../component/CButton';

const toastAndroidCenter = (msg) => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

class LoginScreen extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  signIn = async () => {
    const { email, password } = this.state
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toastAndroidCenter('Login Success')
        this.props.navigation.replace('Home')
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          toastAndroidCenter('User Not Found');
        } else if (error.code === 'auth/wrong-password') {
          toastAndroidCenter('Wrong Password!');
        } else if (error.code === 'auth/invalid-email') {
          toastAndroidCenter('Email address is invalid!');
        }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Bayern} style={styles.image} />
        <CGap height={10} />
        <CTextInput 
          iconName='email-outline' placeholder="Email" onChangeText={(e)=>this.setState({email:e})}
        />
        <CGap height={10} />
        <CTextInput 
          iconName='key-variant' placeholder="Password" onChangeText={(e)=>this.setState({password: e})} password={true}
        />
        <CGap height={10} />
        <CButton title='DAFTAR BARU' onPress={()=>this.props.navigation.navigate('Register')} />
        <CButton title='Login' onPress={this.signIn} />
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

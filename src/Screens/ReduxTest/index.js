import React, { Component } from 'react'
import { View, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import CButton from '../../component/CButton'
import CText from '../../component/CText'

class ReduxTest extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputUsername:'',
            inputPassword:''
        }
    }

    toast(msg) {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }    

    _login = () => {
        const { inputUsername, inputPassword } = this.state
        if(inputUsername === '' && inputPassword === ''){
            this.toast('Isi form terlebih dahulu !')
        } else if(inputUsername === '') {
            this.toast('Username Belum Diisi')
        } else if(inputPassword === '') {
            this.toast('Password belum diisi')
        } else {
            const getUser = this.props.users.filter(value=>value.username === inputUsername)
            const user = getUser[0]
            if(user !== undefined){
                if(user.password === inputPassword){
                    this.toast('Login Berhasil !!!')
                    this.props.login(true)
                } else {
                    this.toast('Password Salah')
                }
            } else {
                this.toast('User tidak ditemukan')
            }
        }
    }

    _checkAuth = () => {
        this.toast(`${this.props.auth}`)
    }

    _logout = () => {
        this.props.login(false)
    }

    render() {
        const { inputUsername, inputPassword } = this.state
        return (
            <View style={styles.container}>
                <CText style={{fontSize: 20}} > {this.props.title} </CText>
                <TextInput style={styles.input} placeholder="Username" value={inputUsername} onChangeText={(typing)=>this.setState({inputUsername:typing})} />
                <TextInput style={styles.input} placeholder="Password" value={inputPassword} onChangeText={(typing)=>this.setState({inputPassword:typing})} />
                <CButton title="LOGIN" onPress={this._login} />
                <CButton title="CHECK AUTH" onPress={this._checkAuth} />
                <CButton title="LOGOUT" onPress={this._logout} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducers.users,
        auth: state.userReducers.isLogin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTitle: (data) => dispatch({
            type: "CHANGE-TITLE", payload: data
        }),
        login: (data) => dispatch({
            type: "USER-LOGIN", payload: data
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'black'
    },
    input: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 8,
        marginBottom: 10
    }
})
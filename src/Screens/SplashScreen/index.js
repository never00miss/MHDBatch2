import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import CText from '../../component/CText'
import auth from '@react-native-firebase/auth';

class SplashScreen extends Component {
    componentDidMount(){
        setTimeout(() => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    this.props.navigation.replace('Home')
                } else {
                    this.props.navigation.replace('Login')
                }
            });
        }, 2500);
    }
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color='#DC052D' />
                <CText>Loading ...</CText>
            </View>
        )
    }
}

export default SplashScreen

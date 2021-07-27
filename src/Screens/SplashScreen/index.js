import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import CText from '../../component/CText'

class SplashScreen extends Component {
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.replace('CRUD')
        },2000)
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

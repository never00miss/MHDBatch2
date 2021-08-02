import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'

class CTextInput extends Component {
    render() {
        const {iconName, placeholder, onChangeText, password} = this.props
        return (
            <View style={styles.input}>
                <MCI name={iconName} size={30} />
                <TextInput 
                    placeholder={placeholder} 
                    style={{flex:1}} 
                    onChangeText={onChangeText} 
                    secureTextEntry={password}
                />
            </View>
        )
    }
}

export default CTextInput

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center'
    },
})
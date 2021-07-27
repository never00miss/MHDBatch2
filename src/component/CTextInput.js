import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

class CTextInput extends Component {
    render() {
        return (
            <View style={styles.input}>
                <Icon name={this.props.name} size={20} />
                <TextInput placeholder={this.props.placeholder} />
            </View>
        )
    }
}

export default CTextInput

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,
        elevation: 4,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5
    }
})
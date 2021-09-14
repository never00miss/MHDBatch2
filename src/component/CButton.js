import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import CText from './CText'

class CButton extends Component {
    render() {
        const { style } = this.props
        return (
            <TouchableOpacity style={{...styles.button, ...style}} onPress={this.props.onPress}>
                <CText style={{textAlign:'center'}} bold >{this.props.title}</CText>
            </TouchableOpacity>
        )
    }
}

export default CButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0066B2',
        padding:10,
        width: '80%',
        borderRadius: 8,
        elevation: 4,
        marginVertical: 5
    }
})
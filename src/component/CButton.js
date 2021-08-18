import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import CText from './CText'

class CButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <CText bold >{this.props.title}</CText>
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
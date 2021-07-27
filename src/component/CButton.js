import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class CButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button}>
                <Text style={{color: 'white', textAlign: 'center'}}>{this.props.title}</Text>
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
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../styles'
import CText from './CText'

class CHeader extends Component {
    render() {
        const { nama, isOnline } = this.props.target
        return (
            <View style={styles.container}>
                <CText style={styles.title} bold> {nama.toUpperCase()} </CText>
                <CText style={styles.title}> {isOnline ? 'Online' : 'Offline'} </CText>
            </View>
        )
    }
}

export default CHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgcolor,
        paddingVertical: 16,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
    }
})
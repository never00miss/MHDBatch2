import React, { Component } from 'react'
import { Text, View } from 'react-native'

class CGap extends Component {
    render() {
        const {height, width} = this.props
        return (
            <View style={{height, width}} />
        )
    }
}

export default CGap

import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

class ReviewMateri extends Component {

    constructor(){
        super()
        this.state = {
            number: 0
        }
    }

    _changeTitle = () => {
        this.setState(prevState => ({
            number: prevState.number + 1
        }))
    }

    render() {
        const { number } = this.state
        return (
            <View style={styles.container}>
                <Text style={{fontSize: number < 10 ? 16 : 24 , color: number%2==0 ? 'red' : 'blue' }}>
                    { number>5 ? alert('stop') : number}
                </Text>
                <Button title="TAMBAH" onPress={this._changeTitle} />
            </View>
        )
    }
}

export default ReviewMateri

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
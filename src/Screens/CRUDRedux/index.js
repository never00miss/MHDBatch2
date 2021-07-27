import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class CRUDRedux extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
                <Text>{this.props.description}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        title: state.title,
        description: state.description
    }
}

export default connect(mapStateToProps, )(CRUDRedux)

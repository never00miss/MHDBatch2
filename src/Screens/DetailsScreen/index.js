import * as React from 'react';
import { View, Text } from 'react-native';

export default class DetailsScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen - screens ke 2</Text>
            </View>
        )
    }
}
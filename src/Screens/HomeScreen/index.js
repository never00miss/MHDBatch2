import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "allan",
            age: 29
        }
    }

    componentDidMount() {
        const dataAdditional = {
            alamat: "gempol",
            name: "dhino",
            age: 30,
        }

        this.setState({
            ...dataAdditional,
            name: "test"
        });
    }

    render() {
        const { name } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Text>{name}</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}
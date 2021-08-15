import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class CChatHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18}}>{this.props.name}</Text>
      </View>
    );
  }
}

export default CChatHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical:16,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 4,
    alignItems: 'center',
  }
})
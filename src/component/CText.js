import React from 'react';
import { Platform, Text } from 'react-native';

export default class CText extends React.Component {
  state = {
    isBold: Platform.select({
      ios: {
        fontFamily: "Muli-Bold"
      },
      android: {
        fontFamily: "Muli-Bold"
      },
      web: {
        fontFamily: 'Muli-Bold'
      }
    })
  }

  render() {
    const {
      style,
      bold
    } = this.props;

    const {
      isBold
    } = this.state;

    let _bold = bold ? isBold : {}

    return (
      <Text {...this.props} style={{ ...styles.text, ...style, ..._bold }} >{this.props.children}</Text>
    );
  }
}

const styles = {
  text: {
    color: "white",
    fontStyle: "normal",
    ...Platform.select({
      ios: {
        fontFamily: "Muli"
      },
      android: {
        fontFamily: "Muli"
      },
      web: {
        fontFamily: 'Muli'
      }
    }),
    ...Platform.select({
      web: {
        letterSpacing: "normal"
      }
    }),
  },
};

import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, height, width } from '../../styles';

// const Card = ({text='Card', navigation='nav'}) => {
//   return (
//     <TouchableOpacity style={styles.container} onPress={()=>alert(navigation)}>
//       <Text style={styles.text}>{text}</Text>
//     </TouchableOpacity>
//   );
// };

class Card extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: this.props.text,
      navigation: this.props.nav
    }
  }
  render(){
    return(
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.state.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default Card;

const styles = StyleSheet.create({
  container: {
    width: width/2.25,
    height: height/4,
    backgroundColor: colors.yellow,
    borderColor: colors.black,
    elevation: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black
  }
});

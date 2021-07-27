import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions, Button } from 'react-native'

class MovieList extends Component {
    constructor(){
        super()
        this.state = {
            data : []
        }
    }

    fetching = () => {  
        fetch('http://www.omdbapi.com/?s=avengers&apikey=997061b4&')
        .then(response => response.json())
        .then(ress => this.setState({data : ress.Search}))
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <Button title="Fetch" onPress={this.fetching}/>
                {this.state.data.length == 0
                ?   <Text>Data masih Kosong</Text>
                :   this.state.data.map((value, index)=>{
                        return(
                            <Text key={index} >{value.Title}</Text>
                        )
                    }) 
                }
            </ScrollView>
        )
    }
}

export default MovieList
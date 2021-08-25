import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { addData, deleteData, updateData } from './action';

class CRUDRedux extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      id: '',
      nama: '',
      alamat: '',
      onEdit: false
    }
  }

  handleDeleteData = (id) => {
    this.props.deleteData(id)
  }

  handleAddData = () => {
    const {id, nama, alamat} = this.state
    const data = {id, nama, alamat}
    this.props.addData(data)
    this.setState({
      id: '',
      nama: '',
      alamat: ''
    })
  }

  onEdit = (value) => {
    this.setState({
      onEdit: true,
      id: value.id,
      nama: value.nama,
      alamat: value.alamat
    })
  }

  handleUpdateData = () => {
    const {id, nama, alamat} = this.state
    const data = {id, nama, alamat}
    const updateStudents = this.props.students.map(value => {
      if(value.id === data.id){
        value.id = data.id,
        value.nama = data.nama,
        value.alamat = data.alamat
        return value
      } else {
        return value
      }
    })
    this.props.updateData(updateStudents)
    this.setState({
      onEdit: false,
      id: '',
      nama: '',
      alamat: ''
    })
  }

  render() {
    const {id, nama, alamat, onEdit} = this.state
    const { students, rState, title } = this.props
    console.log(rState)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerInput}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
              value={id}
              keyboardType="numeric"
              onChangeText={e => this.setState({id: e})}
              placeholder="Id"
              style={styles.input}
            />
            <TextInput
              value={nama}
              onChangeText={e => this.setState({nama: e})}
              placeholder="Nama"
              style={styles.input}
            />
            <TextInput
              value={alamat}
              onChangeText={e => this.setState({alamat: e})}
              placeholder="Alamat"
              style={styles.input}
            />
            {onEdit ? (
              <Button color="#DC052D" title="Update" onPress={this.handleUpdateData} />
            ) : (
              <Button color="#DC052D" title="Tambah" onPress={this.handleAddData} />
            )}
          </View>
          <View style={styles.table}>
            <View style={styles.header}>
              <Text style={styles.number}> # </Text>
              <Text style={styles.otherTitle}> Nama </Text>
              <Text style={styles.otherTitle}> Alamat </Text>
              <Text style={styles.otherTitle}> Action </Text>
            </View>
            <ScrollView style={styles.containerTable}>
              { students &&
              students.map((value, index) => {
                return (
                  <View key={index} style={styles.isi}>
                    <Text style={[styles.number, styles.data]}>
                      {index + 1}
                    </Text>
                    <Text style={[styles.otherTitle, styles.data]}>
                      {value.nama}
                    </Text>
                    <Text style={[styles.otherTitle, styles.data]}>
                      {value.alamat}
                    </Text>
                    <View style={[styles.otherTitle, styles.icon]}>
                      <TouchableOpacity>
                        <MCI name="delete" size={20} onPress={()=>this.handleDeleteData(value.id)} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <MCI name="square-edit-outline" size={20} onPress={()=>this.onEdit(value)} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.crudReducers.students,
    rState: state,
    title: state.crudReducers.title
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    deleteData: (id) => dispatch(deleteData(id)),
    addData: (data) => dispatch(addData(data)),
    updateData: (data) => dispatch(updateData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CRUDRedux);

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
    justifyContent: 'center',
  },
  table: {
    borderWidth: 0.5,
    borderRadius: 8,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#DC052D',
    height: 40,
    alignItems: 'center'
  },
  number: {
    width: '10%', 
    textAlign: 'center',
    color: 'white'
  },
  otherTitle: {
    textAlign: 'center',
    width: '30%',
    color: 'white'
  },
  isi: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    borderColor: '#0066B2',
  },
  data: {
    color: '#DC052D',
  },
  input: {
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 8
  },
  containerInput: { 
    backgroundColor: '#0066B2', 
    elevation: 4, 
    padding: 20, 
    justifyContent: 'center',
    borderRadius:8,
  },
  title: {
    textAlign: 'center', 
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'white'
  },
  containerTable: {
    maxHeight: 200
  },
  icon : {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
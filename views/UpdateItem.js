import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { addItem } from '../service/MyServiceInterface';
import db from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';
import { ref, onValue } from 'firebase/database'

let itemsRef = ref(db, '/items');

export default class UpdateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      name: '',
      error: false,
      upc_type: '',
      barcode: '',
      price: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'UpdateItem',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount() {
    const { route } = this.props;
    this.setState({
      user: route.params.user,
      barcode: route.params.data ? route.params.data.toString() : '',
      upc_type: route.params.upc_type ? route.params.upc_type.toString() : '',
      name: route.params.name ? route.params.name.toString() : '',
      price: route.params.price ? route.params.price : '',
    })
  }

  componentDidMount() {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null || data != undefined) {
        const items = Object.values(data);
        this.setState({ items });
      }
    });
  }



  handleChange(field, text) {
    this.setState({
      [field]: text,
    });
  }


  handleSubmit(barcode, name, price, upc_type) {
    console.log(this.state.user, barcode, name, price, upc_type)
    addItem(this.state.user, barcode, name, price, upc_type);
    Alert.alert('Item saved successfully');
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Update Item</Text>
        <View style={styles.input}>
          <Text style={styles.text2}>UPC-Type:</Text>
          <TextInput
            style={styles.text}
            placeholder='UPC-Type'
            onChangeText={(text) => this.handleChange('upc_type', text)}
            value={this.state.upc_type}
          />

        </View>
        <View style={styles.input}>
          <Text style={styles.text2}>Barcode:</Text>
          <TextInput
            style={styles.text}
            placeholder='Barcode'
            onChangeText={(text) => this.handleChange('barcode', text)}
            value={this.state.barcode}
          />

        </View>
        <View style={styles.input}>
          <Text style={styles.text2}>Item Name:</Text>
          <TextInput
            style={styles.text}
            placeholder='Product Name'
            onChangeText={(text) => this.handleChange('name', text)}
            value={this.state.name}
          />

        </View>
        <View style={styles.input}>
          <Text style={styles.text2}>Item Price:</Text>
          <TextInput
            style={styles.text}
            placeholder='Product Price'
            onChangeText={(text) => this.handleChange('price', text)}
            value={this.state.price.toString()}
          />

        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonTitle}>Cập nhật!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0E1F39',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'OswaldBold',
    color: '#FFFFFF',
  },
  input: {
    color: '#FFFFFF',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'OswaldLight',
  },
  text2: {
    color: '#FFFFFF',
    fontFamily: 'OswaldMedium',
  },
  button: {
    backgroundColor: '#0a1629',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    width: 'auto',
    alignItems: 'center',
  },
  buttonTitle: {
    fontFamily: 'OswaldBold',
    color: '#FFFFFF',
  },
});
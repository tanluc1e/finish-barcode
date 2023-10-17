import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { addItem } from '../service/MyServiceInterface';
import db from '../db';
import { ref, onValue } from 'firebase/database';

let itemsRef = ref(db, '/items');

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      name: '',
      error: false,
      upc_type: '',
      barcode: '',
      price: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'Add an Item',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
    const { route } = this.props;
    this.setState({
      user: route.params.user,
      barcode: route.params.data ? route.params.data.toString() : '',
      upc_type: route.params.type ? route.params.type.toString() : '',
    });

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        const items = Object.values(data);
        this.setState({ items });
      }
    });
  }

  handleChange(key, text) {
    this.setState({
      [key]: text,
    });
  }

  handleSubmit() {
    const { user, barcode, name, price, upc_type } = this.state;
    addItem(user, barcode, name, price, upc_type);
    Alert.alert('Item saved successfully');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add an Item</Text>
        <View style={styles.input}>
          <Text style={styles.text2}>UPC-Type:</Text>
          <TextInput
            placeholder='UPC-Type...'
            onChangeText={(text) => this.handleChange('upc_type', text)}
            value={this.state.upc_type}
            style={styles.text}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.text2}>Barcode:</Text>
          <TextInput
            placeholder='Barcode...'
            onChangeText={(text) => this.handleChange('barcode', text)}
            value={this.state.barcode}
            style={styles.text}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.text2}>Tên sản phẩm:</Text>
          <TextInput
            placeholder='Product Name...'
            onChangeText={(text) => this.handleChange('name', text)}
            style={styles.text}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.text2}>Giá:</Text>
          <TextInput
            placeholder='Product Price...'
            onChangeText={(text) => this.handleChange('price', text)}
            style={styles.text}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonTitle}>Lưu trữ</Text>
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
    marginBottom: 10,
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
    width: '100%',
    alignItems: 'center',
  },
  buttonTitle: {
    fontFamily: 'OswaldBold',
    color: '#FFFFFF',
  },
});

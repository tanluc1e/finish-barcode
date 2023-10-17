import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import db from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';
import { ref, onValue } from 'firebase/database';
import DialogInput from 'react-native-dialog-input';

export default class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      barcode: undefined,
      items: [],
      isDialogVisible: false,
    };
  }

  static navigationOptions = {
    title: 'Price Check',
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
    this.setState({ user: route.params.user, barcode: route.params.barcode });
  }

  componentDidMount() {
    const accountsRef = ref(db, `accounts/`);

    onValue(accountsRef, (snapshot) => {
      const items = [];

      snapshot.forEach((accountSnapshot) => {
        const accountData = accountSnapshot.val();
        if (accountData && accountData.barcodes) {
          const barcodeData = accountData.barcodes[this.state.barcode];
          if (barcodeData) {
            items.push(barcodeData);
          }
        }
      });

      this.setState({ items: items });
    });
  }

  render() {
    console.log(this.state.items);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Thông Tin</Text>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Giá: ${decode(item.price.toString())}</Text>
              <Text style={styles.text}>Tên: {decode(item.name.toString())}</Text>
              <Text style={styles.date}>
                Last Modified: {new Date(item.date).toDateString()}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('Update', {
                    user: this.state.user,
                    barcode: item.barcode.toString(),
                    name: item.name,
                    price: item.price,
                    upc_type: item.upc,
                  });
                }}
              >
                <Text style={styles.buttonTitle}>Cập nhật giá</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1F39',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#0E1F39',
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: 'rgb(10, 22, 41, 0.5)',
    color: '#FFFFFF',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'OswaldBold',
    color: '#FFFFFF',
  },
  itemName: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  text: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'OswaldRegular',
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

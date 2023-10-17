import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { delItem } from '../service/MyServiceInterface';
import db from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';
import { ref, onValue } from 'firebase/database'

export default class ListItemComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      items: []
    }
  }

  static navigationOptions = {
    title: 'Favorites',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  componentWillMount() {
    const { route } = this.props;
    this.setState({ user: route.params.user });
  }

  /* componentDidMount() {
    console.log(this.state.user)
    ref(db, `accounts/${encode(this.state.user)}/barcodes`).on('value', (snapshot) => {
      this.setState({ items: (snapshot.val() == undefined) ? [] : Object.values(snapshot.val()) })
    })
  } */
  componentDidMount() {
    console.log(this.state.user);
    const itemsRef = ref(db, `accounts/${encode(this.state.user)}/barcodes`);

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const items = data ? Object.values(data) : [];
      this.setState({ items });
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <View style={styles.row}>
            <Text style={styles.title}>{decode(item.name.toString())}</Text>
            <Text style={styles.title}>Barcode: {decode(item.barcode.toString())}</Text>
            <Text style={styles.stat}>Giá: ${decode(item.price.toString())}</Text>
            <Text style={styles.stat}>UPC: {decode(item.upc.toString())}</Text>
            <Text style={styles.stat}>Sửa gần đây: {new Date(item.date).toDateString()}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.push("Search", { user: this.state.user, barcode: item.barcode.toString() })}>
              <Text style={styles.buttonTitle}>Xem / Chỉnh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDel}
              onPress={() => delItem(this.state.user, item.barcode.toString())}>
              <Text style={styles.buttonTitle}>Xoá</Text>
            </TouchableOpacity>
          </View>}
          keyExtractor={(item, index) => index.toString()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0E1F39'
  },
  row: {
    flex: 1,
    padding: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 4,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'OswaldRegular'
  },
  item: {
    fontSize: 15,
    textAlign: 'center'
  },
  stat: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'OswaldRegular'
  },
  button: {
    backgroundColor: '#0a1629',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonDel: {
    backgroundColor: '#FF31AD',
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

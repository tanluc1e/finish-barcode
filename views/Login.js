import React, { Component } from 'react';
import { Alert, View, StyleSheet, Text, Button, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

import db from '../db';
import { registerAcc } from '../service/MyServiceInterface';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';
import { ref, getDatabase, onValue } from 'firebase/database'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePChange = this.handlePChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  handleChange(e) {
    this.setState({
      name: e.nativeEvent.text
    })
  }

  handlePChange(e) {
    this.setState({
      password: e.nativeEvent.text
    })
  }

  handleRegister() {
    registerAcc(this.state.name, this.state.password)
      .then(r => {
        Alert.alert(r);
      })
      .catch(e => {
        Alert.alert(e);
      });
  }

  handleLogin() {
    const db = getDatabase();
    const accountsRef = ref(db, '/accounts');

    onValue(accountsRef, (snapshot) => {
      if (snapshot.error) {
        console.error('Firebase error:', snapshot.error);
      } else {
        const data = snapshot.val();
        if (data) {
          const userData = data[encode(this.state.name)];
          if (userData && decode(userData.password) === this.state.password) {
            this.props.navigation.navigate('Home', { user: decode(this.state.name) });
          } else {
            Alert.alert('Invalid Login');
          }
        } else {
          Alert.alert('Invalid Login');
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>ĐĂNG NHẬP / ĐĂNG KÝ</Text>
        <TextInput
          style={styles.itemInput}
          onChange={this.handleChange}
          placeholder="Username" />
        <TextInput
          style={styles.itemInput}
          onChange={this.handlePChange}
          placeholder="Password"
          secureTextEntry={true} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLogin}
            underlayColor="white"
            onPress={this.handleLogin}>
            <Text style={styles.buttonTitleLogin}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            underlayColor="white"
            onPress={this.handleRegister}>
            <Text style={styles.buttonTitle}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'OswaldBold',
    color: '#0E1F39',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginTop: 10,
    marginRight: 5,
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#0E1F39',
    borderRadius: 8,
    color: '#0E1F39'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#0E1F39',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogin: {
    flex: 1,
    height: 40,
    backgroundColor: '#0E1F39',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 16,
    fontFamily: 'OswaldMedium',
    color: '#0E1F39',
  },
  buttonTitleLogin: {
    fontSize: 16,
    fontFamily: 'OswaldMedium',
    color: '#FFFFFF',
  },
});

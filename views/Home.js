import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  static navigationOptions = {
    title: 'Home',
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
    this.setState({ user: route.params.user });
  }

  render() {
    console.log('User:', this.state.user);
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Chào, {this.state.user}!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Barcode', { user: this.state.user });
          }}
        >
          <Text style={styles.buttonText}>Quét Barcode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Add', { user: this.state.user });
          }}
        >
          <Text style={styles.buttonText}>Thêm sản phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('List', { user: this.state.user });
          }}
        >
          <Text style={styles.buttonText}>Lưu trữ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E1F39',
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: 'OswaldBold',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#0a1629',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'OswaldRegular',
  },
});

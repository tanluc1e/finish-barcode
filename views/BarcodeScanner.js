import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from "expo-barcode-scanner";

export default class Scanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  static navigationOptions = {
    title: 'Barcode Scanner',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    hasCameraPermission: null,
  }

  componentWillMount() {
    const { route } = this.props;
    this.setState({ user: route.params.user });
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    // pausePreview();
    console.log('hi', this.state.user)
    this.props.navigation.navigate('Add', { user: this.state.user, type: type, data: data })
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}

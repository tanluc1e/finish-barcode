import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';

import BarcodeScanner from './views/BarcodeScanner';
import Home from './views/Home';
import AddItem from './views/AddItem';
import ListItemComp from './views/ListItemComp';
import Login from './views/Login';
import SearchItem from './views/SearchItem';
import UpdateItem from './views/UpdateItem';

const Stack = createNativeStackNavigator();

/* Font.loadAsync({
  'OswaldRegular': require('./assets/fonts/Oswald-Regular.ttf'),
  'OswaldBold': require('./assets/fonts/Oswald-Bold.ttf'),
  'OswaldLight': require('./assets/fonts/Oswald-Light.ttf'),
  'OswaldMedium': require('./assets/fonts/Oswald-Medium.ttf'),
}); */

/* const RootStack = createNativeStackNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
  },
  Add: {
    screen: AddItem,
  },
  List: {
    screen: ListItemComp,
  },
  Barcode: {
    screen: BarcodeScanner,
  },
  Search: {
    screen: SearchItem,
  },
  Update: {
    screen: UpdateItem,
  },
}, {
  initialRouteName: 'Login',
}); */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0E1F39',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontFamily: 'OswaldBold'
          },
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add" component={AddItem} />
        <Stack.Screen name="List" component={ListItemComp} />
        <Stack.Screen name="Barcode" component={BarcodeScanner} />
        <Stack.Screen name="Search" component={SearchItem} />
        <Stack.Screen name="Update" component={UpdateItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

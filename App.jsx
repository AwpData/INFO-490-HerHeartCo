import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './src/components/NavigationBar';

import store from './src/app/store';
import { Provider } from 'react-redux'

export default function App() {

  return (
    <Provider store={store} >
      <NavigationContainer >
        <NavigationBar />
      </NavigationContainer>
    </Provider>
  );
}
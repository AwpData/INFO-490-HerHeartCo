import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './src/components/NavigationBar/NavigationBar';

import store from './src/redux/store';
import { Provider } from 'react-redux'
import { Store } from './src/redux/store';

// TODO - whole app: add accessibilityLabel and check color contrast for accessibility
export default function App() {
  return (
    <Provider store={Store} >
      <NavigationContainer >
        <NavigationBar />
      </NavigationContainer>
    </Provider>
  );
}
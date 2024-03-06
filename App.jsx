import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './src/components/NavigationBar/NavigationBar';

import { Provider } from 'react-redux'
import { Store } from './src/redux/store';

// TODO - whole app: add accessibilityLabel
export default function App() {
  return (
    <Provider store={Store} >
      <NavigationContainer >
        <NavigationBar />
      </NavigationContainer>
    </Provider>
  );
}
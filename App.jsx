import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './src/components/NavigationBar';

export default function App() {

  return (
    <NavigationContainer >
      <NavigationBar />
    </NavigationContainer>
  );
}
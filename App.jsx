// App.jsx

import React from 'react';
import { Provider } from 'react-redux'
import { Store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './src/components/NavigationBar/NavigationBar';


import { 
  useFonts, 
  Lato_100Thin_Italic, 
  Lato_100Thin, 
  Lato_300Light_Italic, 
  Lato_300Light, 
  Lato_400Regular_Italic, 
  Lato_400Regular, 
  Lato_700Bold_Italic, 
  Lato_700Bold, 
  Lato_900Black_Italic, 
  Lato_900Black
} from "@expo-google-fonts/lato";


// TODO - whole app: add accessibilityLabel
export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_100Thin_Italic, 
    Lato_100Thin, 
    Lato_300Light_Italic, 
    Lato_300Light, 
    Lato_400Regular_Italic, 
    Lato_400Regular, 
    Lato_700Bold_Italic, 
    Lato_700Bold, 
    Lato_900Black_Italic, 
    Lato_900Black
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={Store} >
      <NavigationContainer >
        <NavigationBar />
      </NavigationContainer>
    </Provider>
  );
}
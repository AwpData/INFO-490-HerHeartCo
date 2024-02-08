import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'; 

import { Button, Text, View, ScrollView, Modal } from 'react-native';


export const activeHome = (<Fontisto name="home" color='white' size={30} />);
export const inactiveHome = (<SimpleLineIcons name="home" color='white' size={30} />);

export const activeCalendar = (<Ionicons name="calendar-sharp" color='white' size={30} />);
export const inactiveCalendar = (<Ionicons name="calendar-outline" color='white' size={30} />);

export const activeResources = (<FontAwesome5 name="book-medical" color='white' size={30} />);
export const inactiveResources = (
    <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', }}>
        <Feather 
            name="book" color='white' size={30} style={{flex: 1}}/>
        <MaterialCommunityIcons 
            name="plus-thick" color='white' size={30 / 2.1} 
            style={{flex: 0.5,position: 'absolute', top: 5, left: 8 }}/>
    </View>
);

export const activeProfile = (<Ionicons name="person" color='white' size={30} />);
export const inactiveProfile = (<Ionicons name="person-outline" color='white' size={30} />)
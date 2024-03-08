// NavBarAddButton.jsx
// 
// Creates the circular plus button in the navigation bar


import { View, TouchableOpacity, } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as Theme from '../../theme';


export default function NavBarAddButton({
    openModal
}) {
    return ( 
        <TouchableOpacity 
            onPress={openModal} 
            style={{ 
                position: 'absolute', 
                bottom: -10, left: 0, right: 0, 
                alignItems: 'center', 
                shadowOpacity: 0.2, shadowRadius: 5  
        }}>
            <View style={{
                width: 96,
                height: 96,
                borderRadius: 500,
                backgroundColor: 'white',
            }} />
            <MaterialIcons 
                name="add-circle-outline" 
                color={Theme.primaryTint} 
                size={85} 
                style={{ position: 'absolute', paddingTop: 5}}
            />
        </TouchableOpacity>
    )
}
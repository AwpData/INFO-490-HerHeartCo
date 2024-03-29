// EditDailyGoalsNavBar.jsx
// 
// Navigation bar for EditDailyGoalsModal: Cancel and Save buttons 
// TODO: "Cancel" = removing draft of data changes

import { Text, View, TouchableOpacity, } from 'react-native';

import * as Theme from '../../theme';


export default function EditDailyGoalsNavBar({
    onRequestClose, onSubmitClose
}) {
    return (
        <View style={Theme.addDataNavBarStyle}> 
            <TouchableOpacity onPress={onRequestClose}  >
                <Text style={Theme.grayBody}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onSubmitClose}  >
                <Text style={Theme.buttonTextV2}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}
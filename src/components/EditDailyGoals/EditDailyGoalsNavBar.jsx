import { Text, View, TouchableOpacity, } from 'react-native';

import * as Theme from '../../theme';

export default function EditDailyGoalsNavBar({
    onRequestClose
}) {
    return (
        <View style={Theme.addDataNavBarStyle}> 
                    
            {/* TODO: "Cancel" = removing draft of data changes */}
            <TouchableOpacity onPress={onRequestClose}  >
                <Text style={{color: Theme.primaryGray, fontSize: 18, }}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onRequestClose}  >
                <Text style={{color: Theme.secondaryTint, fontSize: 18, fontWeight: 'bold', }}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}
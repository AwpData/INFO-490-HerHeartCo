import { Text, View, TouchableOpacity, } from 'react-native';

import * as Theme from '../../theme';

export default function AddDataNavBar({
    onRequestClose
}) {
    return (
        <View style={Theme.addDataNavBarStyle}> 
                    
            {/* TODO: "Cancel" = removing draft of data changes */}
            <TouchableOpacity onPress={onRequestClose}  >
                <Text style={{color: '#10526a', fontSize: 18, }}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onRequestClose}  >
                <Text style={{color: '#10526a', fontSize: 18, fontWeight: 'bold', }}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}
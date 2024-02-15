import { Button, Text, View, StyleSheet, Modal, TouchableOpacity, } from 'react-native';

import * as Theme from '../../theme';
import { grayChevronRight } from "../constants"


export default function AddDataRow({
    icon, title, value, goal, unit
}) {
    return ( 
        <TouchableOpacity style={Theme.addDataRowStyle}>
            <View style={{flexDirection: 'row', alignItems: 'center', }}>
                <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                    {icon}
                </View>
                
                <View style={{flexDirection: 'column', paddingHorizontal: 15, }}>
                    <Text style={Theme.addDataRowTitle}>{title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                        <Text style={Theme.addDataCurrentValue}>{value}</Text>
                        <Text style={Theme.addDataRowGoal}> / {goal} {unit}</Text>
                    </View>
                </View>
                <View style={{flex: 1}} />
                {grayChevronRight}
            </View>
        </TouchableOpacity>
    )
}
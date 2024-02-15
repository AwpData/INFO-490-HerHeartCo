import { Button, Text, View, StyleSheet, Modal, TouchableOpacity, } from 'react-native';

import * as Theme from '../../theme';
import { grayChevronRight } from "../constants"


export default function SelfLogHealthData({
    icon, title, value, unit
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
                        <Text style={Theme.addDataRowGoal}>H:  </Text>
                        <Text style={Theme.addDataCurrentValue}>{value}</Text>
                        <Text style={Theme.logDataUnit}>  {unit}</Text>
                    </View>
                </View>
            <View style={{flex: 1}} />
                {grayChevronRight}
            </View>
        </TouchableOpacity>
    );
}
  
import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Modal, TouchableOpacity, } from 'react-native';

import * as Theme from '../../theme';
import { grayChevronDown, redChevronUp } from "../../constants"
import ExpandableView from './ExpandableView';


export default function LogGlucoseView({
    icon, value, expandedContent
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={Theme.addDataRowStyle}> 
            <TouchableOpacity onPress={() => { setIsExpanded(!isExpanded) }}  >
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
                    <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                        {icon}
                    </View>

                    <View style={{flexDirection: 'column', paddingHorizontal: 15, }}>
                        <Text style={Theme.addDataRowTitle}>Glucose</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                            <Text style={Theme.addDataRowGoal}>H:  </Text>
                            <Text style={Theme.addDataCurrentValue}>{value}</Text>
                            <Text style={Theme.logDataUnit}>  mg/dL</Text>
                        </View>
                    </View>
                <View style={{flex: 1}} />
                    {isExpanded ? redChevronUp : grayChevronDown}
                </View>
            </TouchableOpacity>
            <ExpandableView expanded={isExpanded} expandedContent={expandedContent}/>
        </View>
    );
}
  
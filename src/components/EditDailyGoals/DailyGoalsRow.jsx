import React, { useState, useRef } from 'react';
import { Button, Text, View, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as Theme from '../../theme';
import { grayChevronDown, redChevronUp } from "../../constants"
import ExpandableView from './ExpandableView';


export default function DailyGoalsRow ({ icon, title, value, goal, unit, expandedContent }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const sleep = useSelector(state => state.editGoalsReducer.sleep);

    return (
      <View style={Theme.addDataRowStyle}>
        <TouchableOpacity onPress={() => { setIsExpanded(!isExpanded) }} style={{padding: 15 }} >
            <View style={{flexDirection: 'row', alignItems: 'center', }}>
                <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                    {icon}
                </View>
                
                <View style={{flexDirection: 'column', paddingHorizontal: 15, }}>
                    <Text style={Theme.addDataRowTitle}>{title}</Text>
                    { title != 'Sleep' ? (<View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                        
                        <Text style={Theme.addDataCurrentValue}>{value}</Text>
                        <Text style={Theme.addDataRowGoal}> / {goal} {unit}</Text>
                    </View>) : (<View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                        <Text style={Theme.addDataCurrentValue}>{`${Math.floor(sleep / 60)} h `}</Text>
                        { sleep % 60 != 0 && 
                            <Text style={Theme.addDataCurrentValue}>{`${sleep % 60} min`}</Text>
                        }
                        <Text style={Theme.addDataRowGoal}> / {goal} {unit}</Text>
                    </View>)}
                    
                </View>
                <View style={{flex: 1}} />
                    {isExpanded ? redChevronUp : grayChevronDown}
            </View>
            
        </TouchableOpacity>
        <ExpandableView expanded={isExpanded} expandedContent={expandedContent}/>
      </View>
    );
  };
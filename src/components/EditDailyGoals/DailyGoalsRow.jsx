import React, { useState, useRef } from 'react';
import { Button, Text, View, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as Theme from '../../theme';
import { grayChevronDown, redChevronUp } from "../../constants"
import ExpandableView from './ExpandableView';


export default function DailyGoalsRow ({ icon, title, value, goal, unit, expandedContent }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const sleep = useSelector(state => state.userReducer.sleep);

    return (
      <View style={Theme.addDataRowStyle}>
        <TouchableOpacity onPress={() => { setIsExpanded(!isExpanded) }} style={{padding: 15 }} >
            <View style={{flexDirection: 'row', alignItems: 'center', }}>
                <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                    {icon}
                </View>
                
                <View style={{flexDirection: 'column', paddingHorizontal: 15, }}>
                    <Text style={Theme.goalsRowSmall}>{title}</Text>
                    { title != 'Sleep' ? (
                        <View style={{flexDirection: 'row', }}>
                            <Text style={Theme.goalsRowLarge}>{value}</Text>
                                
                            <View style={{justifyContent: 'center', }}>
                                <Text style={Theme.goalsRowSmall}>  / {goal} {unit}</Text>
                            </View>
                        </View>) : (
                        <View style={{flexDirection: 'row', }}>
                            <Text style={Theme.goalsRowLarge}>{`${Math.floor(sleep / 60)} h `}</Text>
                            
                            { sleep % 60 != 0 && 
                                <Text style={Theme.goalsRowLarge}>{`${sleep % 60} min`}</Text>
                            }

                            <View style={{justifyContent: 'center', }}>
                                <Text style={Theme.goalsRowSmall}>  / {goal} {unit}</Text>
                            </View>
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
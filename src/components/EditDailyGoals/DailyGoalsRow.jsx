// DailyGoalsRow.jsx
// 
// A row component that displays the goal's icon, title, measurement, and unit label 
// When pressed, it expands for the user to log an update for that goal 


import React, { useState, } from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import { useSelector, } from 'react-redux';

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

                {/* Display icon  */}
                <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                    {icon}
                </View>
                
                <View style={{flexDirection: 'column', paddingHorizontal: 15, }}>
                    {/* Display title  */}
                    <Text style={Theme.goalsRowSmall}>{title}</Text>

                    {/* Display measurement and label  */}
                    { title == 'Sleep' ? (
                        <View style={{flexDirection: 'row', }}>
                            <Text style={Theme.goalsRowLarge}>{`${Math.floor(sleep / 60)} h `}</Text>
                            
                            { sleep % 60 != 0 && 
                                <Text style={Theme.goalsRowLarge}>{`${sleep % 60} min`}</Text>
                            }

                            <View style={{justifyContent: 'center', }}>
                                <Text style={Theme.goalsRowSmall}>  / {goal} {unit}</Text>
                            </View>
                        </View> ) : (
                        <View style={{flexDirection: 'row', }}>
                            <Text style={Theme.goalsRowLarge}>{value}</Text>
                                
                            <View style={{justifyContent: 'center', }}>
                                 {title == 'Glucose' ? 
                                    (<Text style={Theme.goalsRowSmall}>  {unit}</Text>) : 
                                    (<Text style={Theme.goalsRowSmall}>  / {goal} {unit}</Text>)}
                            </View>
                        </View>) 
                    }
                </View>
                <View style={{flex: 1}} />
                {isExpanded ? redChevronUp : grayChevronDown}
            </View>
        </TouchableOpacity>
        
        <ExpandableView expanded={isExpanded} expandedContent={expandedContent}/>
      </View>
    );
  };
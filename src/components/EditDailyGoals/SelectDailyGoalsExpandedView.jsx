// SelectDailyGoalsExpandedView.jsx
// 
// The expanded view for user to select which goals they want to view on their Dashboard


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';

import * as Theme from '../../theme';
import { redChevronUp, grayChevronDown, goalsIcon, infoIcon, } from '../../constants';
import { toggleObjectBoolean } from '../../redux/actions';

import ExpandableView from './ExpandableView';


export default function SelectDailyGoalsExpandedView({goalsOpen}) {
    const goals = useSelector(state => state.userReducer.allGoals);
    const dispatch = useDispatch();

    const [isGoalsOpen, setIsGoalsOpen] = useState(goalsOpen);

    return (
        <View style={Theme.addDataRowStyle}>
            {/* "Goals" row that acts as a button to expand/collapse full list of goals to display/hide */}
            <TouchableOpacity onPress={() => { setIsGoalsOpen(!isGoalsOpen) }} style={{padding: 15 }} >
                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                        {goalsIcon}
                    </View>
                    
                    <View style={{flexDirection: 'column', paddingHorizontal: 15, }}>
                        <Text style={Theme.goalsRowSmall}>Goals</Text>
                    </View>

                    <View style={{flex: 1}} />
                    
                    {isGoalsOpen ? redChevronUp : grayChevronDown}
                </View>
                
            </TouchableOpacity>
            
            {/* Expanded fiew that displays all goals to display or hide  */}
            <ExpandableView expanded={isGoalsOpen} expandedContent={
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />
            
                <View style={{width: '100%', paddingHorizontal: 20, paddingBottom: 20, flexDirection: 'column'}}>
                    { goals.map((goal) => (
                        <View key={goal.id} style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, flexWrap: 'wrap', }} >

                            {/* Goal description */}
                            <View style={{ width: '68%', justifyContent: 'center'}}>
                                <Text style={goals.filter(item => item.isSelected).length > 3 && goal.isSelected == false ? Theme.grayBoldBody : Theme.boldBody}>{goal.title}</Text>
                            </View>
                            
                            {/* Viewing/Hidden button */}
                            { goal.isSelected ? 
                                (<TouchableOpacity 
                                    style={{padding: 10, borderRadius: 10, backgroundColor: Theme.primaryTint, width: '30%'}} 
                                    disabled={goals.filter(item => item.isSelected).length == 1}
                                    onPress={() => {dispatch(toggleObjectBoolean(goal))}}
                                >
                                    <Text style={{...Theme.boldBodyLight, textAlign: 'center'}}>Viewing</Text>
                                </TouchableOpacity>) : 
                                (<TouchableOpacity 
                                    style={{padding: 10, borderRadius: 10, backgroundColor: Theme.primaryGray, width: '30%', opacity: goals.filter(item => item.isSelected).length > 3 && goal.isSelected == false ? 0.5 : 1}} 
                                    disabled={goals.filter(item => item.isSelected).length > 3 && goal.isSelected == false}
                                    onPress={() => {dispatch(toggleObjectBoolean(goal))}}
                                >
                                    <Text style={{...Theme.boldBodyLight, textAlign: 'center'}}>Hidden</Text>
                                </TouchableOpacity>)
                            }
                        </View>          
                    ))}

                    {/* Info indicator */}
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, }}>
                        {infoIcon}
                        <View style={{justifyContent: 'center', paddingLeft: 5, }}>
                            <Text style={Theme.body}>Select 1-4 goals</Text>
                        </View>
                    </View>
                </View>
            </View>}/>    
        </View>
    )
}
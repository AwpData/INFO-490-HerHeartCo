import React, { useState } from 'react';

import { Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { redChevronUp, grayChevronDown, goalsIcon, infoIcon, } from '../../constants';
import * as Theme from '../../theme';
import { useSelector, useDispatch } from 'react-redux';
import { toggleObjectBoolean } from '../../redux/actions';
import ExpandableView from './ExpandableView';


export default function SelectGoalsToView({goalsOpen}) {
    const goals = useSelector(state => state.userReducer.allGoals);
    const dispatch = useDispatch();

    const [isGoalsOpen, setIsGoalsOpen] = useState(goalsOpen);

    return (
        <View style={Theme.addDataRowStyle}>
            <TouchableOpacity onPress={() => { setIsGoalsOpen(!isGoalsOpen) }} style={{padding: 15 }} >
                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                        {goalsIcon}
                    </View>
                    
                    <View style={{flexDirection: 'column', paddingHorizontal: 15, }}>
                        <Text style={{fontSize: 20, color: Theme.primaryTint, fontWeight: 'bold'}}>Goals</Text>
                    </View>

                    <View style={{flex: 1}} />
                    
                    {isGoalsOpen ? redChevronUp : grayChevronDown}
                </View>
                
            </TouchableOpacity>
            
            <ExpandableView expanded={isGoalsOpen} expandedContent={
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />
            
                <View style={{width: '100%', paddingHorizontal: 20, paddingBottom: 20, flexDirection: 'column'}}>
                    { goals.map((goal) => (
                        <View key={goal.id} style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, flexWrap: 'wrap', }} >
                            <View style={{ width: '70%', justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', opacity: goals.filter(item => item.isSelected).length > 3 && goal.isSelected == false ? 0.5 : 1}}>{goal.title}</Text>
                            </View>
                            
                            { goal.isSelected ? 
                                (<TouchableOpacity 
                                    style={{padding: 10, borderRadius: 10, backgroundColor: Theme.primaryTint, width: '30%'}} 
                                    disabled={goals.filter(item => item.isSelected).length == 1}
                                    onPress={() => {dispatch(toggleObjectBoolean(goal))}}>
                                    <Text style={{color: Theme.secondaryBackground, fontWeight: 'bold', textAlign: 'center', }}>Viewing</Text>
                                </TouchableOpacity>) : 
                                (<TouchableOpacity 
                                    style={{padding: 10, borderRadius: 10, backgroundColor: Theme.primaryGray, width: '30%', opacity: goals.filter(item => item.isSelected).length > 3 && goal.isSelected == false ? 0.5 : 1}} 
                                    disabled={goals.filter(item => item.isSelected).length > 3 && goal.isSelected == false}
                                    onPress={() => {dispatch(toggleObjectBoolean(goal))}}>
                                    <Text style={{color: Theme.secondaryBackground, fontWeight: 'bold', textAlign: 'center', }}>Hidden</Text>
                                </TouchableOpacity>)
                            }
                        </View>          
                    ))}
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, }}>
                        {infoIcon}
                        <View style={{justifyContent: 'center', paddingLeft: 5}}>
                            <Text style={{color: Theme.primaryTint}}>Select 1-4 goals</Text>
                        </View>
                    </View>
                </View>
            </View>}/>    
        </View>
    )
}
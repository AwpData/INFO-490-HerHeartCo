import React, { useState } from 'react';
import { Text, View, Modal, ScrollView, TouchableOpacity, } from 'react-native';
import * as Theme from '../../theme';

import { useSelector, useDispatch } from 'react-redux';
import { updateGoals } from '../../redux/actions';

import { sampleGoalsIcons } from '../../constants';


export default function OnboardingGoalsView ({ 
    visible, onRequestClose 
}) {
    const dispatch = useDispatch();
    const allGoals = useSelector(state => state.userReducer.allGoals);
    const [tempState, setTempState] = useState(Array.from(allGoals));

    const handleCancel = () => {
        setTempState(Array.from(allGoals));
        onRequestClose();
    };

    const handleSubmit = () => {
        dispatch(updateGoals(tempState)); 
        onRequestClose(); 
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={handleCancel}
            presentationStyle='fullscreen'
        >
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: Theme.primaryBackground, paddingTop: 80}}>
                <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
                    <Text style={Theme.title2Bold}>Welcome to HerHeartCo!</Text>
                    <Text style={Theme.headlineV2}>Begin by selecting up to 4 goals:</Text>
                </View>
                
                <View style={{flexDirection: 'column',}}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', marginHorizontal: 18, }}>
                    { tempState.map((item) => ( 
                        <TouchableOpacity key={item.id} 
                            disabled={tempState.filter(goal => goal.isSelected).length > 3 && item.isSelected == false}
                            onPress={(() => {
                                setTempState(tempState.map((goal) => {
                                    return item.id === goal.id ? {...goal, isSelected: !goal.isSelected} : goal
                                }))
                            })}
                            style={{
                                borderWidth: 3, borderColor: item.isSelected ? Theme.secondaryTint : Theme.secondaryGray, 
                                paddingVertical: 40, paddingHorizontal: 20, 
                                width: '43%', 
                                height: '25%',
                                opacity: (tempState.filter(goal => goal.isSelected).length > 3 && item.isSelected == false) ? 0.5 : 1,
                                borderRadius: 20, margin: 10, 
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: Theme.secondaryBackground}}>
                                <Text style={{...Theme.boldBody, textAlign: 'center'}}>{item.title}</Text>
                                {sampleGoalsIcons[item.id-1].icon}
                        </TouchableOpacity>
                        
                    ))}
                </View>

                { tempState.filter(goal => goal.isSelected === true).length < 1 ? 
                        (<View style={{
                                backgroundColor: tempState.filter(goal => goal.isSelected === true).length < 1 ? Theme.primaryGray : Theme.secondaryTint, 
                                paddingHorizontal: 30, paddingVertical: 12, 
                                borderRadius: 15, alignSelf: 'center'}}
                            >
                            <Text style={Theme.lightButtonText}>Save</Text> 
                        </View>) : 
                        (<TouchableOpacity 
                            onPress={handleSubmit} 
                            style={{
                                backgroundColor: tempState.filter(goal => goal.isSelected === true).length < 1 ? Theme.primaryGray : Theme.secondaryTint, 
                                paddingHorizontal: 30, paddingVertical: 12, 
                                borderRadius: 15, alignSelf: 'center'}} 
                            >
                            <Text style={Theme.lightButtonText}>Save</Text>
                        </TouchableOpacity>) }
                </View>
            </View>
        </Modal>
    );
};


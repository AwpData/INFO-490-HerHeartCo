import React, { useState } from 'react';
import { Text, View, Modal, ScrollView, TouchableOpacity, } from 'react-native';
import * as Theme from '../../theme';
import EditDailyGoalsNavBar from '../EditDailyGoals/EditDailyGoalsNavBar';


import { useSelector, useDispatch } from 'react-redux';
import { setGoals, updateGoals } from '../../redux/actions';
import { addNewWater } from '../fitbitAPI/write/addWater';
import { editNewGlucose } from '../fitbitAPI/write/editGlucose';
import { goals } from '../editGoalActions/goals';

import { sampleGoalsIcons } from '../../constants';


export default function SelectDailyGoalsModal ({ 
    visible, onRequestClose 
}) {
    const dispatch = useDispatch();
    const allGoals = useSelector(state => state.userReducer);
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
            presentationStyle='pageSheet'
        >
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: Theme.primaryBackground, }}>
                <EditDailyGoalsNavBar onRequestClose={handleCancel} onSubmitClose={handleSubmit} />
                <Text style={Theme.h1}>Select your goals</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignSelf: 'center', marginHorizontal: 18}}>
                    { tempState.map((item) => ( 
                        <TouchableOpacity key={item.id} 
                            onPress={(() => {
                                setTempState(tempState.map((goal) => {
                                    return item.id === goal.id ? {...goal, isSelected: !goal.isSelected} : goal
                                }))
                            })}
                            style={{
                                borderWidth: 3, borderColor: item.isSelected ? Theme.secondaryTint : Theme.secondaryBackground, 
                                paddingVertical: 40, paddingHorizontal: 20, 
                                width: '43%', 
                                height: '28%',
                                borderRadius: 20, margin: 10, 
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: Theme.secondaryBackground}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10}}>{item.title}</Text>
                                {sampleGoalsIcons[item.id-1].icon}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};


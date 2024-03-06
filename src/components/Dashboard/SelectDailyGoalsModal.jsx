import React, { useState } from 'react';
import { Text, View, Modal, ScrollView, TouchableOpacity, } from 'react-native';
import * as Theme from '../../theme';
import EditDailyGoalsNavBar from '../EditDailyGoals/EditDailyGoalsNavBar';


import { useSelector, useDispatch } from 'react-redux';
import { setGoals, updateGoals } from '../../redux/actions';

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

    const goalLimit = 4; 

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={handleCancel}
            presentationStyle='fullscreen'
        >
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: Theme.primaryBackground, }}>
                <View style={{flexDirection:'row', paddingTop: 60, paddingHorizontal: 20, justifyContent: 'flex-end'}}>
                    { tempState.filter(goal => goal.isSelected === true).length < 1 ? 
                        (<View style={{backgroundColor: tempState.filter(goal => goal.isSelected === true).length < 1 ? Theme.primaryGray : Theme.secondaryTint, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15}}>
                            <Text style={{color: Theme.primaryBackground, fontSize: 18, fontWeight: 'bold', }}>Save</Text> 
                        </View>) : 
                        (<TouchableOpacity onPress={handleSubmit} style={{backgroundColor: tempState.filter(goal => goal.isSelected === true).length < 1 ? Theme.primaryGray : Theme.secondaryTint, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15}} >
                            <Text style={{color: Theme.primaryBackground, fontSize: 18, fontWeight: 'bold', }}>Save</Text>
                        </TouchableOpacity>) }
                </View>


                <View style={{padding: 20}}>
                    <Text style={Theme.h1}>Welcome to HerHeartCo!</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: Theme.secondaryTint, textAlign: 'center', paddingTop: 5}}>Begin by selecting up to 4 goals:</Text>
                </View>
                

                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignSelf: 'center', marginHorizontal: 18}}>
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
                                <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10}}>{item.title}</Text>
                                {sampleGoalsIcons[item.id-1].icon}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};


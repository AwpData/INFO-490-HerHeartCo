import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, TouchableOpacity, Keyboard } from 'react-native';

import { useSelector, useDispatch, connect } from 'react-redux';
import { addWater, editSleep } from '../../redux/actions';
import { updateGlucose } from '../../redux/actions';
import { addHRV } from '../../redux/actions';

import * as Theme from '../../theme';

export default function EditDailyGoalsExpandedView({unit}) {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const dispatch = useDispatch();

    function primaryButtonText() {
        switch(unit) {
            case('water'):
                return 'Add';
            case('glucose'):
                return 'Update';
            case ('hrv'):  
                return 'Add';
            case ('sleep'): 
                return 'Update';
            default: return;
        }
    }

    function unitLabel() {
        switch(unit) {
            case('water'):
                return 'glasses';
            case('glucose'):
                return 'mg/dL';
            case ('hrv'):  
                return 'min';
            default: return;
        }
    }

    function editAction() {
        switch(unit) {
            case('water'): 
                dispatch(addWater(Number(inputValue) || 0));
                console.log("water");
                break;
            case('glucose'): 
                dispatch(updateGlucose(Number(inputValue) || 0));
                console.log("glucose");
                break;
            case ('hrv'): 
                dispatch(addHRV(Number(inputValue) || 0)); 
                console.log('hrv');
                break; 
            case ('sleep'): 
                let totalSleepMin = (Number(inputValue) * 60) + (Number(inputValue2));
                dispatch(editSleep(totalSleepMin || 0)); 
                console.log('updated sleep');
                break;
            default: break; 
        }
    }

    // TODO: refactor style

    return (
        
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {console.log(unit)}
            <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />
            { unit != 'sleep' ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}} >
                <TextInput
                    style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray}}
                    value={inputValue.toString()}
                    onChangeText={setInputValue}
                    placeholder="0"
                    keyboardType={"number-pad"}
                    returnKeyType='done'
                    clearTextOnFocus={true}
                />

                <Text style={{fontSize: 18, paddingTop: 10, fontWeight: 'bold', color: Theme.primaryTint}}>{unitLabel() }</Text>
                </View>
            ) : (   
                <View style={{flexDirection: 'row', alignContent: 'center'}} >
                    <TextInput
                        style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray}}
                        value={inputValue.toString()}
                        onChangeText={setInputValue}
                        placeholder="0"
                        keyboardType={"number-pad"}
                        returnKeyType='done'
                        clearTextOnFocus={true}
                    />
                    <View style={{justifyContent:'center', paddingRight: 15}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: Theme.primaryTint, paddingLeft: 5 }}> h</Text>
                    </View>

                    <TextInput
                        style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray}}
                        value={inputValue2.toString()}
                        onChangeText={setInputValue2}
                        placeholder="0"
                        keyboardType={"number-pad"}
                        returnKeyType='done'
                        clearTextOnFocus={true}
                    />
                    <View style={{justifyContent:'center', paddingLeft: 5}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: Theme.primaryTint, justifyContent:'center' }}> m</Text>
                    </View>
                    </View>
            )}
            
        
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}} >
                <TouchableOpacity onPress={ () => { 
                        setInputValue(''); 
                        Keyboard.dismiss(); }} 
                        style={{
                            marginRight: 50
                    }}>
                    <Text style={{color: Theme.primaryTint, fontSize: 20, paddingVertical: 10, paddingHorizontal: 20}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => {
                    editAction()
                    setInputValue('');
                    Keyboard.dismiss();
                    }}
                    style={{
                        marginLeft: 50
                }}>
                    <Text style={{color: Theme.primaryTint, fontSize: 20, fontWeight: 'bold', paddingVertical: 10, paddingHorizontal: 20}}>
                        {primaryButtonText()}
                    </Text>
                </TouchableOpacity> 
            </View>    
        </View>
    );
}
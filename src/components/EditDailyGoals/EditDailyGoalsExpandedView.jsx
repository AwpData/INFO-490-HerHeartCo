import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, TouchableOpacity, Keyboard } from 'react-native';

import { useSelector, useDispatch, connect } from 'react-redux';
import { addWater } from '../../redux/actions';
import { updateGlucose } from '../../redux/actions';
import { addHRV } from '../../redux/actions';

import * as Theme from '../../theme';

export default function EditDailyGoalsExpandedView({unit}) {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    function primaryButtonText() {
        switch(unit) {
            case('water'):
                return 'Add';
            case('glucose'):
                return 'Update';
            case ('hrv'):  
                return 'Add';
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
            default: break; 
        }
    }

    // TODO: refactor style

    return (
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />
            <TextInput
                style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray}}
                value={inputValue.toString()}
                onChangeText={setInputValue}
                placeholder="0"
                keyboardType={"number-pad"}
                returnKeyType='done'
                clearTextOnFocus={true}
            />

            <Text style={{fontSize: 16, paddingTop: 10, fontWeight: 'bold', color: Theme.primaryTint}}>{unitLabel()}</Text>
        
            <View style={{flexDirection: 'row', justifyContent: 'center', margin: 15, }} >
                <TouchableOpacity onPress={ () => { 
                        setInputValue(''); 
                        Keyboard.dismiss(); } }>
                    <Text style={{color: Theme.primaryTint, fontSize: 20, paddingVertical: 10, paddingHorizontal: 20}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => {
                    editAction()
                    setInputValue('');
                    Keyboard.dismiss();
                }}>
                    <Text style={{color: Theme.primaryTint, fontSize: 20, fontWeight: 'bold', paddingVertical: 10, paddingHorizontal: 20}}>
                        {primaryButtonText()}
                    </Text>
                </TouchableOpacity> 
            </View>    
        </View>
    );
}
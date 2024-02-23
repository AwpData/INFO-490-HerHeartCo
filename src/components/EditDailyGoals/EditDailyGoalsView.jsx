import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { addNewWater } from '../fitbitAPI/write/addWater';
import { editNewGlucose } from '../fitbitAPI/write/editGlucose';

import * as Theme from '../../theme';

export default function EditDailyGoalsView({unit}) {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    // TODO: refactor style

    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
                style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, }}
                value={inputValue.toString()}
                onChangeText={setInputValue}
                placeholder="0"
                keyboardType={"number-pad"}
                returnKeyType='done'
                clearTextOnFocus={true}
            />
            
            <TouchableOpacity onPress={
                () => {
                switch(unit) {
                    case('water'): 
                        dispatch(addNewWater(Number(inputValue) || 0));
                        console.log("water");
                        return;
                    case('glucose'): 
                        dispatch(editNewGlucose(Number(inputValue) || 0));
                        console.log("glucose");
                        return;
                }
                setInputValue('');
            }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Done</Text>
            </TouchableOpacity>            
        </View>
    );
}
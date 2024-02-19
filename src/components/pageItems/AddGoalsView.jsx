import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { addNewWater } from '../fitbitAPI/write/addWater';
import { editNewGlucose } from '../fitbitAPI/write/editGlucose';
import { editNewBP1 } from '../fitbitAPI/write/editBP1';
import { editNewBP2 } from '../fitbitAPI/write/editBP2';

import * as Theme from '../../theme';

export default function AddGoalsView({unit}) {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const dispatch = useDispatch();

    // TODO: refactor style

    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            { unit === 'bp' ? 
                (<View style={{flexDirection: 'row'}}> 
                    <TextInput
                        style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, }}
                        value={inputValue.toString()}
                        onChangeText={setInputValue}
                        placeholder="0"
                        keyboardType={"number-pad"}
                        returnKeyType='done'
                        clearTextOnFocus={true}
                    />
                    <Text style={{fontSize: 48, fontWeight: 'bold', display: 'flex', alignSelf: 'center', textAlignVertical: 'bottom', color: '#10526a'}}> / </Text>
                    <TextInput
                        style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, }}
                        value={inputValue2.toString()}
                        onChangeText={setInputValue2}
                        placeholder="0"
                        keyboardType={"number-pad"}
                        returnKeyType='done'
                        clearTextOnFocus={true}
                    />
                </View>) : 
                (<TextInput
                    style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, }}
                    value={inputValue.toString()}
                    onChangeText={setInputValue}
                    placeholder="0"
                    keyboardType={"number-pad"}
                    returnKeyType='done'
                    clearTextOnFocus={true}
                />)
            }
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
                    case('bp'): 
                        dispatch(editNewBP1(Number(inputValue) || 0));
                        dispatch(editNewBP2(Number(inputValue2) || 0));
                        console.log("bp");
                        return;
                }
                setInputValue('');
                setInputValue2('');
            }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Done</Text>
            </TouchableOpacity>            
        </View>
    );
}